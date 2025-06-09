"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Moon, Sun, BookOpen } from "lucide-react";
import { resumeData } from "@/data/resume";
import { motion } from "framer-motion";

const shineAnimation = {
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

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { name } = resumeData.personalInfo;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-8">
          <Link href="/" className="text-xl font-bold">
            {name.split(' ')[0]}
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link href="#experience" className="hover:text-foreground/80">
              Experience
            </Link>
            <Link href="#projects" className="hover:text-foreground/80">
              Projects
            </Link>
            <Link href="#skills" className="hover:text-foreground/80">
              Skills
            </Link>
            <Link href="#speaking" className="hover:text-foreground/80">
              Speaking
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <motion.div
              variants={shineAnimation}
              initial="initial"
              animate="animate"
              className="rounded-full p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_100%]"
            >
              <Link
                href="/articles"
                className="flex items-center justify-center gap-2 bg-background px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <BookOpen className="w-5 h-5" />
                <span>Articles</span>
              </Link>
            </motion.div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-md p-2 hover:bg-accent"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 