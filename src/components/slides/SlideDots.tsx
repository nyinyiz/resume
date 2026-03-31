// src/components/slides/SlideDots.tsx
"use client"

import { motion } from "framer-motion"
import { useSlideDeck } from "./SlideDeckContext"

const LABELS = [
  "Hero",
  "Experience",
  "Projects",
  "Skills",
  "Articles",
  "Speaking",
  "Certificates",
]

export default function SlideDots() {
  const { current, total, goTo } = useSlideDeck()

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-end gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          aria-label={`Go to ${LABELS[i] ?? `slide ${i + 1}`}`}
          className="group flex items-center gap-2.5 cursor-pointer p-2"
        >
          {/* Label — desktop hover only */}
          <span
            className={`
              hidden md:block text-[9px] font-bold tracking-widest uppercase
              transition-all duration-200
              ${i === current
                ? "text-foreground/70 opacity-100"
                : "text-foreground/35 opacity-0 group-hover:opacity-100"}
            `}
          >
            {LABELS[i]}
          </span>

          {/* Dot pill */}
          <motion.div
            animate={{
              height:          i === current ? 22 : 5,
              backgroundColor: i === current
                ? "hsl(var(--primary))"
                : "hsl(var(--foreground) / 0.2)",
            }}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="w-[5px] rounded-full"
          />
        </button>
      ))}
    </div>
  )
}
