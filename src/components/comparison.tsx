'use client'

import {
  Comparison,
  ComparisonHandle,
  ComparisonItem,
} from '@/components/kibo-ui/comparison'
import EmblaOpacity from '@/components/ui/Carousel/embla-opacity/embla-opacity'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const cases = [
  {
    id: 1,
    before: 'https://www.sparkmedagency.com/before_1.jpg',
    after: 'https://www.sparkmedagency.com/after_1.jpg',
  },
  {
    id: 2,
    before: 'https://www.sparkmedagency.com/Impalnt_before.jpg',
    after: 'https://www.sparkmedagency.com/Implant_Afterjpg.jpg',
  },
  {
    id: 3,
    before: 'https://www.sparkmedagency.com/Implant_before_1jpg.jpg',
    after: 'https://www.sparkmedagency.com/implant_after_1.jpg',
  },
]

const ComparisonCarousel = () => {
  const { t } = useTranslation()
  const [isDraggingSlider, setIsDraggingSlider] = useState(false)

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t('comparison.title')}
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
          {t('comparison.description')}
        </p>
        
      </div>

      {/* The Carousel */}
      <EmblaOpacity
        disabledControls={cases.length <= 1}
        options={{ 
            loop: true, 
            // Crucial: Disable carousel dragging if the user is sliding the Before/After handle
            watchDrag: !isDraggingSlider && cases.length > 1 
        }}
      >
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="shrink-0 grow-0 basis-[90%] md:basis-3/4 min-w-0 pl-4"
          >
            <div className="relative rounded-2xl overflow-hidden border shadow-xl bg-muted">
              <Comparison 
                className="aspect-video"
                onDragStart={() => setIsDraggingSlider(true)}
                onDragEnd={() => setIsDraggingSlider(false)}
              >
                {/* Before Side */}
                <ComparisonItem position="right">
                  <img
                    src={caseItem.before}
                    alt="Before"
                    className="w-full h-full object-cover select-none"
                  />
                  <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-semibold">
                      {t('comparison.labels.before')}
                    </span>
                  </div>
                </ComparisonItem>

                {/* After Side */}
                <ComparisonItem position="left">
                  <img
                    src={caseItem.after}
                    alt="After"
                    className="w-full h-full object-cover select-none"
                  />
                  <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
                    <span className="bg-white/80 backdrop-blur-sm text-black px-3 py-1 rounded text-xs font-semibold">
                      {t('comparison.labels.after')}
                    </span>
                  </div>
                </ComparisonItem>

                <ComparisonHandle />
              </Comparison>
            </div>
          </div>
        ))}
      </EmblaOpacity>
    </section>
  )
}

export default ComparisonCarousel