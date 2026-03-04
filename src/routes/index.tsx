import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useTranslation } from 'react-i18next'
import Header from '#/components/Header/Header'
import EmblaCarousel from '#/components/ui/Carousel/EmblaCarousel'
import '@/components/ui/Carousel/css/embla.css'



export const Route = createFileRoute('/')({ component: App })

const OPTIONS = { loop: true }
const SLIDES = [
  'https://marvelous-fish-345.convex.cloud/api/storage/94f09924-9350-44a9-b14c-2924d9b51552',
  'https://marvelous-fish-345.convex.cloud/api/storage/ff9f8256-1df0-4eac-b00a-320796900c88',
  'https://marvelous-fish-345.convex.cloud/api/storage/e2c429cd-5f26-4449-a9c5-903f0cf9360c',
  'https://marvelous-fish-345.convex.cloud/api/storage/ff9f8256-1df0-4eac-b00a-320796900c88',
  'https://marvelous-fish-345.convex.cloud/api/storage/94f09924-9350-44a9-b14c-2924d9b51552',
]

function App() {
  const message = useQuery(api.hello.get)
  const { t, i18n } = useTranslation()

  return (
    <>
      <Header />
      <div className="py-8">
        {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
      </div>
      <main className="page-wrap px-4 pb-8 pt-14 ">
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
    </>
  )
}
