"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-[10px] font-bold tracking-widest uppercase text-foreground/30 mb-4"
      >
        Error 404
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.05, ease }}
        className="font-heading text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-none text-foreground mb-6"
      >
        Lost?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        className="text-base text-foreground/50 max-w-sm leading-relaxed mb-10"
      >
        This page doesn't exist. Maybe you followed a broken link, or it was moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease }}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full text-sm hover:opacity-90 active:scale-[0.97] transition-all duration-200"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Portfolio
        </Link>
      </motion.div>
    </div>
  );
}
