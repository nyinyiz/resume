// src/hooks/useInternalScroll.ts
// Attaches to the scroll container of a scrollable slide.
// When the user is at the top edge and scrolls up → onPrev().
// When at the bottom edge and scrolls down → onNext().
// Otherwise: lets native scroll handle it (content scrolls within the slide).

import { useEffect } from "react"

export function useInternalScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  onNext: () => void,
  onPrev: () => void,
  resetKey?: number,
) {
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let touchStartY = 0
    const settleUntil = Date.now() + 550

    // Always start a newly visible scrollable slide from the top.
    el.scrollTop = 0

    const atTop    = () => el.scrollTop <= 1
    const atBottom = () => el.scrollTop + el.clientHeight >= el.scrollHeight - 1

    const handleWheel = (e: WheelEvent) => {
      // Swallow momentum from the previous slide so navigation advances one slide at a time.
      if (Date.now() < settleUntil) {
        e.preventDefault()
        return
      }

      if (e.deltaY < 0 && atTop()) {
        e.preventDefault()
        onPrev()
      } else if (e.deltaY > 0 && atBottom()) {
        e.preventDefault()
        onNext()
      }
      // else: let native scroll continue
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (Date.now() < settleUntil) return

      const deltaY = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < 40) return
      if (deltaY < 0 && atTop())    onPrev()
      else if (deltaY > 0 && atBottom()) onNext()
    }

    el.addEventListener("wheel", handleWheel, { passive: false })
    el.addEventListener("touchstart", handleTouchStart, { passive: true })
    el.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      el.removeEventListener("wheel", handleWheel)
      el.removeEventListener("touchstart", handleTouchStart)
      el.removeEventListener("touchend", handleTouchEnd)
    }
  }, [containerRef, onNext, onPrev, resetKey])
}
