"use client";

import { useResume } from "@/context/ResumeContext";
import { ExternalLink, Award } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function Certificates() {
  const resumeData = useResume();

  return (
    <section id="certificates" className="relative z-10">

      {/* Header — left-aligned, consistent with all other sections */}
      <div className="max-w-2xl mb-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="section-label mb-4"
        >
          <Award size={12} />
          Credentials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="font-heading text-3xl md:text-4xl font-bold tracking-tighter text-foreground mb-5"
        >
          Certifications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className="text-base text-foreground/55 leading-relaxed"
        >
          Continuous learning and professional development to stay current with industry standards.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumeData.certificates.map((cert, index) => (
          <motion.a
            key={index}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05, ease }}
            className="glass-card p-4 flex items-center justify-between gap-4 group"
          >
            <p className="font-medium text-sm text-foreground/75 group-hover:text-foreground transition-colors duration-200 leading-snug min-w-0">
              {cert.name}
            </p>
            <ExternalLink
              size={13}
              className="text-foreground/20 group-hover:text-primary shrink-0 transition-colors duration-200"
            />
          </motion.a>
        ))}
      </div>

    </section>
  );
}
