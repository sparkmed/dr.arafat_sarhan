import React, { useCallback, useEffect, useRef } from 'react';
import type  {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, useDotButton } from './embla-dots';
import styles from './embla.module.scss';
import Autoplay from 'embla-carousel-autoplay';
import { NextButton, PrevButton, usePrevNextButtons } from './embla-arrows';
import { cn } from '#/lib/utils';

const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  disabledControls?: boolean;
  /**
   * Hands the Embla instance to the caller so it can render its own controls.
   * Needed where the built-in arrows don't fit — they are hidden under 768px
   * and overlay the slides, which conflicts with draggable slide content.
   */
  onApiChange?: (api: EmblaCarouselType | undefined) => void;
  /** Drops the built-in overlay arrows, keeping the dots and autoplay. */
  hideArrows?: boolean;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, children, disabledControls, onApiChange, hideArrows } =
    props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      delay: 4000, // change this with embla__dot--selected:before animation duration
      active: !disabledControls,
      stopOnInteraction: false,
    }),
  ]);
  const tweenFactor = useRef(0);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === 'scroll';

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    },
    []
  );

  useEffect(() => {
    onApiChange?.(emblaApi);
  }, [emblaApi, onApiChange]);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity);
  }, [emblaApi, tweenOpacity]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>{children}</div>
      </div>

      <div
        className={styles.embla__controls}
        style={{ ...(disabledControls && { display: 'none' }) }}
      >
        {!hideArrows && (
          <div className={styles.embla__buttons}>
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        )}

        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(styles.embla__dot, {
                [styles['embla__dot--selected']]: index === selectedIndex,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
