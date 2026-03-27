"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState, useCallback } from "react";

const FRAME_OFFSET = -30;
const FRAMES_VISIBLE_LENGTH = 3;

function clamp(val: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(val, min), max);
}

export interface Review {
  id: string | number;
  body: string;
  author: string;
  title: string;
}

interface ReviewCardProps {
  review: Review;
  index: number;
  activeIndex: number;
  totalCards: number;
}

function ReviewCard({
  review,
  index,
  activeIndex,
  totalCards,
}: ReviewCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const offsetIndex = index - activeIndex;

  // الحسابات الخاصة بالشفافية والظهور
  // الكرت النشط = 1، الكروت التالية تتلاشى تدريجياً، الكروت السابقة تختفي
  const opacity = index === activeIndex 
    ? 1 
    : index > activeIndex 
      ? clamp(1 - offsetIndex * 0.4, [0, 1]) 
      : 0;

  const blur = activeIndex > index ? 4 : 0;
  
  const scale = shouldReduceMotion
    ? 1
    : index >= activeIndex 
      ? clamp(1 - offsetIndex * 0.05, [0.85, 1]) 
      : 1.05;

  const y = shouldReduceMotion
    ? 0
    : clamp(offsetIndex * FRAME_OFFSET, [
        FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
        Number.POSITIVE_INFINITY,
      ]);

  const isActive = index === activeIndex;

  return (
    <motion.figure
      animate={{
        y,
        scale,
        opacity,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 25,
          mass: 0.5,
        },
      }}
      className={cn(
        "absolute left-1/2 w-[calc(100%-2rem)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-foreground/10 bg-background/80 p-5 shadow-xl backdrop-blur-md sm:p-6"
      )}
      initial={false}
      style={{
        borderWidth: 1 / scale,
        willChange: "opacity, filter, transform",
        filter: `blur(${blur}px)`,
        zIndex: totalCards - index,
        pointerEvents: isActive ? "auto" : "none",
        top: "50%",
      }}
    >
      <blockquote className="relative">
        <div className="absolute -top-2 -left-3 text-5xl text-foreground/5 leading-none select-none">
          "
        </div>
        <p className="relative text-foreground text-sm leading-relaxed italic">
          {review.body}
        </p>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-2 border-foreground/5 border-t pt-4">
        <div className="flex flex-col">
          <span className="font-bold text-foreground text-sm">
            {review.author}
          </span>
          <span className="text-muted-foreground text-xs">{review.title}</span>
        </div>
      </figcaption>
    </motion.figure>
  );
}

function NavigationButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-background/50 backdrop-blur-sm transition-all active:scale-90",
        disabled ? "opacity-20 cursor-not-allowed" : "hover:bg-background/80 hover:border-primary/50"
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export interface ReviewsCarouselProps {
  reviews: Review[];
  className?: string;
  height?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ReviewsCarousel({
  reviews,
  className = "",
  height = "380px",
  autoPlay = false,
  autoPlayInterval = 5000,
}: ReviewsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = reviews.length - 1;

  const goToPrevious = useCallback(() => {
    setActiveIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((i) => (i < maxIndex ? i + 1 : i));
  }, [maxIndex]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, maxIndex]);

  return (
    <div className={cn("relative mx-auto w-full max-w-4xl", className)} style={{ height }}>
      <div className="relative h-full w-full">
        {reviews.map((review, index) => (
          <ReviewCard
            activeIndex={activeIndex}
            index={index}
            key={review.id}
            review={review}
            totalCards={reviews.length}
          />
        ))}
      </div>

      <div dir="ltr" className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4">
        <NavigationButton direction="prev" disabled={activeIndex === 0} onClick={goToPrevious} />
        
        <div className="flex gap-1.5">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
              )}
            />
          ))}
        </div>

        <NavigationButton direction="next" disabled={activeIndex === maxIndex} onClick={goToNext} />
      </div>
    </div>
  );
}