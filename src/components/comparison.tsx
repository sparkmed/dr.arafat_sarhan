'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { EmblaCarouselType } from 'embla-carousel'
import {
  Comparison,
  ComparisonHandle,
  ComparisonItem,
} from '@/components/kibo-ui/comparison'
import EmblaOpacity from '@/components/ui/Carousel/embla-opacity/embla-opacity'
import { Button } from '#/components/ui/button'
import { useIsMobile } from '#/hooks/use-mobile'
import { useSection } from '#/hooks/use-site-content'

const ComparisonCarousel = () => {
  const { data, t } = useSection('beforeAfter')
  const [isDraggingSlider, setIsDraggingSlider] = useState(false)
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const isMobile = useIsMobile()

  const onApiChange = useCallback(
    (api: EmblaCarouselType | undefined) => setEmblaApi(api),
    [],
  )

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on('select', onSelect).on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect)
    }
  }, [emblaApi])

  if (!data.enabled || data.cases.length === 0) return null

  const hasMultiple = data.cases.length > 1

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t(data.title)}
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
          {t(data.description)}
        </p>
      </div>

      {/* The Carousel */}
      <EmblaOpacity
        disabledControls={!hasMultiple}
        onApiChange={onApiChange}
        hideArrows
        options={{
          loop: true,
          // The drag gesture belongs to the before/after handle at every size.
          // Cases are changed with the arrows below, which sit outside the
          // image so they never compete with the handle.
          watchDrag: false,
        }}
      >
        {data.cases.map((caseItem) => (
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
                      {t(data.beforeLabel)}
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
                      {t(data.afterLabel)}
                    </span>
                  </div>
                </ComparisonItem>

                <ComparisonHandle />
              </Comparison>
            </div>
          </div>
        ))}
      </EmblaOpacity>

      {/* Navigation, kept clear of the draggable image area. */}
      {hasMultiple ? (
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Previous case"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft />
          </Button>
          <span className="font-mono text-sm text-muted-foreground tabular-nums">
            {selectedIndex + 1} / {data.cases.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Next case"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight />
          </Button>
        </div>
      ) : null}
    </section>
  )
}

export default ComparisonCarousel
