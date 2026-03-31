"use client";

import { useResume } from "@/context/ResumeContext";
import { motion } from "framer-motion";
import { Mic, Award, ExternalLink } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export default function TalksAndCredentials() {
  const resumeData = useResume();
  const talks = resumeData.communityContributions;
  const certs = resumeData.certificates;

  return (
    <section className="relative z-10">

      {/* Header */}
      <div className="max-w-2xl mb-5">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="section-label mb-2"
        >
          <Mic size={12} /> Community & Credentials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="font-heading text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-2"
        >
          Talks & Certifications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className="text-sm text-foreground/50 leading-relaxed"
        >
          Speaking engagements, community work, and professional credentials.
        </motion.p>
      </div>

      {/* Two-column split */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-10">

        {/* ── Left: Talks ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease }}
            className="flex items-center gap-2 mb-3"
          >
            <Mic size={13} className="text-primary/70" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/35">
              Talks & Contributions
            </span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {talks.map((talk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 + i * 0.06, ease }}
                className="glass-card p-4 rounded-2xl border border-foreground/[0.07] bg-background/30 flex flex-col gap-2.5 hover:border-primary/20 transition-colors duration-300"
              >
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/[0.08] text-primary border border-primary/[0.15] text-[10px] font-semibold self-start leading-none">
                  {talk.topic}
                </span>
                <p className="font-semibold text-sm text-foreground leading-snug">
                  {talk.event}
                </p>
                {talk.organization && (
                  <p className="text-xs text-foreground/40 font-medium flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary/40 shrink-0" />
                    {talk.organization}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Right: Certifications ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="flex items-center gap-2 mb-3"
          >
            <Award size={13} className="text-primary/70" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/35">
              Certifications
            </span>
          </motion.div>

          <div className="flex flex-col gap-2">
            {certs.map((cert, i) => (
              <motion.a
                key={i}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.07, ease }}
                className="group glass-card px-4 py-3.5 rounded-xl border border-foreground/[0.07] bg-background/30 flex items-center justify-between gap-4 hover:border-primary/20 transition-colors duration-300"
              >
                <p className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-200 leading-snug">
                  {cert.name}
                </p>
                <ExternalLink
                  size={13}
                  className="text-foreground/20 group-hover:text-primary shrink-0 transition-colors duration-200"
                />
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
