// src/components/slides/SlideTransition.tsx
// Wraps AnimatePresence with the curtain-wipe clip-path transition.
// - Incoming slide (z-10): clips in via clip-path (forward=left, backward=right)
// - Outgoing slide (z-1):  holds visible for the wipe duration then is removed
// - mode="sync": both animate simultaneously so the wipe is seamless
"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { curtainVariants } from "@/lib/motion"

interface SlideTransitionProps {
  slideKey:  number
  direction: 1 | -1
  children:  React.ReactNode
}

export default function SlideTransition({ slideKey, direction, children }: SlideTransitionProps) {
  const reduced = useReducedMotion()

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={slideKey}
          custom={direction}
          variants={reduced ? undefined : curtainVariants}
          initial={reduced ? { opacity: 0 } : "initial"}
          animate={reduced ? { opacity: 1 } : "animate"}
          exit={reduced ? { opacity: 0 } : "exit"}
          className="absolute inset-0"
          style={{ zIndex: 10 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
