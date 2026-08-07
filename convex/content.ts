import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { requireAdmin } from './admin'

/**
 * Every stored section, keyed by section id. Sections that have never been
 * saved are simply absent — the client falls back to its bundled defaults.
 */
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query('siteContent').collect()
    const bySection: Record<string, { data: unknown; updatedAt: number }> = {}
    for (const row of rows) {
      bySection[row.section] = { data: row.data, updatedAt: row.updatedAt }
    }
    return bySection
  },
})

export const saveSection = mutation({
  args: { token: v.string(), section: v.string(), data: v.any() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token)

    const existing = await ctx.db
      .query('siteContent')
      .withIndex('by_section', (q) => q.eq('section', args.section))
      .unique()

    const updatedAt = Date.now()
    if (existing) {
      await ctx.db.patch(existing._id, { data: args.data, updatedAt })
    } else {
      await ctx.db.insert('siteContent', {
        section: args.section,
        data: args.data,
        updatedAt,
      })
    }
    return updatedAt
  },
})

/** Reverts a section to the bundled defaults by removing its override row. */
export const resetSection = mutation({
  args: { token: v.string(), section: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token)
    const existing = await ctx.db
      .query('siteContent')
      .withIndex('by_section', (q) => q.eq('section', args.section))
      .unique()
    if (existing) await ctx.db.delete(existing._id)
  },
})
