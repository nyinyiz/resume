"use client";

import Image from "next/image";
import { Github, Linkedin, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { useResume } from "@/context/ResumeContext";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1];

const stats = [
  { value: "10+", label: "Years" },
  { value: "3",   label: "Countries" },
  { value: "10+", label: "Apps Shipped" },
];

export default function Hero() {
  const resumeData = useResume();
  const { name, title, summary, profileImage, email, github, linkedin, location } =
    resumeData.personalInfo;

  const isExternalImage = profileImage?.startsWith("http");
  const [isMounted, setIsMounted] = useState(false);

  // 3D card rotation — tracks global mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 30, stiffness: 100, mass: 2 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  // Magnetic CTA button — framer-motion only, no setState
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const smoothBtnX = useSpring(btnX, { stiffness: 280, damping: 18 });
  const smoothBtnY = useSpring(btnY, { stiffness: 280, damping: 18 });

  const handleBtnMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    btnX.set((e.clientX - (rect.left + rect.width / 2)) * 0.38);
    btnY.set((e.clientY - (rect.top + rect.height / 2)) * 0.38);
  };
  const handleBtnLeave = () => { btnX.set(0); btnY.set(0); };

  useEffect(() => {
    setIsMounted(true);
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative flex flex-col-reverse items-center justify-center gap-16 lg:gap-20 md:flex-row w-full h-full">

      {/* ── Left column ─────────────────────────── */}
      <div className="flex-1 space-y-8 max-w-2xl text-center md:text-left z-10">


        {/* Name + title */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.05, ease }}
          className="space-y-3"
        >
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.08] text-foreground">
            <span className="text-gradient">{name}</span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-foreground/55 tracking-tight">
            {title}
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease }}
          className="text-base sm:text-lg text-foreground/65 leading-relaxed max-w-xl mx-auto md:mx-0 font-normal"
        >
          {summary}
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease }}
          className="flex items-center justify-center md:justify-start pt-1"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center md:items-start px-5 first:pl-0">
                <span className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-none">
                  {s.value}
                </span>
                <span className="text-xs font-medium text-foreground/45 mt-1 tracking-wide">
                  {s.label}
                </span>
              </div>
              {i < stats.length - 1 && (
                <div className="h-10 w-px bg-foreground/10 shrink-0" />
              )}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-2"
        >
          {/* Primary — magnetic button */}
          <motion.a
            href={`mailto:${email}`}
            onMouseMove={handleBtnMove}
            onMouseLeave={handleBtnLeave}
            whileTap={{ scale: 0.97 }}
            style={{
              x: smoothBtnX,
              y: smoothBtnY,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 8px -2px rgba(0,0,0,0.2)",
            }}
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full text-sm hover:opacity-90 transition-opacity duration-200"
          >
            Let's Talk
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.a>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: github, label: "GitHub" },
              { icon: Linkedin, href: linkedin, label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full glass border border-foreground/10 hover:border-foreground/25 hover:bg-foreground/[0.07] transition-all duration-200 hover:-translate-y-0.5"
              >
                <Icon size={18} className="text-foreground/70" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right column: 3D image ───────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(16px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.1, ease }}
        className="relative z-10 w-full max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md"
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={isMounted ? { rotateX, rotateY, transformStyle: "preserve-3d" } : { transformStyle: "preserve-3d" }}
          className="relative aspect-square w-full"
        >
          {/* Ambient glow — perpetual float */}
          <motion.div
            className="absolute inset-0 bg-primary/15 blur-[90px] rounded-full"
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Image card */}
          <div className="absolute inset-0 rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-white/15 to-white/0 dark:from-white/8 p-[1px] shadow-2xl">
            <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] lg:rounded-[2.4rem] bg-background/50">
              {isExternalImage ? (
                <img
                  src={profileImage}
                  alt={name}
                  className="object-cover w-full h-full scale-105"
                />
              ) : (
                <Image
                  src={profileImage || "/placeholder-avatar.png"}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover scale-105"
                  priority
                />
              )}
              <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] rounded-[1.9rem] lg:rounded-[2.4rem] pointer-events-none" />
            </div>
          </div>

          {/* Location chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            className="absolute -bottom-5 -left-5 glass border border-foreground/10 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-xl"
          >
            <div className="p-1.5 rounded-full bg-primary/15">
              <MapPin size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-foreground/45 uppercase tracking-wider">Based In</p>
              <p className="text-sm font-bold text-foreground leading-tight">{location}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-foreground/35"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown size={14} />
      </motion.div>
    </section>
  );
}
