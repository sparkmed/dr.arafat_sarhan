import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useTranslation } from 'react-i18next'
import Header from '#/components/Header'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const message = useQuery(api.hello.get)
  const { t, i18n } = useTranslation()

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <Header />
      <h1>Status: {message ?? 'Loading...'}</h1>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      <button onClick={() => i18n.changeLanguage('ar')}>
        Translate to Arabic
      </button>
        <button onClick={() => i18n.changeLanguage('en')}>
        Translate to English
      </button>
    </main> 
  )
}
