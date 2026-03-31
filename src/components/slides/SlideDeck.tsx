// src/components/slides/SlideDeck.tsx
// Orchestrates the slide-deck experience.
// - Manages current index + direction state
// - Exposes next/prev (with 750ms cooldown) and goTo (no cooldown) via context
// - Registers keyboard + wheel + touch listeners via useSlideNavigation
// - Renders SlideTransition > Slide > section component
"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { SlideDeckContext } from "./SlideDeckContext"
import SlideTransition from "./SlideTransition"
import Slide from "./Slide"
import SlideDots from "./SlideDots"
import ScrollProgress from "./ScrollProgress"
import { useSlideNavigation } from "@/hooks/useSlideNavigation"

export interface SlideConfig {
  component:  React.ReactNode
  label:      string
  scrollable: boolean
}

interface SlideDeckProps {
  slides: SlideConfig[]
}

export default function SlideDeck({ slides }: SlideDeckProps) {
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  // Central cooldown shared by all navigation paths
  const cooldownRef = useRef(0)

  const canTrigger = useCallback(() => {
    const now = Date.now()
    if (now - cooldownRef.current < 750) return false
    cooldownRef.current = now
    return true
  }, [])

  const goTo = useCallback((index: number) => {
    if (index === current) return
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const next = useCallback(() => {
    if (!canTrigger()) return
    setCurrent(c => {
      const n = Math.min(c + 1, slides.length - 1)
      if (n !== c) setDirection(1)
      return n
    })
  }, [canTrigger, slides.length])

  const prev = useCallback(() => {
    if (!canTrigger()) return
    setCurrent(c => {
      const n = Math.max(c - 1, 0)
      if (n !== c) setDirection(-1)
      return n
    })
  }, [canTrigger])

  const isCurrentScrollable = slides[current]?.scrollable ?? false

  useSlideNavigation(next, prev, isCurrentScrollable)

  // Lock page-level scroll while slide-deck is active
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = original }
  }, [])

  return (
    <SlideDeckContext.Provider value={{ current, total: slides.length, direction, next, prev, goTo }}>
      {/* Full-screen fixed container — sits above layout, below navbar-level z-50 */}
      <div className="fixed inset-0 z-20">
        <SlideTransition slideKey={current} direction={direction}>
          <Slide scrollable={isCurrentScrollable}>
            {slides[current].component}
          </Slide>
        </SlideTransition>

        <ScrollProgress />
        <SlideDots />
      </div>
    </SlideDeckContext.Provider>
  )
}
