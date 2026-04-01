"use client"

import { motion } from "framer-motion"

interface HomeLoaderProps {
  visible: boolean
}

export default function HomeLoader({ visible }: HomeLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-background"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
    >
      <div className="relative flex w-full max-w-md flex-col items-center gap-6 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-foreground/40">
            Loading Portfolio
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Nyi Nyi Zaw
          </h1>
          <p className="text-sm text-foreground/55 sm:text-base">
            Lead Mobile Engineer
          </p>
        </motion.div>

        <div className="w-full max-w-[260px] overflow-hidden rounded-full bg-foreground/[0.08]">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 via-primary to-cyan-300"
          />
        </div>

        <motion.div
          animate={{ opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-xs tracking-[0.18em] text-foreground/35 uppercase"
        >
          Preparing slides
        </motion.div>
      </div>
    </motion.div>
  )
}
