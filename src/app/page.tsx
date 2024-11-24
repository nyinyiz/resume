"use client";

import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Speaking from "@/components/Speaking";
import Certificates from "@/components/Certificates";
import { motion } from "framer-motion";

// Hero section animation - Fade in and slide up
const heroAnimation = {
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

// Experience section animation - Slide in from left
const experienceAnimation = {
  initial: { x: -100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Projects section animation - Zoom in effect
const projectsAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Skills section animation - Bounce effect
const skillsAnimation = {
  initial: { y: 60, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      type: "spring",
      bounce: 0.4
    }
  }
};

// Speaking section animation - Slide in from right
const speakingAnimation = {
  initial: { x: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Certificates section animation - Fade in and scale
const certificatesAnimation = {
  initial: {
    scale: 0.9,
    opacity: 0,
    y: 30
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

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
      </motion.div>
    </div>
  );
} 