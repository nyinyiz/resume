// src/lib/motion.ts
// Central animation config. Import from here instead of hardcoding values in components.

import type { Variants } from "framer-motion"

// ─── Spring presets ───────────────────────────────────────────────────────────
export const spring = {
  default: { type: "spring" as const, stiffness: 100, damping: 20 },
  snappy:  { type: "spring" as const, stiffness: 280, damping: 22 },
  slow:    { type: "spring" as const, stiffness: 60,  damping: 18 },
}

// ─── Easing curves ────────────────────────────────────────────────────────────
export const ease = {
  out:   [0.22, 1, 0.36, 1]  as [number, number, number, number],
  inOut: [0.76, 0, 0.24, 1]  as [number, number, number, number],
  sharp: [0.4,  0, 0.2,  1]  as [number, number, number, number],
}

// ─── Curtain wipe variants (direction-aware, use with custom prop) ────────────
// Forward  (direction=1):  new slide reveals from left  → clip right edge shrinks
// Backward (direction=-1): new slide reveals from right → clip left edge shrinks
export const curtainVariants: Variants = {
  initial: (dir: 1 | -1) => ({
    clipPath: dir > 0 ? "inset(0 100% 0 0)" : "inset(0 0% 0 100%)",
  }),
  animate: (_dir: 1 | -1) => ({
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  }),
  exit: (_dir: 1 | -1) => ({
    // Hold the outgoing slide fully visible for the wipe duration, then remove
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 0.9 },
  }),
}

// ─── Simple fade (section content enter, route transitions) ───────────────────
export const fadeVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
}
