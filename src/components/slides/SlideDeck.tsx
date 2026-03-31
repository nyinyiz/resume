// src/components/slides/SlideDeck.tsx
"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { LayoutGroup } from "framer-motion"
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

// Indices where both slides share a phone mockup — use fade so layoutId animates freely
const isPhoneBridge = (a: number, b: number) =>
  (a === 1 && b === 2) || (a === 2 && b === 1)

export default function SlideDeck({ slides }: SlideDeckProps) {
  const [current,         setCurrent]         = useState(0)
  const [direction,       setDirection]       = useState<1 | -1>(1)
  const [transitionStyle, setTransitionStyle] = useState<"curtain" | "fade">("curtain")

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
    setTransitionStyle(isPhoneBridge(current, index) ? "fade" : "curtain")
    setCurrent(index)
  }, [current])

  const next = useCallback(() => {
    if (!canTrigger()) return
    const n = Math.min(current + 1, slides.length - 1)
    if (n !== current) {
      setDirection(1)
      setTransitionStyle(isPhoneBridge(current, n) ? "fade" : "curtain")
      setCurrent(n)
    }
  }, [canTrigger, slides.length, current])

  const prev = useCallback(() => {
    if (!canTrigger()) return
    const n = Math.max(current - 1, 0)
    if (n !== current) {
      setDirection(-1)
      setTransitionStyle(isPhoneBridge(current, n) ? "fade" : "curtain")
      setCurrent(n)
    }
  }, [canTrigger, current])

  const isCurrentScrollable = slides[current]?.scrollable ?? false

  useSlideNavigation(next, prev, isCurrentScrollable)

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = original }
  }, [])

  return (
    <SlideDeckContext.Provider value={{ current, total: slides.length, direction, next, prev, goTo }}>
      <LayoutGroup id="portfolio-deck">
        <div className="fixed inset-0 z-20">
          <SlideTransition
            slideKey={current}
            direction={direction}
            transitionStyle={transitionStyle}
          >
            <Slide scrollable={isCurrentScrollable}>
              {slides[current].component}
            </Slide>
          </SlideTransition>

          <ScrollProgress />
          <SlideDots />
        </div>
      </LayoutGroup>
    </SlideDeckContext.Provider>
  )
}
