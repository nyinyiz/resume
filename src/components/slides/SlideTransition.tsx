// src/components/slides/SlideTransition.tsx
// Wraps AnimatePresence with a fade transition between slides.
// mode="wait" — exit completes before enter begins. Prevents two full-screen
// composited layers overlapping, which causes stutter on mid/low-end devices.
"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { curtainVariants } from "@/lib/motion"

interface SlideTransitionProps {
  slideKey:         number
  direction:        1 | -1
  children:         React.ReactNode
  transitionStyle?: "curtain" | "fade"
}

// Tighter timings — exit fast, enter crisp. Total: ~0.55s vs old ~0.85s
const fadeIn  = { opacity: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as number[] } }
const fadeOut = { opacity: 0, transition: { duration: 0.18, ease: [0.4, 0, 0.6, 1]  as number[] } }

export default function SlideTransition({
  slideKey,
  direction,
  children,
  transitionStyle = "fade",
}: SlideTransitionProps) {
  const reduced = useReducedMotion()
  const useFade = reduced || transitionStyle === "fade"

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slideKey}
          custom={direction}
          variants={useFade ? undefined : curtainVariants}
          initial={useFade ? { opacity: 0 } : "initial"}
          animate={useFade ? fadeIn    : "animate"}
          exit={useFade    ? fadeOut   : "exit"}
          className="absolute inset-0"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
