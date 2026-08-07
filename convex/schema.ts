import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  appointments: defineTable({
    name: v.string(),
    phone: v.string(),
    service: v.string(),
    date: v.string(),
    status: v.string(), // e.g., "pending"
  }),

  /**
   * One document per landing page section. `data` is the section payload as
   * defined in `src/lib/site-content/types.ts` — kept as `v.any()` so the CMS
   * can grow new fields without a migration. The client validates the shape.
   */
  siteContent: defineTable({
    section: v.string(),
    data: v.any(),
    updatedAt: v.number(),
  }).index('by_section', ['section']),

  /** Admin sessions issued after a successful passcode login. */
  adminSessions: defineTable({
    token: v.string(),
    createdAt: v.number(),
    expiresAt: v.number(),
  }).index('by_token', ['token']),

  /** Throttles passcode guessing. One row per lock bucket. */
  loginAttempts: defineTable({
    bucket: v.string(),
    failures: v.number(),
    lockedUntil: v.number(),
    updatedAt: v.number(),
  }).index('by_bucket', ['bucket']),

  /** Every file uploaded to R2 through the CMS, newest first. */
  mediaAssets: defineTable({
    key: v.string(),
    url: v.string(),
    fileName: v.string(),
    contentType: v.string(),
    folder: v.string(),
    uploadedAt: v.number(),
  })
    .index('by_key', ['key'])
    .index('by_uploadedAt', ['uploadedAt']),
})
