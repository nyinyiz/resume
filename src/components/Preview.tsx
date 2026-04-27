"use client";

import Hero from "./Hero";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Speaking from "./Speaking";
import Certificates from "./Certificates";
import { ResumeContext } from "@/context/ResumeContext";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { ResumeData } from "@/types";

interface PreviewProps {
  data: ResumeData;
}

export default function Preview({ data }: PreviewProps) {
  const contextValue: ResumeData = {
    ...data,
    skills: data.skills ?? {
      languages: [],
      frameworks: [],
      tools: [],
      concepts: []
    },
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="space-y-32 py-16"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Hero />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Experience />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Projects />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Skills />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Speaking />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Certificates />
          </motion.div>
        </motion.div>
      </div>
    </ResumeContext.Provider>
  );
}
