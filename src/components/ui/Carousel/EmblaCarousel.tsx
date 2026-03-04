import React, { useCallback, useEffect, useRef } from 'react'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay' // Import autoplay
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import { cn } from '#/lib/utils' // Use your existing util

const TWEEN_FACTOR_BASE = 0.84

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const EmblaCarousel = (props: PropType) => {
  const { slides, options } = props
  
  // Initialize with Autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay()
  ])
  
  const tweenFactor = useRef(0)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi as any)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi as any)

const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
  tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length // ✅
}, [])


  const tweenOpacity = useCallback((emblaApi: EmblaCarouselType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const opacity = Math.max(0, Math.min(1, tweenValue)).toString()
        emblaApi.slideNodes()[slideIndex].style.opacity = opacity
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    setTweenFactor(emblaApi)
    tweenOpacity(emblaApi)
    emblaApi
      .on('init', setTweenFactor)
      .on('init', tweenOpacity)
      .on('scroll', tweenOpacity)
  }, [emblaApi, tweenOpacity, setTweenFactor])

  return (
    <div className="relative group max-w-[1536px] mx-auto px-4 overflow-hidden">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {slides.map((url,index) => (
            <div className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_70%] " key={index}>
              <div className="relative h-[700px] rounded-2xl overflow-hidden shadow-md">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={url}
                  alt={`Slide ${index}`}
                />
                <div className="absolute inset-0 bg-black/20" /> 
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (Hidden on small screens, show on hover) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="pointer-events-auto">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div className="pointer-events-auto">
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      {/* Dots (Modern Styling) */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              index === selectedIndex ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-primary/50"
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default EmblaCarousel
