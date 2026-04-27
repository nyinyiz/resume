"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import HireMe from "@/features/hire/components/HireMe";

const ease = [0.22, 1, 0.36, 1];

export default function HireMePage() {
  return (
    <motion.div
      className="mx-auto w-full max-w-7xl"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      <motion.div
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease }}
        className="mb-6"
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-xs font-medium
            text-foreground/35 hover:text-foreground/70 transition-colors duration-200"
        >
          <ArrowLeft size={12}
            className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to portfolio
        </Link>
      </motion.div>

      <HireMe />
    </motion.div>
  );
}
