// src/components/slides/SlideTransition.tsx
// Wraps AnimatePresence with a fade transition between slides.
// transitionStyle="fade" (default): opacity cross-fade — lets layoutId phone animate freely
// transitionStyle="curtain": clip-path wipe (kept for future use / reduced-motion fallback)
"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { curtainVariants } from "@/lib/motion"

interface SlideTransitionProps {
  slideKey:       number
  direction:      1 | -1
  children:       React.ReactNode
  transitionStyle?: "curtain" | "fade"
}

const fadeIn  = { opacity: 1, transition: { duration: 0.5,  ease: [0.22, 1, 0.36, 1] as number[] } }
const fadeOut = { opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1]  as number[] } }

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
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={slideKey}
          custom={direction}
          variants={useFade ? undefined : curtainVariants}
          initial={useFade ? { opacity: 0 } : "initial"}
          animate={useFade ? fadeIn    : "animate"}
          exit={useFade    ? fadeOut   : "exit"}
          className="absolute inset-0"
          style={{ zIndex: 10 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
