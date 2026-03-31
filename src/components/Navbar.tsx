"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Moon, Sun, BookOpen } from "lucide-react";
import { resumeData } from "@/data/resume";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects"   },
  { href: "#skills",     label: "Skills"     },
  { href: "#speaking",   label: "Speaking"   },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const firstName = resumeData.personalInfo.name.split(" ")[0];
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 150);
  });

  if (!mounted) return null;
  const isHome = pathname === "/";

  return (
    <motion.nav
      variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: "-120%", opacity: 0 } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-[70] flex justify-center px-4"
    >
      <div className="glass rounded-full px-5 py-2.5 flex items-center gap-6 md:gap-10 shadow-lg shadow-black/10 border border-foreground/[0.08]">

        {/* Brand */}
        <Link
          href="/"
          className="font-heading text-lg font-bold text-foreground shrink-0 tracking-tight"
        >
          {firstName}
        </Link>

        {/* Nav links — hidden on home route (SlideDots handles section navigation) */}
        {!isHome && (
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/articles"
            className="flex items-center gap-1.5 text-primary text-sm font-medium bg-primary/10 hover:bg-primary/15 border border-primary/20 px-3.5 py-1.5 rounded-full transition-colors duration-200"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Articles</span>
          </Link>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-foreground/[0.05] hover:bg-foreground/[0.1] border border-foreground/[0.08] transition-colors duration-200"
          >
            {theme === "dark"
              ? <Sun size={16} className="text-yellow-400" />
              : <Moon size={16} className="text-primary" />
            }
          </button>
        </div>

      </div>
    </motion.nav>
  );
}
