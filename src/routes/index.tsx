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
import Team from '#/components/team'
import { useSection } from '#/hooks/use-site-content'

export const Route = createFileRoute('/')({ component: App })

function Showcase() {
  const { data } = useSection('showcase')

  if (!data.enabled || data.images.length === 0) return null

  return (
    <PhoneCarousel
      images={data.images.map((image) => ({
        src: image.url,
        alt: image.alt || 'iPhone screen content',
      }))}
    />
  )
}

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
                <Showcase />
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
                <section id="team" className="scroll-mt-20">
                  <Team />
                </section>
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
