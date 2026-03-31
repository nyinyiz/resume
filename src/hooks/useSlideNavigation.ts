// src/hooks/useSlideNavigation.ts
// Handles keyboard (always) and wheel/touch (only for non-scrollable slides).
// Scrollable slides use useInternalScroll instead.
// Uses refs throughout to avoid re-registering event listeners on every render.

import { useEffect, useRef } from "react"

export function useSlideNavigation(
  onNext: () => void,
  onPrev: () => void,
  isCurrentScrollable: boolean,
) {
  const nextRef      = useRef(onNext)
  const prevRef      = useRef(onPrev)
  const scrollableRef = useRef(isCurrentScrollable)
  const deltaAccRef  = useRef(0)          // accumulated wheel delta
  const resetTimer   = useRef<ReturnType<typeof setTimeout>>()

  // Keep refs in sync without re-registering listeners
  useEffect(() => { nextRef.current = onNext }, [onNext])
  useEffect(() => { prevRef.current = onPrev }, [onPrev])
  useEffect(() => {
    scrollableRef.current = isCurrentScrollable
    // Clear any pending delta when slide type changes
    deltaAccRef.current = 0
  }, [isCurrentScrollable])

  useEffect(() => {
    let touchStartY = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault()
        nextRef.current()
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault()
        prevRef.current()
      }
    }

    const handleWheel = (e: WheelEvent) => {
      // Scrollable slides own their wheel events via useInternalScroll
      if (scrollableRef.current) return
      e.preventDefault()

      // Accumulate delta — one swipe gesture = one slide change
      deltaAccRef.current += e.deltaY

      // Reset accumulator after the wheel goes quiet (handles momentum tail-off)
      clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => {
        deltaAccRef.current = 0
      }, 250)

      if (deltaAccRef.current >= 80) {
        deltaAccRef.current = 0
        clearTimeout(resetTimer.current)
        nextRef.current()
      } else if (deltaAccRef.current <= -80) {
        deltaAccRef.current = 0
        clearTimeout(resetTimer.current)
        prevRef.current()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (scrollableRef.current) return
      const deltaY = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < 40) return
      if (deltaY > 0) nextRef.current()
      else prevRef.current()
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      clearTimeout(resetTimer.current)
    }
  }, []) // empty — all deps handled via refs
}
