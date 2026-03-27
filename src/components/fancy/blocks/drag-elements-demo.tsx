import React from 'react'
import DragElements from '@/components/fancy/blocks/drag-elements'
import useScreenSize from '#/hooks/use-screen-size'
import { useTranslation } from 'react-i18next'

const urls = [
  'https://www.sparkmedagency.com/9f2efc13-0555-4a6f-823f-7fc442c71aa6.jpg',
  'https://www.sparkmedagency.com/85f77785-2e5c-46d3-96ef-9f1f4d1b3b06.jpg',
  'https://www.sparkmedagency.com/3fcc0bed-ea89-43cb-aee1-71a403adca45.jpg',
  'https://www.sparkmedagency.com/4252a188-646e-48fa-b92d-6acf5d4f2267.jpg',
  'https://www.sparkmedagency.com/529779cd-7345-436b-b199-3a99c027c428.jpg',
  'https://www.sparkmedagency.com/55b7ee57-52a5-47aa-8e68-7a5cdafdb920.jpg',
  'https://www.sparkmedagency.com/6f9b4ad9-2692-4c72-a7cc-bb2600ade203.jpg',
  'https://www.sparkmedagency.com/81a2ab2d-dcb5-4afe-a5a6-d6ab1d0a78ad.jpg',
  'https://www.sparkmedagency.com/a47a25e5-b517-40e4-94ec-3e585ea6b24b.jpg',
  'https://www.sparkmedagency.com/af73ef5d-ed12-4f01-9c4e-7f545d371d19.jpg',
  'https://www.sparkmedagency.com/d9bbe98a-c7e9-46fe-be5c-ab5cda2aef83.jpg',
  'https://www.sparkmedagency.com/e8c16b4b-fb9c-46fc-8220-5771d3106e19.jpg',
  'https://www.sparkmedagency.com/ee6adc4a-e055-44f2-9627-53511f11bb25.jpg'
]

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const DragElementsComponent: React.FC = () => {
  const { t,i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'
  const screenSize = useScreenSize()

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t('vibes.title')}
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
          {t('vibes.description')}
        </p>
        <div className="text-primary/70 text-xs md:text-sm font-bold tracking-wide uppercase animate-pulse pt-2">
           {t('vibes.instruction')}
        </div>
      </div>

      <div className="w-full h-125 relative bg-[#eeeeee] rounded-3xl py-4 overflow-hidden shadow-inner border border-black/5">
      <h1 
        className="absolute text-xl md:text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground uppercase w-full pointer-events-none select-none"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {t('vibes.allYour')}
        <span className="font-bold text-foreground dark:text-muted">
          {' '}{t('vibes.memories')}
        </span>
      </h1>
        <DragElements dragMomentum={false} className="p-40">
          {urls.map((url, index) => {
            const rotation = randomInt(-12, 12)
            const isMobile = screenSize.lessThan(`md`)
            const width = isMobile ? randomInt(90, 120) : randomInt(140, 150)
            const height = isMobile ? randomInt(120, 140) : randomInt(170, 180)

            return (
              <div
                key={index}
                className="flex items-start justify-center bg-white shadow-2xl p-4 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  width: `${width}px`,
                  height: `${height}px`,
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: `${width - 4}px`,
                    height: `${height - 30}px`,
                  }}
                >
                  <img
                    src={url}
                    alt=""
                    className="object-cover w-full h-full pointer-events-none"
                    draggable={false}
                  />
                </div>
              </div>
            )
          })}
        </DragElements>
      </div>
    </section>
  )
}

export default DragElementsComponent