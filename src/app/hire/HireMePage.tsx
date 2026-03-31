"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HireMe from "@/components/HireMe";

export default function HireMePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto"
    >
      {/* Solid white card so text is always readable regardless of theme */}
      <div className="rounded-3xl bg-white px-6 sm:px-10 pt-8 pb-12 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-700 transition-colors mb-10 group"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to the pretty portfolio
        </Link>

        <HireMe />
      </div>
    </motion.div>
  );
}
