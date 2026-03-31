"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Orb 1 — sky blue, top-right — primary light source */}
      <motion.div
        className="absolute rounded-full bg-sky-400/[0.14] dark:bg-sky-400/[0.18] blur-[160px]"
        style={{
          width:  "min(1000px, 90vw)",
          height: "min(1000px, 90vw)",
          top:    "-35%",
          right:  "-20%",
        }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — indigo, bottom-left — cool depth shadow */}
      <motion.div
        className="absolute rounded-full bg-indigo-500/[0.09] dark:bg-indigo-500/[0.14] blur-[140px]"
        style={{
          width:  "min(850px, 80vw)",
          height: "min(850px, 80vw)",
          bottom: "-35%",
          left:   "-20%",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Orb 3 — cyan, top-left — fills corner, complements orb 1 */}
      <motion.div
        className="absolute rounded-full bg-cyan-400/[0.06] dark:bg-cyan-400/[0.10] blur-[130px]"
        style={{
          width:  "min(650px, 65vw)",
          height: "min(650px, 65vw)",
          top:    "-20%",
          left:   "-15%",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 9 }}
      />

      {/* Subtle top-edge radial — creates a soft "skylight" from above */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh] opacity-40 dark:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 0%, hsl(210 80% 65% / 0.12) 0%, transparent 100%)",
        }}
      />

      {/* Dot grid — fades out toward edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Grain overlay — breaks digital flatness */}
      <div className="absolute inset-0 noise-grain opacity-[0.04] pointer-events-none" />
    </div>
  );
}
