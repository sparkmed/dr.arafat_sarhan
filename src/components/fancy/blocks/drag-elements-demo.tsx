import React from 'react'
import DragElements from '@/components/fancy/blocks/drag-elements'
import useScreenSize from '#/hooks/use-screen-size'
import { useSection } from '#/hooks/use-site-content'

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const DragElementsComponent: React.FC = () => {
  const { data, t, dir } = useSection('vibes')
  const screenSize = useScreenSize()

  if (!data.enabled) return null

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t(data.title)}
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
          {t(data.description)}
        </p>
        <div className="text-primary/70 text-xs md:text-sm font-bold tracking-wide uppercase animate-pulse pt-2">
          {t(data.instruction)}
        </div>
      </div>

      <div className="w-full h-125 relative bg-[#eeeeee] rounded-3xl py-4 overflow-hidden shadow-inner border border-black/5">
        <h1
          className="absolute text-xl md:text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground uppercase w-full pointer-events-none select-none"
          dir={dir}
        >
          {t(data.overlayPrefix)}
          <span className="font-bold text-foreground dark:text-muted">
            {' '}
            {t(data.overlayHighlight)}
          </span>
        </h1>
        <DragElements dragMomentum={false} className="p-40">
          {data.images.map((image) => {
            const rotation = randomInt(-12, 12)
            const isMobile = screenSize.lessThan(`md`)
            const width = isMobile ? randomInt(90, 120) : randomInt(140, 150)
            const height = isMobile ? randomInt(120, 140) : randomInt(170, 180)

            return (
              <div
                key={image.id}
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
                    src={image.url}
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
