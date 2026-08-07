import { DEFAULT_CONTENT } from './defaults'
import type { Localized, SectionId, SiteContent } from './types'

export { DEFAULT_CONTENT }
export type * from './types'

export const SECTION_IDS: Array<SectionId> = [
  'hero',
  'showcase',
  'services',
  'beforeAfter',
  'vibes',
  'team',
  'findUs',
  'reviews',
  'footer',
]

export const SECTION_LABELS: Record<SectionId, string> = {
  hero: 'Hero',
  showcase: 'Phone Showcase',
  services: 'Services',
  beforeAfter: 'Before & After',
  vibes: 'Our Vibes',
  team: 'Team',
  findUs: 'Find Us',
  reviews: 'Reviews',
  footer: 'Footer',
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' && value !== null && !Array.isArray(value)
  )
}

/**
 * Overlays a stored section onto its defaults. Objects merge key-by-key so
 * fields added to the model after a save still resolve; arrays are replaced
 * wholesale, because a saved list is the admin's complete intent.
 */
export function mergeSection<T>(fallback: T, stored: unknown): T {
  if (stored === undefined || stored === null) return fallback
  if (!isPlainObject(fallback) || !isPlainObject(stored)) return stored as T

  const result: Record<string, unknown> = { ...fallback }
  for (const [key, value] of Object.entries(stored)) {
    result[key] = mergeSection((fallback as Record<string, unknown>)[key], value)
  }
  return result as T
}

/** Builds the full site content from whatever Convex has stored so far. */
export function resolveContent(
  stored: Record<string, { data: unknown } | undefined> | undefined,
): SiteContent {
  if (!stored) return DEFAULT_CONTENT
  const resolved = {} as SiteContent
  for (const id of SECTION_IDS) {
    // @ts-expect-error — each key merges against its own section type.
    resolved[id] = mergeSection(DEFAULT_CONTENT[id], stored[id]?.data)
  }
  return resolved
}

/** Picks the right side of a bilingual field for the active language. */
export function pick(value: Localized | undefined, language: string): string {
  if (!value) return ''
  return language.startsWith('ar') ? value.ar : value.en
}

export function emptyLocalized(): Localized {
  return { en: '', ar: '' }
}

/** Stable-enough id for newly added list rows. */
export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}
