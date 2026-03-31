"use client";

import { useResume } from "@/context/ResumeContext";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export default function Speaking() {
  const resumeData = useResume();

  return (
    <section id="speaking" className="relative z-10">

      {/* Header */}
      <div className="max-w-2xl mb-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="section-label mb-4"
        >
          <Mic size={12} />
          Community
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="font-heading text-3xl md:text-4xl font-bold tracking-tighter text-foreground mb-5"
        >
          Talks & Contributions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className="text-base text-foreground/55 leading-relaxed"
        >
          Sharing knowledge and giving back through speaking engagements and community events.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
        {resumeData.communityContributions.map((contribution, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.07, ease }}
            className="group"
          >
            <div className="glass-card p-5 rounded-2xl border border-foreground/[0.07] bg-background/30 h-full flex flex-col gap-3 hover:border-primary/20 transition-colors duration-300">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/8 text-primary border border-primary/15 text-[10px] font-semibold self-start leading-none py-1.5">
                {contribution.topic}
              </span>
              <h3 className="font-heading text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                {contribution.event}
              </h3>
              {contribution.organization && (
                <p className="text-sm text-foreground/45 font-medium flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {contribution.organization}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
