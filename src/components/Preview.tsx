"use client";

import Hero from "./Hero";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Speaking from "./Speaking";
import Certificates from "./Certificates";
import { ResumeContext } from "@/context/ResumeContext";
import { motion } from "framer-motion";

interface PreviewProps {
  data: any;
}

// Animation variants
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function Preview({ data }: PreviewProps) {
  // Create a new context value with the updated data, including skills
  const contextValue = {
    personalInfo: data.personalInfo || {},
    experience: data.experience || [],
    projects: data.projects || [],
    communityContributions: data.communityContributions || [],
    certificates: data.certificates || [],
    skills: data.skills || {
      languages: [],
      frameworks: [],
      tools: [],
      concepts: []
    }
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
