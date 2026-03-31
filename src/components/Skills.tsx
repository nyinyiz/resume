"use client";

import { useResume } from "@/context/ResumeContext";
import { motion } from "framer-motion";
import { Code2, Smartphone, Terminal, Layers } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const categoryMeta: Record<string, { icon: any; label: string }> = {
  languages:  { icon: Code2,      label: "Languages"     },
  frameworks: { icon: Smartphone, label: "Frameworks"    },
  tools:      { icon: Terminal,   label: "Tools & DevOps" },
  concepts:   { icon: Layers,     label: "Architecture"  },
};

function skillClass(level: number) {
  if (level >= 5) return "tag-expert";
  if (level >= 4) return "tag-proficient";
  return "tag-familiar";
}

export default function Skills() {
  const resumeData = useResume();
  const skills = resumeData.skills ?? { languages: [], frameworks: [], tools: [], concepts: [] };

  const coreSkills = (Object.values(skills) as { name: string; level: number }[][])
    .flat()
    .filter((s) => s.level >= 4)
    .map((s) => s.name);

  return (
    <section id="skills" className="relative z-10">
      <div>

        {/* Header */}
        <div className="max-w-2xl mb-5">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="section-label mb-4"
          >
            Expertise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="font-heading text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-5"
          >
            Skills & Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="text-lg text-foreground/55 font-normal leading-relaxed"
          >
            A toolkit refined over 10+ years of shipping high-performance mobile products.
          </motion.p>
        </div>

        {/* Core expertise strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mb-5 p-5 rounded-2xl glass border border-foreground/[0.08] bg-background/30"
        >
          <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-5">
            Core Expertise
          </p>
          <div className="flex flex-wrap gap-2.5">
            {coreSkills.map((skill, i) => (
              <span key={i} className="tag-expert">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(skills).map(([category, items], catIdx) => {
            const meta = categoryMeta[category] ?? { icon: Code2, label: category };
            const Icon = meta.icon;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: catIdx * 0.08, ease }}
                className="group"
              >
                <div className="glass-card h-full p-5 rounded-2xl border border-foreground/[0.07] bg-background/30 flex flex-col gap-4">
                  {/* Category header */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-foreground/[0.05] border border-foreground/[0.08] group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors duration-300">
                      <Icon size={18} className="text-foreground/60 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="font-heading font-semibold text-sm text-foreground/80 tracking-wide">
                      {meta.label}
                    </h3>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2">
                    {(items as { name: string; level: number }[]).map((skill, i) => (
                      <span key={i} className={skillClass(skill.level)}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mt-5 flex items-center gap-6 flex-wrap"
        >
          <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Proficiency:</span>
          <span className="tag-expert text-[10px]">Expert</span>
          <span className="tag-proficient text-[10px]">Proficient</span>
          <span className="tag-familiar text-[10px]">Familiar</span>
        </motion.div>

      </div>
    </section>
  );
}
