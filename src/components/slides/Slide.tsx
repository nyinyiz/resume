// src/components/slides/Slide.tsx
// Full-screen wrapper for each section.
// - Non-scrollable: flex container, section centers itself
// - Scrollable: overflow-y-auto container; edge detection triggers slide changes
"use client"

import { useRef } from "react"
import { useSlideDeck } from "./SlideDeckContext"
import { useInternalScroll } from "@/hooks/useInternalScroll"

interface SlideProps {
  children:   React.ReactNode
  scrollable: boolean
}

export default function Slide({ children, scrollable }: SlideProps) {
  const { next, prev } = useSlideDeck()
  const scrollRef = useRef<HTMLDivElement>(null)

  // useInternalScroll is a no-op when scrollRef.current is null (non-scrollable case)
  useInternalScroll(scrollable ? scrollRef : { current: null }, next, prev)

  if (scrollable) {
    return (
      <div
        ref={scrollRef}
        className="absolute inset-0 w-full overflow-y-auto overscroll-contain"
      >
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-16">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full overflow-hidden">
      <div className="relative h-full w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-8 flex flex-col justify-center">
        {children}
      </div>
    </div>
  )
}
