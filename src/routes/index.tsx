import { createFileRoute } from '@tanstack/react-router'
import Header from '#/components/Header/Header'
import '@/components/ui/Carousel/css/embla.css'
import Footer from '#/components/Footer/Footer'
import Hero from '#/components/Hero'
import { PhoneCarousel } from '#/components/PhoneCarousel'
import Treatment from '#/components/treatment'
import DragElementsComponent from '#/components/fancy/blocks/drag-elements-demo'
import { BokehBackground } from '#/components/ui/bokeh'
import FindUs from '#/components/find-us'
import Reviews from '#/components/reviews'
import ComparisonCom from '#/components/comparison'

export const Route = createFileRoute('/')({ component: App })

const OPTIONS = { loop: true }

const iphoneImages = [
  'https://www.sparkmedagency.com/Dashboard.jpg',
  'https://www.sparkmedagency.com/our-services.jpg',
  'https://www.sparkmedagency.com/drarafatintro.jpg',
]

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className=" px-4 py-8 grow">
          <Hero />
          <div className="relative overflow-hidden  mt-4">
            <BokehBackground
              className="absolute inset-0"
              count={40}
              speed={0.6}
              colors={[
                'rgba(219, 122, 95, 0.2)', // Your Primary Terracotta
                'rgba(245, 158, 11, 0.15)', // Your Highlight Gold
                'rgba(255, 255, 255, 0.05)', // Soft White
              ]}
            />

            <div className=" flex flex-col gap-6 mb-4">
              <div dir="ltr" className="relative z-10 mt-4">
                <PhoneCarousel
                  images={iphoneImages.map((src) => ({
                    src,
                    alt: 'iPhone screen content',
                  }))}
                />
                <section id="our-services" className="scroll-mt-20">
                  <Treatment />
                </section>
                <div className="py-6" id="before-after">
                  <ComparisonCom />
                </div>
                <div
                  className="page-wrap max-w-4xl  flex flex-row justify-center items-center"
                  id="our-vibes"
                >
                  <DragElementsComponent />
                </div>
                <div
                  className="page-wrap max-w-4xl  flex flex-row justify-center items-center"
                  id="find-us"
                >
                  <FindUs />
                </div>
                <section id="reviews">
                  <Reviews />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
