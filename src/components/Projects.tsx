"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types";

const ease = [0.22, 1, 0.36, 1];

const themes: { from: string; to: string; category: string }[] = [
  { from: "#6366F1", to: "#8B5CF6", category: "AI & Automation" },
  { from: "#1B5EBF", to: "#F5A623", category: "Healthcare" },
  { from: "#E8002D", to: "#FF6B35", category: "Entertainment" },
  { from: "#EF7C00", to: "#003D7C", category: "Access Control" },
  { from: "#EF7C00", to: "#003D7C", category: "Access Control" },
  { from: "#0066CC", to: "#0099FF", category: "Transportation" },
  { from: "#1A3A9E", to: "#1E4DC7", category: "Ride Sharing" },
  { from: "#6B7280", to: "#9CA3AF", category: "News" },
  { from: "#6B7280", to: "#9CA3AF", category: "Education" },
];

function getPlatform(link?: string) {
  if (!link) return null;
  if (link.includes("play.google.com")) return "android";
  if (link.includes("apps.apple.com")) return "ios";
  if (link.startsWith("/")) return "web";
  return "web";
}


function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto select-none" style={{ width: 260, height: 530 }}>
      <div className="absolute inset-[-20px] bg-primary/10 blur-[60px] rounded-full -z-10" />
      <div className="absolute inset-0 rounded-[44px] border-2 border-foreground/20 bg-foreground/5 shadow-2xl overflow-hidden">
        <div className="absolute -left-[3px] top-24 w-[3px] h-7 bg-foreground/20 rounded-l-full" />
        <div className="absolute -left-[3px] top-36 w-[3px] h-9 bg-foreground/20 rounded-l-full" />
        <div className="absolute -right-[3px] top-32 w-[3px] h-11 bg-foreground/20 rounded-r-full" />
        <div className="absolute inset-[3px] rounded-[41px] overflow-hidden bg-background">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-foreground/90 rounded-full z-20" />
          <div className="absolute inset-0 pt-10 overflow-hidden">{children}</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-foreground/25 rounded-full z-20" />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const resumeData = useResume();
  const projects: Project[] = resumeData.projects;
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const reduced = useReducedMotion();

  const active = projects[hoveredIndex];
  const activeTheme = themes[hoveredIndex] ?? themes[0];
  const activePlatform = getPlatform(active?.link);

  return (
    <section id="projects" className="relative z-10">
      {/* Header */}
      <div className="max-w-2xl mb-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease }}
          className="section-label mb-2"
        >
          Portfolio
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.05, ease }}
          className="font-heading text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-2"
        >
          Selected Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.12, ease }}
          className="text-sm text-foreground/50 leading-relaxed"
        >
          Mobile products built across Android, iOS and beyond.
        </motion.p>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">

        {/* Info panel — updates on hover/tap */}
        <div className="flex-1 max-w-sm order-2 lg:order-1 min-h-[180px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredIndex}
              initial={{ opacity: 0, x: reduced ? 0 : -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduced ? 0 : -16 }}
              transition={{ duration: 0.22, ease }}
              className="space-y-3 w-full"
            >
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                style={{ background: `linear-gradient(90deg, ${activeTheme.from}, ${activeTheme.to})` }}
              >
                {activeTheme.category}
              </span>

              <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">
                {active.name}
              </h3>

              <p className="text-foreground/60 leading-relaxed text-sm">
                {active.description}
              </p>

              {active.link && (
                <Link
                  href={active.link}
                  {...(!active.internal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  style={{ background: `linear-gradient(90deg, ${activeTheme.from}, ${activeTheme.to})` }}
                >
                  {activePlatform === "android" || activePlatform === "ios" ? "View on Store" : "View Project"}
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phone with app grid */}
        <div className="order-1 lg:order-2 flex-shrink-0">
          <motion.div
            layoutId="phone-mockup"
            layout
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          >
          <PhoneMockup>
            {/* Subtle wallpaper gradient */}
            <div className="absolute inset-0 opacity-30"
              style={{
                background: activeTheme
                  ? `radial-gradient(ellipse at 50% 30%, ${activeTheme.from}40 0%, transparent 70%)`
                  : "radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.2) 0%, transparent 70%)",
                transition: "background 0.5s ease",
              }}
            />

            {/* Time display */}
            <div className="relative z-10 flex flex-col items-center pt-6 pb-2">
              <p className="text-foreground/20 text-[10px] font-medium tracking-widest uppercase">Portfolio</p>
            </div>

            {/* App icon grid */}
            <div className="relative z-10 px-5 pb-4">
              <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                {projects.map((project, i) => {
                  const theme = themes[i] ?? themes[0];
                  const isActive = hoveredIndex === i;
                  return (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center gap-1.5 cursor-pointer"
                      onClick={() => setHoveredIndex(i)}
                      whileTap={{ scale: 0.9 }}
                      animate={
                        reduced ? {} :
                        isActive
                          ? { scale: 1.12, y: -2 }
                          : { scale: 0.93, opacity: 0.5 }
                      }
                      transition={{ duration: 0.18, ease }}
                    >
                      {/* Icon */}
                      <motion.div
                        className="w-[58px] h-[58px] rounded-[16px] flex items-center justify-center shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                        }}
                        animate={
                          isActive
                            ? { boxShadow: `0 8px 20px ${theme.from}66` }
                            : { boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }
                        }
                        transition={{ duration: 0.18 }}
                      >
                        <span className="text-white font-bold text-xl">{project.name.charAt(0)}</span>
                      </motion.div>

                      {/* Label */}
                      <span
                        className="text-[9px] font-medium text-center leading-tight w-[60px] truncate transition-colors duration-200"
                        style={{ color: isActive ? "var(--foreground)" : "color-mix(in srgb, var(--foreground) 45%, transparent)" }}
                      >
                        {project.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Dock */}
            <Link
              href={resumeData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[220px] h-[68px] rounded-[22px] bg-foreground/[0.06] border border-foreground/[0.08] backdrop-blur-sm flex items-center justify-center gap-2 hover:bg-foreground/[0.1] transition-colors duration-200"
            >
              <ArrowUpRight size={11} className="text-foreground/35" />
              <p className="text-[9px] font-medium text-foreground/35 tracking-widest uppercase">
                See more on GitHub
              </p>
            </Link>
          </PhoneMockup>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
