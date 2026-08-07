import { v } from 'convex/values'
import {
  action,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from './_generated/server'
import { internal } from './_generated/api'
import type { QueryCtx } from './_generated/server'

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days
const MAX_FAILURES = 8
const LOCK_MS = 1000 * 60 * 5 // 5 minutes
const LOCK_BUCKET = 'admin-passcode'

/**
 * Throws unless `token` maps to a live admin session. Every mutation that
 * writes CMS content goes through this.
 */
export async function requireAdmin(ctx: QueryCtx, token: string) {
  const session = await ctx.db
    .query('adminSessions')
    .withIndex('by_token', (q) => q.eq('token', token))
    .unique()

  if (!session || session.expiresAt < Date.now()) {
    throw new Error('Not authorized. Please sign in again.')
  }
  return session
}

/** Timing-safe string comparison so failures leak no length/prefix info. */
function safeEqual(a: string, b: string) {
  const encoder = new TextEncoder()
  const left = encoder.encode(a)
  const right = encoder.encode(b)
  let diff = left.length ^ right.length
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0)
  }
  return diff === 0
}

/**
 * Exchanges the shared passcode for a session token. Runs as an action so it
 * can use `crypto.getRandomValues` for the token.
 */
export const login = action({
  args: { passcode: v.string() },
  handler: async (ctx, args): Promise<{ token: string; expiresAt: number }> => {
    const expected = process.env.ADMIN_PASSCODE
    if (!expected) {
      throw new Error(
        'ADMIN_PASSCODE is not configured on this Convex deployment.',
      )
    }

    const lockedFor = await ctx.runQuery(internal.admin.lockRemainingMs, {})
    if (lockedFor > 0) {
      throw new Error(
        `Too many failed attempts. Try again in ${Math.ceil(lockedFor / 1000 / 60)} minute(s).`,
      )
    }

    if (!safeEqual(args.passcode, expected)) {
      await ctx.runMutation(internal.admin.recordFailure, {})
      throw new Error('Incorrect passcode.')
    }

    const bytes = crypto.getRandomValues(new Uint8Array(32))
    const token = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    const expiresAt = Date.now() + SESSION_TTL_MS
    await ctx.runMutation(internal.admin.createSession, { token, expiresAt })
    return { token, expiresAt }
  },
})

export const lockRemainingMs = internalQuery({
  args: {},
  handler: async (ctx) => {
    const row = await ctx.db
      .query('loginAttempts')
      .withIndex('by_bucket', (q) => q.eq('bucket', LOCK_BUCKET))
      .unique()
    if (!row) return 0
    return Math.max(0, row.lockedUntil - Date.now())
  },
})

export const recordFailure = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now()
    const row = await ctx.db
      .query('loginAttempts')
      .withIndex('by_bucket', (q) => q.eq('bucket', LOCK_BUCKET))
      .unique()

    if (!row) {
      await ctx.db.insert('loginAttempts', {
        bucket: LOCK_BUCKET,
        failures: 1,
        lockedUntil: 0,
        updatedAt: now,
      })
      return
    }

    // Failures older than the lock window start a fresh streak.
    const failures = now - row.updatedAt > LOCK_MS ? 1 : row.failures + 1
    await ctx.db.patch(row._id, {
      failures,
      lockedUntil: failures >= MAX_FAILURES ? now + LOCK_MS : 0,
      updatedAt: now,
    })
  },
})

export const createSession = internalMutation({
  args: { token: v.string(), expiresAt: v.number() },
  handler: async (ctx, args) => {
    // A successful login clears the failure streak.
    const attempts = await ctx.db
      .query('loginAttempts')
      .withIndex('by_bucket', (q) => q.eq('bucket', LOCK_BUCKET))
      .unique()
    if (attempts) await ctx.db.delete(attempts._id)

    // Drop expired sessions so the table stays small.
    const now = Date.now()
    for (const session of await ctx.db.query('adminSessions').collect()) {
      if (session.expiresAt < now) await ctx.db.delete(session._id)
    }

    await ctx.db.insert('adminSessions', {
      token: args.token,
      createdAt: now,
      expiresAt: args.expiresAt,
    })
  },
})

/** Used internally by actions (which have no `ctx.db`) to gate uploads. */
export const assertSession = internalQuery({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token)
    return true
  },
})

/** Lets the admin UI decide between the login screen and the editor on load. */
export const isSessionValid = query({
  args: { token: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.token) return false
    const session = await ctx.db
      .query('adminSessions')
      .withIndex('by_token', (q) => q.eq('token', args.token as string))
      .unique()
    return !!session && session.expiresAt > Date.now()
  },
})

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query('adminSessions')
      .withIndex('by_token', (q) => q.eq('token', args.token))
      .unique()
    if (session) await ctx.db.delete(session._id)
  },
})
