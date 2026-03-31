"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { ArrowRight, Briefcase, Github, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1];

const companyThemes: Record<string, { from: string; to: string }> = {
  "PassKit":            { from: "#2563EB", to: "#0EA5E9" },
  "Self-employed":      { from: "#7C3AED", to: "#A855F7" },
  "Thonburi Hospital":  { from: "#1B5EBF", to: "#F5A623" },
  "True Digital Group": { from: "#E8002D", to: "#FF6B35" },
  "GTRIIP":             { from: "#059669", to: "#0EA5E9" },
};


function TextImpact({ text }: { text: string }) {
  return (
    <>
      <p className="text-[8px] font-bold uppercase tracking-widest text-white/60 mb-1.5">Impact</p>
      <p className="text-white text-[11px] font-semibold leading-snug">{text}</p>
    </>
  );
}

const companyImpactContent: Record<string, (theme: { from: string; to: string }) => React.ReactNode> = {
  "PassKit":            (_theme) => <TextImpact text="Leading iOS & Android · Loyalty Scanner · PassReader" />,
  "Self-employed":      () => <TextImpact text="3 countries · 5+ clients · Fractional CTO" />,
  "Thonburi Hospital":  () => <TextImpact text="Healthcare platform connecting doctors & nurses" />,
  "True Digital Group": () => <TextImpact text="Shipped features to 10M+ TrueID users" />,
  "GTRIIP":             () => <TextImpact text="Enterprise door-lock SDK integrated into production" />,
};

const fallbackTheme = { from: "#6B7280", to: "#9CA3AF" };

function groupByCompany(experiences: any[]) {
  const grouped: any[] = [];
  let current: any = null;
  experiences.forEach((exp) => {
    if (current && current.company === exp.company) {
      current.roles.push(exp);
    } else {
      if (current) grouped.push(current);
      current = { company: exp.company, location: exp.location, type: exp.type, roles: [exp] };
    }
  });
  if (current) grouped.push(current);
  return grouped;
}

// ─── Abstract app UIs per company ────────────────────────────────────────────

function PassKitUI({ theme }: { theme: { from: string; to: string } }) {
  return (
    <div className="flex flex-col h-full px-3 pt-2 pb-3 gap-2">
      {/* App header */}
      <div className="flex items-center justify-between mb-1">
        <div className="w-16 h-2.5 rounded-full bg-foreground/10" />
        <div className="w-6 h-6 rounded-full bg-foreground/[0.06]" />
      </div>
      {/* Pass card */}
      <div className="rounded-2xl p-3 shadow-md flex-shrink-0" style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}>
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <div className="w-12 h-1.5 rounded-full bg-white/40" />
            <div className="w-8 h-1 rounded-full bg-white/25" />
          </div>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/50" />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <div className="w-16 h-1 rounded-full bg-white/25" />
            <div className="w-10 h-2 rounded-full bg-white/60" />
          </div>
          <div className="text-white/70 text-[8px] font-bold">NFC</div>
        </div>
      </div>
      {/* Pass list */}
      {[theme.from + "30", theme.to + "25", "#6B728025"].map((bg, i) => (
        <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-foreground/[0.03] border border-foreground/[0.05]">
          <div className="w-7 h-7 rounded-lg flex-shrink-0" style={{ background: bg }} />
          <div className="flex-1 space-y-1">
            <div className="w-20 h-1.5 rounded-full bg-foreground/10" />
            <div className="w-12 h-1 rounded-full bg-foreground/6" />
          </div>
          <div className="w-4 h-4 rounded-full bg-foreground/5" />
        </div>
      ))}
    </div>
  );
}

function FreelanceUI({ theme }: { theme: { from: string; to: string } }) {
  return (
    <div className="flex flex-col h-full px-3 pt-2 pb-3 gap-2.5">
      <div className="flex items-center justify-between">
        <div className="w-20 h-2.5 rounded-full bg-foreground/10" />
        <div className="w-5 h-5 rounded-md bg-foreground/8" />
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-1.5">
        {[theme.from, theme.to, "#F59E0B"].map((color, i) => (
          <div key={i} className="rounded-xl p-2 text-center" style={{ background: color + "18" }}>
            <div className="w-6 h-3 rounded-full mx-auto mb-1" style={{ background: color + "60" }} />
            <div className="w-8 h-1.5 rounded-full mx-auto bg-foreground/10" />
          </div>
        ))}
      </div>
      {/* Project list */}
      {["Crypto · Thailand", "Printer SDK · SG", "EdTech CTO · MM"].map((label, i) => (
        <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-foreground/[0.03] border border-foreground/[0.05]">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: [theme.from, theme.to, "#F59E0B"][i] }} />
          <div className="flex-1">
            <div className="text-[9px] font-medium text-foreground/40">{label}</div>
          </div>
          <div className="w-8 h-1.5 rounded-full bg-foreground/8" />
        </div>
      ))}
      {/* Activity bar */}
      <div className="mt-auto flex items-end gap-1 h-10">
        {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 5 ? theme.from : theme.from + "30" }} />
        ))}
      </div>
    </div>
  );
}

function HospitalUI({ theme }: { theme: { from: string; to: string } }) {
  return (
    <div className="flex flex-col h-full px-3 pt-2 pb-3 gap-2.5">
      <div className="flex items-center gap-2 mb-0.5">
        <div className="w-7 h-7 rounded-full" style={{ background: `linear-gradient(135deg, ${theme.from}60, ${theme.to}60)` }} />
        <div className="space-y-1">
          <div className="w-16 h-2 rounded-full bg-foreground/12" />
          <div className="w-10 h-1.5 rounded-full bg-foreground/7" />
        </div>
      </div>
      {/* Vitals row */}
      <div className="grid grid-cols-3 gap-1.5">
        {[{ color: "#EF4444", icon: "♥" }, { color: theme.from, icon: "⚡" }, { color: "#10B981", icon: "◎" }].map((v, i) => (
          <div key={i} className="rounded-xl p-2 text-center border border-foreground/5" style={{ background: v.color + "12" }}>
            <div className="text-[10px] mb-0.5" style={{ color: v.color }}>{v.icon}</div>
            <div className="w-8 h-2 rounded-full mx-auto" style={{ background: v.color + "40" }} />
          </div>
        ))}
      </div>
      {/* Message threads */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-foreground/[0.03] border border-foreground/[0.05]">
          <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ background: theme.from + (i === 0 ? "40" : "20") }} />
          <div className="flex-1 space-y-1">
            <div className="w-16 h-1.5 rounded-full bg-foreground/12" />
            <div className="w-24 h-1 rounded-full bg-foreground/6" />
          </div>
          {i === 0 && <div className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-white" style={{ background: theme.from }}>3</div>}
        </div>
      ))}
    </div>
  );
}

function StreamingUI({ theme }: { theme: { from: string; to: string } }) {
  return (
    <div className="flex flex-col h-full px-3 pt-2 pb-3 gap-2">
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="flex-1 h-7 rounded-full bg-foreground/6 border border-foreground/8" />
        <div className="w-7 h-7 rounded-full" style={{ background: theme.from + "30" }} />
      </div>
      {/* Featured banner */}
      <div className="rounded-2xl overflow-hidden flex-shrink-0 h-20 flex items-end p-2.5" style={{ background: `linear-gradient(160deg, ${theme.from}, ${theme.to})` }}>
        <div className="space-y-1">
          <div className="w-20 h-2 rounded-full bg-white/60" />
          <div className="w-14 h-1.5 rounded-full bg-white/35" />
        </div>
      </div>
      {/* Label */}
      <div className="w-16 h-2 rounded-full bg-foreground/10" />
      {/* 2×2 grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {[theme.from + "50", theme.to + "40", "#F59E0B40", "#8B5CF640"].map((bg, i) => (
          <div key={i} className="rounded-xl h-14 flex items-end p-2" style={{ background: bg }}>
            <div className="w-12 h-1.5 rounded-full bg-foreground/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AccessUI({ theme }: { theme: { from: string; to: string } }) {
  return (
    <div className="flex flex-col h-full px-3 pt-2 pb-3 gap-3">
      <div className="flex items-center justify-between">
        <div className="w-16 h-2.5 rounded-full bg-foreground/10" />
        <div className="w-6 h-2 rounded-full bg-foreground/6" />
      </div>
      {/* Big unlock button */}
      <div className="flex justify-center py-2">
        <div className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}>
          <div className="absolute inset-2 rounded-full bg-white/10" />
          <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white/60" />
          </div>
        </div>
      </div>
      <div className="text-center space-y-1">
        <div className="w-16 h-2 rounded-full bg-foreground/10 mx-auto" />
        <div className="w-10 h-1.5 rounded-full bg-foreground/6 mx-auto" />
      </div>
      {/* Access log */}
      <div className="space-y-1.5">
        <div className="w-12 h-1.5 rounded-full bg-foreground/8" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-foreground/[0.03] border border-foreground/[0.05]">
            <div className="w-4 h-4 rounded-md flex-shrink-0" style={{ background: theme.from + "30" }} />
            <div className="flex-1 h-1.5 rounded-full bg-foreground/8" />
            <div className="w-8 h-1 rounded-full bg-foreground/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

const companyUI: Record<string, React.ComponentType<{ theme: { from: string; to: string } }>> = {
  "PassKit":            PassKitUI,
  "Self-employed":      FreelanceUI,
  "Thonburi Hospital":  HospitalUI,
  "True Digital Group": StreamingUI,
  "GTRIIP":             AccessUI,
};

function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto select-none" style={{ width: 260, height: 530 }}>
      <div className="absolute inset-[-30px] bg-primary/10 blur-[70px] rounded-full -z-10" />
      <div className="absolute inset-0 rounded-[44px] border-2 border-foreground/20 bg-foreground/5 shadow-2xl overflow-hidden">
        <div className="absolute -left-[3px] top-24 w-[3px] h-7 bg-foreground/20 rounded-l-full" />
        <div className="absolute -left-[3px] top-36 w-[3px] h-9 bg-foreground/20 rounded-l-full" />
        <div className="absolute -right-[3px] top-32 w-[3px] h-11 bg-foreground/20 rounded-r-full" />
        <div className="absolute inset-[3px] rounded-[41px] overflow-hidden bg-background">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-foreground/90 rounded-full z-20" />
          <div className="absolute inset-0 pt-10 overflow-hidden">{children}</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-foreground/25 rounded-full z-20" />
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Experience() {
  const resumeData = useResume();
  const grouped = groupByCompany(resumeData.experience);
  const [[current, direction], setPage] = useState([0, 0]);
  const reduced = useReducedMotion();

  const paginate = (dir: number) => {
    setPage(([c]) => [(c + dir + grouped.length) % grouped.length, dir]);
  };

  const group = grouped[current];
  const theme = companyThemes[group?.company] ?? fallbackTheme;
  const AppUI = companyUI[group?.company] ?? PassKitUI;
  const renderImpact = companyImpactContent[group?.company];

  const slideVariants = {
    enter: (d: number) => ({ x: reduced ? 0 : d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: reduced ? 0 : d > 0 ? -60 : 60, opacity: 0 }),
  };

  const phoneVariants = {
    enter: (d: number) => ({ x: reduced ? 0 : d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: reduced ? 0 : d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section id="experience" className="relative z-10">
      {/* Header */}
      <div className="max-w-2xl mb-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease }}
          className="section-label mb-4"
        >
          <Briefcase size={12} /> Career
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.05, ease }}
          className="font-heading text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-5"
        >
          Work Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.12, ease }}
          className="text-lg text-foreground/55 leading-relaxed"
        >
          10+ years building high-performance mobile products across three countries.
        </motion.p>
      </div>

      {/* Carousel */}
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

        {/* ── Left: info panel ── */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease }}
              className="space-y-6"
            >
              {/* Counter */}
              <p className="text-xs font-bold tracking-widest uppercase text-foreground/30">
                {String(current + 1).padStart(2, "0")} / {String(grouped.length).padStart(2, "0")}
              </p>

              {/* Company row */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-md flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                >
                  {group?.company.charAt(0)}
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {group?.company}
                </h3>
              </div>

              {/* Roles */}
              {group?.roles.map((role: any, i: number) => (
                <div key={i} className={i > 0 ? "pt-5 border-t border-foreground/[0.06]" : ""}>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground text-base">{role.title}</span>
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                      style={{ background: `linear-gradient(90deg, ${theme.from}, ${theme.to})` }}
                    >
                      {role.type || group.type}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/40 mb-3">
                    {role.period} · {group.location}
                  </p>
                  <ul className="space-y-2">
                    {role.responsibilities.map((r: string, j: number) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: theme.from }} />
                        <p className="text-sm text-foreground/60 leading-relaxed">{r}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Skills */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-foreground/30 mb-2">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group?.roles.flatMap((r: any) => r.skills)
                    .filter((s: string, i: number, arr: string[]) => arr.indexOf(s) === i)
                    .map((skill: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-foreground/[0.04] text-foreground/45 border border-foreground/[0.07]">
                        {skill}
                      </span>
                    ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right: phone mockup + nav ── */}
        <div className="flex flex-col items-center gap-4 flex-shrink-0 self-center lg:self-start lg:sticky lg:top-24">
          {/* Left/right buttons + phone */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous company"
              className="w-10 h-10 rounded-full glass border border-foreground/10 hover:border-foreground/25 hover:bg-foreground/[0.07] transition-all duration-200 flex items-center justify-center hover:-translate-x-0.5"
            >
              <ChevronLeft size={18} className="text-foreground/60" />
            </button>

            <motion.div
              layoutId="phone-mockup"
              layout
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              className="relative"
            >
              <PhoneMockup>
                <AnimatePresence custom={direction} initial={false}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={phoneVariants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.38, ease }}
                    className="absolute inset-0"
                  >
                    <AppUI theme={theme} />
                  </motion.div>
                </AnimatePresence>
              </PhoneMockup>

              {/* Floating impact card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 12, x: 12 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 8, x: 8 }}
                  transition={{ duration: 0.4, delay: 0.15, ease }}
                  className="absolute -bottom-4 -right-4 w-[172px] rounded-2xl p-3 shadow-xl border border-white/10 backdrop-blur-md"
                  style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                >
                  {renderImpact?.(theme)}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <button
              onClick={() => paginate(1)}
              aria-label="Next company"
              className="w-10 h-10 rounded-full glass border border-foreground/10 hover:border-foreground/25 hover:bg-foreground/[0.07] transition-all duration-200 flex items-center justify-center hover:translate-x-0.5"
            >
              <ChevronRight size={18} className="text-foreground/60" />
            </button>
          </div>

          {/* Horizontal dots below phone */}
          <div className="flex items-center gap-2">
            {grouped.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > current ? 1 : -1])}
                aria-label={`Go to company ${i + 1}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${i !== current ? "bg-foreground/15 w-1.5" : ""}`}
                  style={{
                    width: i === current ? 24 : undefined,
                    background: i === current
                      ? `linear-gradient(90deg, ${theme.from}, ${theme.to})`
                      : undefined,
                  }}
                />
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {/* LinkedIn */}
        <Link
          href={resumeData.personalInfo.linkedin}
          target="_blank" rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 p-6 rounded-2xl bg-foreground text-background hover:opacity-95 transition-opacity duration-200 shadow-xl"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Linkedin size={16} className="text-background/70" />
              <p className="text-xs font-bold uppercase tracking-widest text-background/50">LinkedIn</p>
            </div>
            <h3 className="font-heading text-xl font-bold tracking-tight">Full Career</h3>
            <p className="text-background/50 text-sm">10+ years of achievements, in detail.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center group-hover:bg-background/20 transition-colors shrink-0">
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>

        {/* GitHub */}
        <Link
          href={resumeData.personalInfo.github}
          target="_blank" rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 p-6 rounded-2xl glass border border-foreground/10 hover:border-foreground/20 transition-all duration-200"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Github size={16} className="text-foreground/40" />
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/35">GitHub</p>
            </div>
            <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">Open Source</h3>
            <p className="text-foreground/45 text-sm">Public projects & contributions.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors shrink-0">
            <ArrowRight size={16} className="text-foreground/60 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
