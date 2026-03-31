"use client";

import MediumArticles from "@/components/MediumArticles";
import { motion } from "framer-motion";

export default function ArticlesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <MediumArticles />
    </motion.div>
  );
} 