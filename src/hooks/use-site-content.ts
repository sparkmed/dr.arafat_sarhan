import { useQuery } from 'convex/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '../../convex/_generated/api'
import { pick, resolveContent } from '#/lib/site-content'
import type { Localized, SiteContent } from '#/lib/site-content'

/**
 * Live landing page content. Renders bundled defaults until Convex answers, so
 * the page never flashes empty and still works if a section was never saved.
 */
export function useSiteContent(): {
  content: SiteContent
  isLoading: boolean
} {
  const stored = useQuery(api.content.getAll)
  const content = useMemo(() => resolveContent(stored), [stored])
  return { content, isLoading: stored === undefined }
}

/** `useSiteContent` plus the language helpers every section needs. */
export function useSection<TSection extends keyof SiteContent>(
  section: TSection,
) {
  const { content, isLoading } = useSiteContent()
  const { i18n } = useTranslation()
  const language = i18n.language
  const isRTL = language.startsWith('ar')

  return {
    data: content[section],
    isLoading,
    isRTL,
    dir: isRTL ? ('rtl' as const) : ('ltr' as const),
    t: (value: Localized | undefined) => pick(value, language),
  }
}
