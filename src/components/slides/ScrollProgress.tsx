// src/components/slides/ScrollProgress.tsx
"use client"

import { motion } from "framer-motion"
import { useSlideDeck } from "./SlideDeckContext"
import { spring } from "@/lib/motion"

export default function ScrollProgress() {
  const { current, total } = useSlideDeck()
  const pct = `${((current + 1) / total) * 100}%`

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-foreground/5 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-violet-500 origin-left"
        animate={{ width: pct }}
        transition={spring.snappy}
      />
    </div>
  )
}
