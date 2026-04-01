"use client"

import { motion } from "framer-motion"

interface HomeLoaderProps {
  visible: boolean
}

const ease = [0.22, 1, 0.36, 1]

const LINES = [
  { text: "> booting portfolio...",                color: "text-foreground/50" },
  { text: "> importing 10 years of experience...", color: "text-foreground/50" },
  { text: "> calibrating coffee levels...  OK",    color: "text-foreground/50" },
  { text: "> nyi nyi zaw — lead mobile engineer",  color: "text-foreground/80" },
]

export default function HomeLoader({ visible }: HomeLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45, ease }}
      className="fixed inset-0 z-[90] flex items-center justify-center"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
    >
      <div className="flex flex-col gap-2 px-8">
        {LINES.map(({ text, color }, i) => (
          <motion.p
            key={text}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.18, ease }}
            className={`font-mono text-[13px] tracking-tight ${color}`}
          >
            {text}
          </motion.p>
        ))}

        {/* Blinking cursor on last line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: LINES.length * 0.18 + 0.1, duration: 0.2 }}
          className="flex items-center gap-2 font-mono text-[13px] text-foreground/40"
        >
          <span>&gt;</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block h-[13px] w-[7px] rounded-sm bg-foreground/40"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
