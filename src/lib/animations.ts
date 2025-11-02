// Stagger container for sequential animations
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Hero section animation - Fade in and slide up
export const heroAnimation = {
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
export const experienceAnimation = {
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
export const projectsAnimation = {
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
export const skillsAnimation = {
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
export const speakingAnimation = {
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
export const certificatesAnimation = {
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

// Clone section animation
export const cloneAnimation = {
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

// Shine animation for special effects
export const shineAnimation = {
  initial: { backgroundPosition: "200% center" },
  animate: {
    backgroundPosition: ["200% center", "-200% center"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Generic fade in animation
export const fadeInUp = {
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