"use client";

import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { RecruiterPanel } from "./RecruiterPanel";
import { SkillPanel } from "./SkillPanel";

const ease = [0.22, 1, 0.36, 1];

/* ─── Root ─────────────────────────────────────────── */
export default function HireMe() {
  return (
    <section className="relative z-10">
      {/* Header */}
      <div className="mb-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            className="section-label mb-3">
            <UserRound size={12} /> Hire
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl md:leading-[0.98]">
            Paste the JD. Get the honest fit check.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-4 max-w-2xl text-base text-foreground/55 leading-relaxed">
            A faster hiring lane for mobile, product, and AI-adjacent teams. Use the checker yourself, or install my agent profile and let your tools ask the first questions.
          </motion.p>
        </div>

      </div>

      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.35, ease }}
        className="overflow-hidden rounded-[1.75rem] border border-foreground/[0.08] bg-background/70 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.55)] backdrop-blur-sm">

        {/* Top strip with staggered tags */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55, ease }}
          className="flex flex-wrap items-center gap-3 border-b border-foreground/[0.07] bg-white/55 px-5 py-3.5 dark:bg-foreground/[0.02]">
          <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/30 shrink-0">
            Hiring Mode
          </span>
          {["Reads real JDs", "Robot-friendly", "No awkward calls"].map((tag, i) => (
            <motion.span key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.6 + i * 0.07, ease }}
              className="px-2.5 py-1 rounded-md bg-primary/[0.07] text-primary text-[10px]
                font-semibold border border-primary/[0.16]">
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Two columns — slide in from opposite sides */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)]">
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.5, ease }}>
            <RecruiterPanel />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.58, ease }}>
            <SkillPanel />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
