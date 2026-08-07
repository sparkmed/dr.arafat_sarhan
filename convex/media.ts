import { AwsClient } from 'aws4fetch'
import { v } from 'convex/values'
import {
  action,
  internalMutation,
  mutation,
  query,
} from './_generated/server'
import { internal } from './_generated/api'
import { requireAdmin } from './admin'

const ALLOWED_CONTENT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
]

/** How long a presigned upload URL stays usable. */
const UPLOAD_URL_TTL_SECONDS = 600

function r2Config() {
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucket = process.env.R2_BUCKET
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL

  const missing = Object.entries({
    R2_ACCOUNT_ID: accountId,
    R2_ACCESS_KEY_ID: accessKeyId,
    R2_SECRET_ACCESS_KEY: secretAccessKey,
    R2_BUCKET: bucket,
    R2_PUBLIC_BASE_URL: publicBaseUrl,
  })
    .filter(([, value]) => !value)
    .map(([name]) => name)

  if (missing.length) {
    throw new Error(
      `Cloudflare R2 is not configured. Missing on the Convex deployment: ${missing.join(', ')}`,
    )
  }

  return {
    accountId: accountId as string,
    accessKeyId: accessKeyId as string,
    secretAccessKey: secretAccessKey as string,
    bucket: bucket as string,
    publicBaseUrl: (publicBaseUrl as string).replace(/\/$/, ''),
  }
}

/** `Summer Photo (2).JPG` -> `summer-photo-2.jpg`, so keys stay URL-safe. */
function slugifyFileName(fileName: string) {
  const lastDot = fileName.lastIndexOf('.')
  const base = lastDot > 0 ? fileName.slice(0, lastDot) : fileName
  const ext = lastDot > 0 ? fileName.slice(lastDot + 1).toLowerCase() : 'bin'
  const slug =
    base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'image'
  return `${slug}.${ext.replace(/[^a-z0-9]/g, '')}`
}

/**
 * Mints a short-lived presigned PUT URL. The browser uploads straight to R2,
 * so image bytes never pass through Convex.
 */
export const getUploadUrl = action({
  args: {
    token: v.string(),
    fileName: v.string(),
    contentType: v.string(),
    folder: v.string(),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{ uploadUrl: string; publicUrl: string; key: string }> => {
    await ctx.runQuery(internal.admin.assertSession, { token: args.token })

    if (!ALLOWED_CONTENT_TYPES.includes(args.contentType)) {
      throw new Error(
        `Unsupported file type "${args.contentType}". Allowed: ${ALLOWED_CONTENT_TYPES.join(', ')}`,
      )
    }

    const config = r2Config()
    const folder = args.folder.replace(/[^a-z0-9-]/gi, '') || 'uploads'
    const unique = crypto.randomUUID().slice(0, 8)
    const key = `${folder}/${Date.now()}-${unique}-${slugifyFileName(args.fileName)}`

    const client = new AwsClient({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      service: 's3',
      region: 'auto',
    })

    const endpoint = new URL(
      `https://${config.accountId}.r2.cloudflarestorage.com/${config.bucket}/${key}`,
    )
    endpoint.searchParams.set('X-Amz-Expires', String(UPLOAD_URL_TTL_SECONDS))

    const signed = await client.sign(endpoint.toString(), {
      method: 'PUT',
      aws: { signQuery: true },
    })

    return {
      uploadUrl: signed.url,
      publicUrl: `${config.publicBaseUrl}/${key}`,
      key,
    }
  },
})

/** Called by the browser once the PUT to R2 succeeds. */
export const recordAsset = mutation({
  args: {
    token: v.string(),
    key: v.string(),
    url: v.string(),
    fileName: v.string(),
    contentType: v.string(),
    folder: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token)
    const existing = await ctx.db
      .query('mediaAssets')
      .withIndex('by_key', (q) => q.eq('key', args.key))
      .unique()
    if (existing) return existing._id

    return await ctx.db.insert('mediaAssets', {
      key: args.key,
      url: args.url,
      fileName: args.fileName,
      contentType: args.contentType,
      folder: args.folder,
      uploadedAt: Date.now(),
    })
  },
})

/** Backs the "choose an existing image" tab of the image picker. */
export const listAssets = query({
  args: { token: v.optional(v.string()), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    if (!args.token) return []
    await requireAdmin(ctx, args.token)
    return await ctx.db
      .query('mediaAssets')
      .withIndex('by_uploadedAt')
      .order('desc')
      .take(args.limit ?? 60)
  },
})

/** Removes the object from R2 and forgets the asset row. */
export const deleteAsset = action({
  args: { token: v.string(), key: v.string() },
  handler: async (ctx, args): Promise<void> => {
    await ctx.runQuery(internal.admin.assertSession, { token: args.token })
    const config = r2Config()

    const client = new AwsClient({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      service: 's3',
      region: 'auto',
    })

    const response = await client.fetch(
      `https://${config.accountId}.r2.cloudflarestorage.com/${config.bucket}/${args.key}`,
      { method: 'DELETE' },
    )
    if (!response.ok && response.status !== 404) {
      throw new Error(
        `Failed to delete from R2 (${response.status}): ${await response.text()}`,
      )
    }

    await ctx.runMutation(internal.media.forgetAsset, { key: args.key })
  },
})

export const forgetAsset = internalMutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('mediaAssets')
      .withIndex('by_key', (q) => q.eq('key', args.key))
      .unique()
    if (existing) await ctx.db.delete(existing._id)
  },
})
