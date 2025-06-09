"use client";

import MediumArticles from "@/components/MediumArticles";
import { motion } from "framer-motion";

export default function ArticlesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MediumArticles />
      </div>
    </motion.div>
  );
} 