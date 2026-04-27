"use client";

import { useResume } from "@/context/ResumeContext";
import { motion } from "framer-motion";
import { Code2, Smartphone, Terminal, Layers, type LucideIcon } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const categoryMeta: Record<string, { icon: LucideIcon; label: string; accent: string }> = {
  languages:  { icon: Code2,      label: "Languages",      accent: "#60a5fa" },
  frameworks: { icon: Smartphone, label: "Frameworks",     accent: "#a78bfa" },
  tools:      { icon: Terminal,   label: "Tools & DevOps", accent: "#34d399" },
  concepts:   { icon: Layers,     label: "Architecture",   accent: "#fb923c" },
};

function SkillDots({ level, accent }: { level: number; accent: string }) {
  return (
    <div className="flex gap-[3px] shrink-0">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-[5px] h-[5px] rounded-full transition-colors duration-300"
          style={{
            background: i <= level ? accent : "hsl(var(--foreground) / 0.1)",
            opacity: i <= level ? (level === 5 ? 1 : 0.75) : 1,
          }}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const resumeData = useResume();
  const skills = resumeData.skills ?? { languages: [], frameworks: [], tools: [], concepts: [] };

  const coreSkills = (Object.values(skills) as { name: string; level: number }[][])
    .flat()
    .filter((s) => s.level >= 4)
    .slice(0, 10)
    .map((s) => s.name);

  const entries = Object.entries(skills) as [string, { name: string; level: number }[]][];

  return (
    <section id="skills" className="relative z-10">

      {/* Header */}
      <div className="max-w-2xl mb-5">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="section-label mb-2"
        >
          <Code2 size={12} /> Expertise
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="font-heading text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-2"
        >
          Skills & Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className="text-sm text-foreground/50 leading-relaxed"
        >
          A toolkit refined over 10+ years of shipping mobile products.
        </motion.p>
      </div>

      {/* Main dashboard — expands from the phone mockup */}
      <motion.div
        layoutId="phone-mockup"
        layout
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="rounded-2xl border border-foreground/[0.08] bg-background/50 backdrop-blur-sm overflow-hidden"
      >

        {/* Core stack strip */}
        <div className="px-5 py-3.5 border-b border-foreground/[0.07] flex items-center gap-2 flex-wrap">
          <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/30 mr-1 shrink-0">
            Core Stack
          </span>
          {coreSkills.map((name) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease }}
              className="px-2.5 py-1 rounded-md bg-primary/[0.08] text-primary text-[11px] font-semibold border border-primary/[0.18]"
            >
              {name}
            </motion.span>
          ))}
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {entries.map(([category, items], catIdx) => {
            const meta = categoryMeta[category] ?? { icon: Code2, label: category, accent: "#60a5fa" };
            const Icon = meta.icon;
            const isLastRow = catIdx >= 2;
            const isLastCol = [1, 3].includes(catIdx);

            return (
              <motion.div
                key={category}
                layoutId={`skill-card-${catIdx}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  layout: { type: "spring", stiffness: 200, damping: 26 },
                  duration: 0.5, delay: 0.15 + catIdx * 0.07, ease,
                }}
                className={[
                  "p-4 sm:p-5 space-y-3",
                  !isLastCol ? "border-r border-foreground/[0.07]" : "",
                  !isLastRow ? "border-b border-foreground/[0.07]" : "",
                ].join(" ")}
              >
                {/* Category header */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: meta.accent + "18" }}
                  >
                    <Icon size={13} style={{ color: meta.accent }} />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: meta.accent + "cc" }}
                  >
                    {meta.label}
                  </span>
                </div>

                {/* Skills list */}
                <div className="space-y-2.5">
                  {items.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.3 + catIdx * 0.06 + i * 0.04, ease }}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-[13px] text-foreground/70 font-medium leading-none">
                        {skill.name}
                      </span>
                      <SkillDots level={skill.level} accent={meta.accent} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom legend */}
        <div className="px-5 py-3 border-t border-foreground/[0.07] flex items-center gap-5 flex-wrap">
          <span className="text-[9px] font-bold text-foreground/25 uppercase tracking-widest">Proficiency</span>
          {[
            { label: "Expert",     dots: 5 },
            { label: "Proficient", dots: 4 },
            { label: "Familiar",   dots: 3 },
          ].map(({ label, dots }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex gap-[3px]">
                {[1,2,3,4,5].map((i) => (
                  <div
                    key={i}
                    className="w-[5px] h-[5px] rounded-full"
                    style={{ background: i <= dots ? "#60a5fa" : "hsl(var(--foreground) / 0.1)" }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-foreground/35 font-medium">{label}</span>
            </div>
          ))}
        </div>

      </motion.div>

    </section>
  );
}
