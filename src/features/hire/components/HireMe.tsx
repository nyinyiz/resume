"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserRound, TerminalSquare } from "lucide-react";
import { RecruiterPanel } from "./RecruiterPanel";
import { SkillPanel } from "./SkillPanel";

const ease = [0.22, 1, 0.36, 1];

const TABS = [
  {
    id:    "human",
    label: "Fit Check",
    icon:  UserRound,
    desc:  "Paste a JD and get an honest match score",
  },
  {
    id:    "agent",
    label: "Agent Install",
    icon:  TerminalSquare,
    desc:  "Give your AI my profile and let it ask first",
  },
] as const;

type Tab = (typeof TABS)[number]["id"];

/* ─── Root ─────────────────────────────────────────── */
export default function HireMe() {
  const [activeTab, setActiveTab] = useState<Tab>("human");

  return (
    <section className="relative z-10">

      {/* Header */}
      <div className="mb-7 max-w-3xl">
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
          className="mt-4 max-w-2xl text-base text-foreground/75 leading-relaxed">
          A faster hiring lane for mobile, product, and AI-adjacent teams. Use the checker yourself, or install my agent profile and let your tools ask the first questions.
        </motion.p>
      </div>

      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.35, ease }}
        className="overflow-hidden rounded-[1.75rem] border border-foreground/[0.08] bg-background/70 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.55)] backdrop-blur-sm">

        {/* Tab bar */}
        <div className="flex items-stretch border-b border-foreground/[0.07] bg-foreground/[0.015]">
          {TABS.map(({ id, label, icon: Icon, desc }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative flex flex-1 items-center gap-3 px-6 py-4 text-left transition-colors duration-150
                  ${active ? "text-foreground" : "text-foreground/50 hover:text-foreground/70"}`}
              >
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="hire-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: "#34d399" }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}

                {/* Icon */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-150
                  ${active ? "bg-foreground/[0.06]" : "bg-transparent"}`}>
                  <Icon size={15} className={active ? "text-foreground/70" : "text-foreground/40"} />
                </div>

                {/* Label + desc */}
                <div className="min-w-0">
                  <p className={`text-sm font-semibold leading-none transition-colors duration-150
                    ${active ? "text-foreground" : "text-foreground/55"}`}>
                    {label}
                  </p>
                  <p className="mt-1 truncate text-[13px] text-foreground/45">{desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel content */}
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "human" ? (
            <motion.div
              key="human"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease }}
            >
              <RecruiterPanel />
            </motion.div>
          ) : (
            <motion.div
              key="agent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease }}
            >
              <SkillPanel />
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
}
