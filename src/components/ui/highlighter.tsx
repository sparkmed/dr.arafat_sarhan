import { useEffect, useRef } from 'react'
import type React from 'react'
import { useInView } from 'motion/react'
import { annotate } from 'rough-notation'
import { type RoughAnnotation } from 'rough-notation/lib/model'

type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket'

// 2. Define the missing Interface
interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export function Highlighter({
  children,
  action = 'highlight',
  color = '#ffd1dc',
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const annotationRef = useRef<RoughAnnotation | null>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: '-10%',
  })

  const shouldShow = !isView || isInView

  useEffect(() => {
    if (!shouldShow || !elementRef.current) return

    const element = elementRef.current
    const annotationConfig = {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    }

    const annotation = annotate(element, annotationConfig)
    annotationRef.current = annotation
    annotation.show()

    // 1. Refresh logic to reposition the SVG
    const refreshAnnotation = () => {
      if (annotationRef.current) {
        // rough-notation's built-in refresh method is more efficient than hide/show
        // @ts-ignore - rough-notation types sometimes miss 'isShowing'
        annotationRef.current.hide()
        annotationRef.current.show()
      }
    }

    // 2. Observe both size AND layout shifts
    const resizeObserver = new ResizeObserver(refreshAnnotation)
    resizeObserver.observe(element)

    // 3. LISTEN FOR SCROLL: This fixes the Sticky Header shift
    // We add a small delay or check to reposition when the sticky header kicks in
    window.addEventListener('scroll', refreshAnnotation, { passive: true })

    return () => {
      annotation.remove()
      resizeObserver.disconnect()
      window.removeEventListener('scroll', refreshAnnotation)
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  return (
    <span ref={elementRef} className="relative inline-block">
      {children}
    </span>
  )
}
