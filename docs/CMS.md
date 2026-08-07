# Landing page CMS

Every section of the landing page is editable at **`/admin`**. Content lives in
Convex; images live in a Cloudflare R2 bucket.

## How it fits together

- `src/lib/site-content/defaults.ts` — the content the site ships with. This is
  the fallback: a section that has never been saved in the CMS renders from
  here, so the site is never blank.
- `convex/content.ts` — one `siteContent` row per section. Saving a section
  writes the whole section payload; it goes live immediately (Convex queries are
  reactive, so open tabs update without a refresh).
- `src/components/admin/section-schema.ts` — declares the fields of every
  section editor. Adding a field to the content model means adding one entry
  here; the form, the unsaved-changes tracking, and the save flow follow.
- `convex/media.ts` — mints presigned R2 upload URLs. Image bytes go from the
  browser straight to Cloudflare and never pass through Convex.

Editing a section marks it dirty. Dirty sections are listed in the sticky bar at
the top of `/admin` and dotted in the tab strip, and each section has its own
**Submit changes** button. Nothing reaches the site until a section is
submitted.

## One-time setup

### 1. Admin passcode

```bash
npx convex env set ADMIN_PASSCODE "choose-a-long-random-passcode"
```

This is the only credential for `/admin`. Eight wrong guesses locks sign-in for
five minutes. Sessions last seven days and are stored in `localStorage`.

### 2. Cloudflare R2 bucket

Create a bucket in the Cloudflare dashboard (R2 → Create bucket), then create an
**R2 API token** with *Object Read & Write* scoped to it (R2 → Manage API
tokens). Enable public access on the bucket — either an r2.dev subdomain or a
custom domain — and use that as the public base URL.

```bash
npx convex env set R2_ACCOUNT_ID        "your-cloudflare-account-id"
npx convex env set R2_ACCESS_KEY_ID     "..."
npx convex env set R2_SECRET_ACCESS_KEY "..."
npx convex env set R2_BUCKET            "drarafat-media"
npx convex env set R2_PUBLIC_BASE_URL   "https://cdn.example.com"
```

Run these against production too (`npx convex env set --prod ...`).

### 3. R2 CORS rules

The browser uploads directly to R2, so the bucket must accept `PUT` from the
site. In the Cloudflare dashboard: R2 → your bucket → Settings → CORS policy:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://drarafatsarhan.com"
    ],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedHeaders": ["content-type"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

Add every origin the CMS is opened from, and keep `content-type` in
`AllowedHeaders` — the uploader sends it, so the preflight fails without it.

R2 buckets ship with **no** CORS policy, and the browser then blocks the upload
before it leaves the page. That surfaces in the CMS as *"Upload failed to reach
Cloudflare R2"*. Check the policy without going through the UI — a preflight
needs no credentials:

```bash
curl -s -i -X OPTIONS \
  "https://<account-id>.r2.cloudflarestorage.com/<bucket>/probe.jpg" \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: PUT" \
  -H "Access-Control-Request-Headers: content-type"
```

`403 Unauthorized — CORS not configured for this bucket` means the policy is
missing. A `200` with a matching `access-control-allow-origin` means uploads
will work from that origin.

## Day-to-day use

1. Go to `/admin` and enter the passcode.
2. Pick a section tab. Every text field has an **English** and **العربية** side —
   both are stored, and the site shows whichever matches the visitor's language.
3. Images: **Upload** sends a new file to R2, **Library** reuses something
   already uploaded, **Paste URL** keeps an image hosted elsewhere. Limit is
   8 MB per file (JPG, PNG, WebP, AVIF, GIF, SVG).
4. Lists (services, cases, testimonials, galleries) can be reordered,
   duplicated, and deleted.
5. **Show this section** hides a section from the landing page without deleting
   its content.
6. Press **Submit changes** on each section you edited, or **Submit all** in the
   top bar.

**Restore built-in content** deletes a section's saved row so it falls back to
`defaults.ts`. Uploaded images stay in the R2 bucket either way.

## Adding a new editable field

1. Add it to the section type in `src/lib/site-content/types.ts`.
2. Add its current value to `src/lib/site-content/defaults.ts`.
3. Add a field entry to `src/components/admin/section-schema.ts`.
4. Read it in the component via `useSection('<section>')`.

Sections already saved keep working: stored data is merged over the defaults, so
a field added after a save resolves to its default rather than `undefined`.
