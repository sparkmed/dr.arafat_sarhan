import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useTranslation } from 'react-i18next'
import Header from '#/components/Header/Header'
import '@/components/ui/Carousel/css/embla.css'
import BannerOpacityCarousel from '#/components/banner-opacity-carousel'
import Footer from '#/components/Footer/Footer'
import Hero from '#/components/Hero'
import { PhoneCarousel } from '#/components/PhoneCarousel'
import Treatment from '#/components/treatment'
import DragElementsComponent from '#/components/fancy/blocks/drag-elements-demo'

export const Route = createFileRoute('/')({ component: App })

const OPTIONS = { loop: true }


const iphoneImages = [
  'https://marvelous-fish-345.convex.cloud/api/storage/a9a9e6fc-4e8e-41f1-902a-eeaa923c10b4',
  'https://marvelous-fish-345.convex.cloud/api/storage/195ab70a-d37b-40b4-bf72-39d0c26ce5fd',
  'https://marvelous-fish-345.convex.cloud/api/storage/0a30c866-446c-4751-b476-360e0b7620f2',
  'https://marvelous-fish-345.convex.cloud/api/storage/f3f70c3c-47bf-429d-8526-4b51f45653fd',
]

function App() {
  const message = useQuery(api.hello.get)
  const { t, i18n } = useTranslation()

  return (
    <>
      <Header />

      <div className="flex flex-col min-h-screen">
        <main className=" px-4  grow">
          <Hero />
          <div className=" flex flex-col gap-6 mb-4">
            {/* <div className="pt-4" dir="ltr">
          <BannerOpacityCarousel />
        </div> */}
            <PhoneCarousel
              images={iphoneImages.map((src) => ({
                src,
                alt: 'iPhone screen content',
              }))}
            />
            <Treatment />
            <div className='page-wrap max-w-4xl  flex flex-row justify-center items-center'>

              <DragElementsComponent />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
