"use client";

import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Speaking from "@/components/Speaking";
import Certificates from "@/components/Certificates";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import {
  staggerContainer,
  heroAnimation,
  experienceAnimation,
  projectsAnimation,
  skillsAnimation,
  speakingAnimation,
  certificatesAnimation,
} from "@/lib/animations";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div 
        className="space-y-32 py-16"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div
          variants={heroAnimation}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Hero />
        </motion.div>
        
        <motion.div
          variants={experienceAnimation}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ x: 10 }}
          transition={{ duration: 0.2 }}
        >
          <Experience />
        </motion.div>

        <motion.div
          variants={projectsAnimation}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Projects />
        </motion.div>

        <motion.div
          variants={skillsAnimation}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <Skills />
        </motion.div>

        <motion.div
          variants={speakingAnimation}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ x: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Speaking />
        </motion.div>

        <motion.div
          variants={certificatesAnimation}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Certificates />
        </motion.div>
        <Analytics />
      </motion.div>
    </div>
  );
} 