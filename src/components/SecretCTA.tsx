"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useResume } from "@/context/ResumeContext";

const ease = [0.22, 1, 0.36, 1];

export default function SecretCTA() {
  const { personalInfo } = useResume();

  return (
    <section className="relative z-10 flex flex-col items-center justify-center text-center h-full min-h-[60vh] px-4">

      {/* Shushing badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/10 bg-foreground/[0.04] text-[11px] font-semibold text-foreground/50 tracking-wide"
      >
        <span>psst</span>
        <span className="w-px h-3 bg-foreground/15" />
        <span>don't tell the others</span>
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.08, ease }}
        className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08] text-foreground mb-4"
      >
        You scrolled this far.
        <br />
        <span className="text-foreground/50">That means something.</span>
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
        className="text-sm sm:text-base text-foreground/55 leading-relaxed max-w-md mb-10"
      >
        You've seen the work. You've read the words.
        Now it's decision time — hire me, or at least say hi.
        Either way, I don't bite. Much.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <Link
          href="/hire"
          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity duration-200"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 8px -2px rgba(0,0,0,0.2)" }}
        >
          There's one more thing...
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <a
          href={`mailto:${personalInfo.email}`}
          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-foreground/[0.14] text-foreground/70 font-semibold text-sm hover:border-foreground/30 hover:text-foreground hover:bg-foreground/[0.04] transition-all duration-200"
        >
          <MessageCircle size={15} className="text-foreground/40 group-hover:text-foreground/70 transition-colors" />
          Or just say hello
        </a>
      </motion.div>

      {/* Footer whisper */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
        className="mt-10 text-[11px] text-foreground/25 tracking-wide"
      >
        seriously though — you made it to the last slide. respect.
      </motion.p>

    </section>
  );
}
