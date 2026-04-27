"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  HelpCircle,
  Check,
  Copy,
  LinkedinIcon,
  Mail,
  Search,
  TerminalSquare,
  UserRound,
  X,
} from "lucide-react";
import { analyzeJD, detectGibberish, type MatchResult } from "@/features/hire/lib/jdMatcher";
import { agentConfig } from "@/features/hire/lib/agentConfig";

const CLI_CMD = `npx skills add nyinyiz/resume --skill nyi-agent && mkdir -p ~/.claude/commands && cp .agents/skills/nyi-agent/commands/*.md ~/.claude/commands/`;
const ease = [0.22, 1, 0.36, 1];

/* ─── CountUp ──────────────────────────────────────── */

function scoreAccent(s: number) {
  if (s >= 75) return "#34d399";
  if (s >= 50) return "#fb923c";
  return "#f87171";
}

function resultLabel(score: number) {
  if (score >= 85) return "Strong mobile fit";
  if (score >= 65) return "Worth a serious conversation";
  if (score >= 40) return "Possible stretch role";
  return "Probably not the right lane";
}

function resultSummary(result: MatchResult) {
  const topMatches = result.perfectMatch.slice(0, 3).map((item) => item.display);
  const risks = [
    ...result.outOfScope.slice(0, 2).map((item) => item.display),
    ...result.canLearn.slice(0, Math.max(0, 2 - result.outOfScope.length)).map((item) => item.display),
  ];

  if (result.score >= 75) {
    return `Strong fit for ${topMatches.join(", ") || "the core role"}. Best next step: send the role over and talk through team context.`;
  }

  if (result.score >= 50) {
    return `Good overlap, especially around ${topMatches.join(", ") || "mobile/product work"}. Main risk: ${risks.join(", ") || "scope clarity"}.`;
  }

  return `Low-confidence match. Useful overlap: ${topMatches.join(", ") || "limited"}. Watch-outs: ${risks.join(", ") || "requirements may sit outside my lane"}.`;
}

function buildFitSummary(result: MatchResult) {
  const strong = result.perfectMatch.slice(0, 5).map((item) => item.display).join(", ") || "None detected";
  const adjacent = result.canDo.slice(0, 4).map((item) => item.display).join(", ") || "None detected";
  const risks = [...result.canLearn, ...result.outOfScope].slice(0, 4).map((item) => item.display).join(", ") || "No major risks detected";

  return [
    `Nyi Nyi Zaw fit score: ${result.score}/100`,
    `Verdict: ${resultLabel(result.score)}`,
    `Strong matches: ${strong}`,
    `Adjacent strengths: ${adjacent}`,
    `Risks or stretch areas: ${risks}`,
    `Contact: nyinyizaw.dev@gmail.com`,
  ].join("\n");
}

/* ─── RecruiterPanel ───────────────────────────────── */
function RecruiterPanel() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const hasText = jd.trim().length >= 10;

  const run = () => {
    setError(null); setResult(null);
    const rej = detectGibberish(jd);
    if (rej) { setError(rej); return; }
    setLoading(true);
    setTimeout(() => { setResult(analyzeJD(jd)); setLoading(false); }, 420);
  };

  const reset = () => {
    setJd(""); setResult(null); setError(null);
    ref.current?.focus();
  };

  const edit = () => {
    setResult(null); setError(null);
    setTimeout(() => ref.current?.focus(), 50);
  };

  const copySummary = (match: MatchResult) => {
    navigator.clipboard.writeText(buildFitSummary(match)).then(() => {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 1800);
    });
  };

  const hint = jd.length === 0 ? "Longer JD = sharper match"
    : jd.length < 100 ? "Keep going…"
    : "Looking good — hit Check fit";

  const SUGGESTIONS = [
    { label: "iOS Lead", text: "Looking for a Senior iOS Engineer with 5+ years experience in Swift and SwiftUI. Must have shipped apps to the App Store, strong knowledge of UIKit, CoreData, and CI/CD pipelines. Remote-friendly, startup pace." },
    { label: "Mobile Architect", text: "Seeking a Lead Mobile Architect to own the end-to-end mobile strategy across iOS and Android. Experience with React Native, native modules, and cross-platform architecture required. 8+ years preferred." },
    { label: "Fractional CTO", text: "Early-stage startup looking for a Fractional CTO with mobile-first product experience. Must be comfortable with technical strategy, hiring, and hands-on engineering. Part-time, equity-based role." },
    { label: "React Native", text: "We need a React Native developer with deep experience in Expo, TypeScript, and native module integration. Familiarity with Firebase, REST APIs, and app performance optimisation is a must." },
  ];

  return (
    <div className="flex h-full flex-col border-b border-foreground/[0.07] bg-white/70 dark:bg-background/40 lg:border-b-0 lg:border-r">
      {/* Strip header */}
      <div className="flex items-center gap-3 border-b border-foreground/[0.07] px-5 py-4 sm:px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
          style={{ background: "#60a5fa18" }}>
          <UserRound size={15} style={{ color: "#2563eb" }} />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#2563eb" }}>
            Recruiter View
          </span>
          <p className="mt-0.5 text-xs text-foreground/40">Paste a real JD and get a direct signal.</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" className="flex min-h-[430px] flex-1 flex-col items-center justify-center gap-5 py-10"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease }}>

              {/* Pulsing ring */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute h-16 w-16 rounded-full"
                  style={{ border: "1.5px solid #60a5fa" }}
                  animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute h-10 w-10 rounded-full"
                  style={{ border: "1.5px solid #60a5fa55" }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 1.6, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
                />
                <Search size={18} style={{ color: "#60a5fa" }} strokeWidth={1.8} />
              </div>

              {/* Log lines */}
              <div className="w-full max-w-xs space-y-1.5 font-mono text-[11px]">
                {[
                  { text: "Parsing the buzzwords…",                    color: "#60a5fa", delay: 0 },
                  { text: "Cross-referencing 10 years of shipped code…", color: "#a78bfa", delay: 0.18 },
                  { text: "Running the numbers. Bear with me.",           color: "#34d399", delay: 0.36 },
                ].map(({ text, color, delay }) => (
                  <motion.p key={text}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay, ease }}
                    style={{ color }}>
                    <span className="text-foreground/25 mr-1">›</span>{text}
                  </motion.p>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-xs overflow-hidden rounded-full bg-foreground/[0.06] h-1">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "#60a5fa" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.38, ease: "easeInOut" }}
                />
              </div>

            </motion.div>
          ) : !result ? (
            <motion.div key="input" className="flex min-h-[430px] flex-1 flex-col gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>

              <div className="space-y-2">
                <p className="font-heading text-2xl font-bold tracking-tight text-foreground leading-tight sm:text-3xl">
                  Fit check before the first call.
                </p>
                <p className="max-w-xl text-sm text-foreground/52 leading-relaxed">
                  Drop in the job description. I&apos;ll split the requirements into strong matches, adjacent strengths, learn-fast areas, and honest no-go zones.
                </p>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/35 self-center mr-0.5">
                  Samples
                </span>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => { setJd(s.text); setError(null); ref.current?.focus(); }}
                    className="rounded-full border border-foreground/[0.1] bg-white/75 px-3 py-1.5
                      text-[10px] font-semibold text-foreground/55 shadow-sm shadow-black/[0.02] transition-all duration-200
                      hover:border-primary/25 hover:bg-primary/[0.04] hover:text-foreground/80
                      dark:bg-foreground/[0.04]
                      active:scale-95"
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-foreground/[0.1]
                bg-white shadow-[0_18px_50px_-35px_rgba(15,23,42,0.45)] transition-all duration-300
                focus-within:border-primary/45 focus-within:shadow-[0_24px_60px_-36px_rgba(37,99,235,0.45)]
                dark:bg-foreground/[0.04]">
                <textarea
                  ref={ref}
                  value={jd}
                  onChange={(e) => { setJd(e.target.value); setError(null); }}
                  placeholder="e.g. Looking for a Senior Engineer with React, Node, and AWS. Remote-first, 5+ years, startup mindset required."
                  className="flex-1 w-full resize-none bg-transparent px-4 pt-4 pb-3 text-sm leading-relaxed
                    text-foreground/80 placeholder:text-foreground/25 focus:outline-none min-h-[230px]"
                  rows={7}
                />
                <div className="flex items-center justify-between border-t border-foreground/[0.07] bg-foreground/[0.015] px-4 py-3">
                  <span className="text-[10px] text-foreground/40">{hint}</span>
                  <span className="font-mono text-[10px] text-foreground/25">{jd.length}c</span>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-2 overflow-hidden rounded-xl bg-amber-500/[0.08] px-3 py-2 text-xs
                      text-amber-200/80 ring-1 ring-amber-500/[0.15]">
                    <AlertTriangle size={13} className="mt-0.5 shrink-0 text-amber-400/70" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-end gap-3 pt-0.5">
                <motion.button
                  onClick={run}
                  disabled={!hasText || loading}
                  whileHover={hasText ? { scale: 1.03 } : {}}
                  whileTap={hasText ? { scale: 0.96 } : {}}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold
                    transition-all duration-300 shrink-0 ${
                    hasText
                      ? "bg-foreground text-background shadow-lg shadow-black/10 hover:opacity-90"
                      : "bg-foreground/[0.05] text-foreground/20 cursor-not-allowed"
                  }`}
                >
                  <Search size={13} strokeWidth={1.8} />
                  Check fit
                </motion.button>
              </div>

              <p className="text-center text-[10px] text-foreground/35">
                Rather just talk?{" "}
                <a href="https://www.linkedin.com/in/nyinyiz/" target="_blank" rel="noopener noreferrer"
                  className="text-foreground/45 underline underline-offset-2 hover:text-foreground/70 transition-colors duration-200">
                  LinkedIn
                </a>
                {" "}·{" "}
                <a href="mailto:nyinyizaw.dev@gmail.com"
                  className="text-foreground/45 underline underline-offset-2 hover:text-foreground/70 transition-colors duration-200">
                  Email
                </a>
              </p>
            </motion.div>
          ) : (
            <motion.div key="result" className="flex min-h-[430px] flex-1 flex-col gap-4"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}>

              {/* Score headline */}
              <div className="flex items-start justify-between gap-4 rounded-2xl border border-foreground/[0.08] bg-white p-4 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.5)] dark:bg-foreground/[0.04]">
                <div>
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-foreground/35">
                    Fit verdict
                  </p>
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                    {resultLabel(result.score)}
                  </h3>
                  <p className="mt-1 max-w-md text-xs text-foreground/48">
                    {resultSummary(result)}
                  </p>
                </div>
                <div className="relative shrink-0">
                  <svg width="72" height="72" viewBox="0 0 72 72" aria-label={`Fit score: ${Math.max(0, result.score)} out of 100`} role="img">
                    <circle cx="36" cy="36" r="28" fill="none" stroke="hsl(var(--foreground)/0.07)" strokeWidth="5" />
                    <motion.circle
                      cx="36" cy="36" r="28" fill="none"
                      stroke={scoreAccent(result.score)} strokeWidth="5" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - Math.max(0, result.score) / 100) }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      transform="rotate(-90 36 36)"
                    />
                    <text x="36" y="40" textAnchor="middle"
                      style={{ fontSize: 16, fontWeight: 800, fontFamily: "ui-monospace,monospace", fill: scoreAccent(result.score) }}>
                      {Math.max(0, result.score)}
                    </text>
                  </svg>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl border border-foreground/[0.07] bg-white/70 p-3 dark:bg-foreground/[0.03]">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-foreground/30">Top matches</p>
                  <div className="mt-2 space-y-1.5">
                    {result.perfectMatch.slice(0, 3).length > 0 ? result.perfectMatch.slice(0, 3).map((item) => (
                      <div key={item.display} className="flex items-center gap-2 text-xs font-semibold text-foreground/65">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#34d399" }} />
                        {item.display}
                      </div>
                    )) : (
                      <p className="text-xs text-foreground/35">No clear hard-skill hits yet.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-foreground/[0.07] bg-white/70 p-3 dark:bg-foreground/[0.03]">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-foreground/30">Watch-outs</p>
                  <div className="mt-2 space-y-1.5">
                    {[...result.outOfScope, ...result.canLearn].slice(0, 3).length > 0 ? [...result.outOfScope, ...result.canLearn].slice(0, 3).map((item) => (
                      <div key={item.display} className="flex items-center gap-2 text-xs font-semibold text-foreground/65">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: result.outOfScope.includes(item) ? "#f87171" : "#fb923c" }} />
                        {item.display}
                      </div>
                    )) : (
                      <p className="text-xs text-foreground/35">Nothing scary in the detected keywords.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Three sections */}
              <div className="flex flex-1 flex-col gap-2 overflow-auto">

                {/* Perfect match */}
                <div className="rounded-xl border border-foreground/[0.07] bg-white/75 p-3 shadow-sm shadow-black/[0.02] dark:bg-foreground/[0.03]">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#34d399" }} />
                    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#34d399cc" }}>
                      Perfect match
                    </span>
                    <span className="ml-auto font-mono text-[9px] text-foreground/25">
                      {result.perfectMatch.length} hit{result.perfectMatch.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {result.perfectMatch.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {result.perfectMatch.map((i) => (
                        <span key={i.display}
                          className="rounded-md px-2 py-0.5 text-[10px] font-semibold border"
                          style={{ background: "#34d39910", color: "#34d399cc", borderColor: "#34d39925" }}>
                          {i.display}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-foreground/25 italic">Your JD is a mystery. Add more tech keywords and try again.</p>
                  )}
                </div>

                {/* Can do / needs work */}
                <div className="rounded-xl border border-foreground/[0.07] bg-white/75 p-3 shadow-sm shadow-black/[0.02] dark:bg-foreground/[0.03]">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#60a5fa" }} />
                    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#60a5facc" }}>
                      Adjacent — won&apos;t embarrass you
                    </span>
                    <span className="ml-auto font-mono text-[9px] text-foreground/25">
                      {result.canDo.length} hit{result.canDo.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {result.canDo.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {result.canDo.map((i) => (
                        <span key={i.display}
                          className="rounded-md px-2 py-0.5 text-[10px] font-semibold border"
                          style={{ background: "#60a5fa10", color: "#60a5facc", borderColor: "#60a5fa25" }}>
                          {i.display}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-foreground/25 italic">All in scope. Smooth sailing.</p>
                  )}
                </div>

                {/* Will learn */}
                {result.canLearn.length > 0 && (
                  <div className="rounded-xl border border-foreground/[0.07] bg-white/75 p-3 shadow-sm shadow-black/[0.02] dark:bg-foreground/[0.03]">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#fb923c" }} />
                      <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#fb923ccc" }}>
                        Will learn. Fast. Promise.
                      </span>
                      <span className="ml-auto font-mono text-[9px] text-foreground/25">
                        {result.canLearn.length} item{result.canLearn.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.canLearn.map((i) => (
                        <span key={i.display}
                          className="rounded-md px-2 py-0.5 text-[10px] font-semibold border"
                          style={{ background: "#fb923c10", color: "#fb923ccc", borderColor: "#fb923c25" }}>
                          {i.display}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Out of scope */}
                {result.outOfScope.length > 0 && (
                  <div className="rounded-xl border border-foreground/[0.07] bg-white/75 p-3 shadow-sm shadow-black/[0.02] dark:bg-foreground/[0.03]">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#f87171" }} />
                      <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#f87171cc" }}>
                        Outside my lane
                      </span>
                      <span className="ml-auto font-mono text-[9px] text-foreground/25">
                        {result.outOfScope.length} flagged
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.outOfScope.map((i) => (
                        <span key={i.display}
                          className="rounded-md px-2 py-0.5 text-[10px] font-semibold border"
                          style={{ background: "#f8717110", color: "#f87171cc", borderColor: "#f8717125" }}>
                          {i.display}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-[10px] text-foreground/30 leading-relaxed">
                      These showed up in your JD. Honest answer — not my thing. Worth a conversation if they&apos;re non-negotiable.
                    </p>
                  </div>
                )}

              </div>

              {/* Contact strip */}
              <div className="mt-auto space-y-2 border-t border-foreground/[0.06] pt-3">
                <p className="text-[10px] text-foreground/35">
                  Numbers don&apos;t lie. But I&apos;m better in person.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex gap-1.5 shrink-0">
                    <button onClick={edit}
                      className="glass rounded-full border border-foreground/10 px-3 py-1.5 text-[12px]
                        font-medium text-foreground/50 hover:border-foreground/20 hover:text-foreground/70
                        transition-all duration-200">
                      Edit JD
                    </button>
                    <button onClick={reset}
                      className="glass rounded-full border border-foreground/10 px-2.5 py-1.5 text-[12px]
                        font-medium text-foreground/30 hover:border-foreground/20 hover:text-foreground/55
                        transition-all duration-200">
                      New
                    </button>
                  </div>
                  <button onClick={() => copySummary(result)}
                    className="glass flex min-w-[132px] flex-1 items-center justify-center gap-1.5 rounded-full border
                      border-foreground/10 py-1.5 text-[12px] font-semibold text-foreground/60
                      hover:border-foreground/20 hover:text-foreground/80 transition-all duration-200">
                    {copiedSummary ? <Check size={12} strokeWidth={2.2} /> : <Copy size={12} strokeWidth={1.8} />}
                    {copiedSummary ? "Copied" : "Copy summary"}
                  </button>
                  <a href="https://www.linkedin.com/in/nyinyiz/" target="_blank" rel="noopener noreferrer"
                    className="glass flex min-w-[112px] flex-1 items-center justify-center gap-1.5 rounded-full border
                      border-foreground/10 py-1.5 text-[12px] font-semibold text-foreground/60
                      hover:border-foreground/20 hover:text-foreground/80 transition-all duration-200">
                    <LinkedinIcon size={12} strokeWidth={1.8} />
                    LinkedIn
                  </a>
                  <motion.a
                    href="mailto:nyinyizaw.dev@gmail.com?subject=Role%20Fit%20Discussion"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex min-w-[112px] flex-1 items-center justify-center gap-1.5 rounded-full
                      bg-foreground py-1.5 px-3.5 text-[12px] font-semibold text-background shadow-lg
                      hover:opacity-90 transition-opacity duration-200">
                    <Mail size={12} strokeWidth={1.8} />
                    Email me
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── SkillPanel ───────────────────────────────────── */
function SkillPanel() {
  const [copied, setCopied] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [powImg, setPowImg] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CLI_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const copyCmd = (cmd: string) => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopiedCmd(cmd);
      setTimeout(() => setCopiedCmd(null), 1800);
    });
  };

  const USAGE = [
    { cmd: "/asknyi",       prompt: "Can he do React Native for a fintech startup?"  },
    { cmd: "/workwithnyi",  prompt: "What's his availability and preferred setup?"   },
    { cmd: "/fitcheck",     prompt: "Here's our JD — give me an honest score."       },
  ];

  return (
    <>
      <div className="flex h-full flex-col bg-background/55">
        {/* Strip header */}
        <div className="flex items-center gap-3 border-b border-foreground/[0.07] px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
            style={{ background: "#34d39918" }}>
            <TerminalSquare size={15} style={{ color: "#059669" }} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#059669" }}>
              Agent Skill
            </span>
            <p className="mt-0.5 text-xs text-foreground/40">Install my work profile into your AI tool.</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden rounded-full border border-foreground/[0.08] bg-white/70
              px-2 py-0.5 text-[9px] font-semibold text-foreground/35 shadow-sm shadow-black/[0.02] dark:bg-foreground/[0.04] sm:inline-flex">
              sentient: no
            </span>
            <span className="font-mono text-[9px] text-foreground/20">
              v{agentConfig.version}
            </span>
            <div className="relative">
              <motion.button
                onClick={() => setShowWarning(v => !v)}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center rounded-md p-1 transition-colors"
                style={{ color: "rgba(251,146,60,0.5)" }}>
                <HelpCircle size={13} strokeWidth={2} />
              </motion.button>
              <AnimatePresence>
                {showWarning && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowWarning(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-8 z-20 w-80 rounded-xl border p-4 shadow-xl"
                      style={{
                        background: "hsl(220 13% 10%)",
                        borderColor: "rgba(251,146,60,0.25)",
                        minWidth: "320px",
                      }}>
                      <p className="mb-1 text-[9px] font-bold uppercase tracking-widest" style={{ color: "#fb923c" }}>
                        heads up
                      </p>
                      <p className="text-[12px] leading-relaxed text-foreground/60">
                        Don&apos;t take this too seriously. It&apos;s a fun idea — a different personality tuned for different workspaces. The real me is still better with coffee.
                      </p>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-5">

          {/* Headline */}
          <div className="space-y-2">
            <p className="font-heading text-2xl font-bold tracking-tight text-foreground leading-tight">
              Prefer agent-to-agent?
            </p>
            <p className="text-sm text-foreground/50 leading-relaxed">
              Give your assistant my profile, ask it fit questions, then reach out when the signal is clear.
            </p>
          </div>

          {/* Disclaimer callout */}
          <div className="rounded-2xl px-4 py-3.5"
            style={{ background: "rgba(251,146,60,0.07)", border: "1px solid rgba(251,146,60,0.22)" }}>
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest" style={{ color: "#fb923c" }}>
              {"// disclaimer"}
            </p>
            <p className="text-[13px] font-semibold leading-relaxed" style={{ color: "rgba(251,146,60,0.9)" }}>
              {agentConfig._disclaimer}
            </p>
          </div>

          {/* CLI block */}
          <div className="overflow-hidden rounded-2xl border border-foreground/[0.07] bg-white shadow-[0_18px_45px_-36px_rgba(15,23,42,0.45)] dark:bg-foreground/[0.02]">
            {/* Chrome bar */}
            <div className="flex items-center justify-between border-b border-foreground/[0.07] bg-foreground/[0.02] px-4 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(255,96,96,0.5)" }} />
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(255,190,60,0.5)" }} />
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(60,210,100,0.5)" }} />
                <span className="ml-3 text-[9px] font-bold uppercase tracking-widest text-foreground/20">
                  terminal
                </span>
              </div>
              <motion.button
                onClick={copy}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}
                className="flex items-center gap-1.5 rounded-md border border-foreground/[0.08]
                  bg-white/70 px-2 py-1 text-[10px] font-semibold text-foreground/45 shadow-sm shadow-black/[0.02]
                  hover:border-foreground/[0.15] hover:text-foreground/70 transition-all duration-200">
                {copied
                  ? <><Check size={10} strokeWidth={2.5} />Copied</>
                  : <><Copy size={10} strokeWidth={1.8} />Copy</>}
              </motion.button>
            </div>

            {/* Step 1 — install skill */}
            <div className="px-4 pt-3 pb-2 font-mono text-[11px]">
              <p className="text-foreground/25 mb-1.5">
                <span style={{ color: "#34d399" }}>$</span>{" "}
                <span className="text-foreground/30"># 1. install the skill</span>
              </p>
              <p className="break-all">
                <span style={{ color: "#34d399" }}>npx skills add</span>{" "}
                <span style={{ color: "#60a5fa" }}>nyinyiz/resume</span>{" "}
                <span style={{ color: "#a78bfa" }}>--skill</span>{" "}
                <span style={{ color: "#fb923c" }}>nyi-agent</span>
              </p>
            </div>

            {/* Divider */}
            <div className="mx-4 border-t border-foreground/[0.06]" />

            {/* Step 2 — enable commands */}
            <div className="px-4 pt-2 pb-2 font-mono text-[11px]">
              <p className="text-foreground/25 mb-1.5">
                <span style={{ color: "#34d399" }}>$</span>{" "}
                <span className="text-foreground/30"># 2. enable slash commands</span>
              </p>
              <p className="break-all text-foreground/60">
                mkdir -p ~/.claude/commands &&{" "}
                cp .agents/skills/nyi-agent/commands/*.md{" "}
                <span style={{ color: "#fb923c" }}>~/.claude/commands/</span>
              </p>
            </div>

            {/* Divider */}
            <div className="mx-4 border-t border-foreground/[0.06]" />

            {/* Step 3 — usage commands */}
            <div className="px-4 pt-2 pb-3 font-mono text-[11px]">
              <p className="text-foreground/25 mb-2">
                <span style={{ color: "#34d399" }}>$</span>{" "}
                <span className="text-foreground/30"># 3. then use it like this</span>
              </p>
              <div className="space-y-0.5">
                {USAGE.map(({ cmd, prompt }) => {
                  const full = `${cmd} "${prompt}"`;
                  const isCopied = copiedCmd === full;
                  return (
                    <motion.button
                      key={cmd}
                      onClick={() => copyCmd(full)}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.15 }}
                      className="group flex w-full items-baseline gap-3 rounded-md px-2 py-1
                        text-left transition-colors duration-150 hover:bg-foreground/[0.04]">
                      <span className="shrink-0 w-28" style={{ color: isCopied ? "#34d399" : "#a78bfa" }}>
                        {isCopied ? "copied" : cmd}
                      </span>
                      <span className="truncate text-foreground/25 group-hover:text-foreground/40
                        transition-colors duration-150">
                        &quot;{prompt}&quot;
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* What to expect */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/25">
                proof examples
              </span>
              <button
                onClick={() => setShowExamples((value) => !value)}
                className="rounded-full border border-foreground/[0.08] px-2.5 py-1 text-[10px] font-semibold text-foreground/45 transition-colors hover:border-foreground/[0.16] hover:text-foreground/70"
              >
                {showExamples ? "Hide" : "Show"}
              </button>
            </div>
            <AnimatePresence initial={false}>
              {showExamples && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {[
                      { src: "/pow1.png", cmd: "/fitcheck", desc: "JD fit score" },
                      { src: "/pow2.png", cmd: "/talkwithnyi", desc: "intro & availability" },
                    ].map(({ src, cmd, desc }) => (
                      <motion.button
                        key={src}
                        onClick={() => setPowImg(src)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="group relative overflow-hidden rounded-xl border border-foreground/[0.07]
                          bg-white/70 text-left focus:outline-none dark:bg-foreground/[0.02]">
                        <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
                          <Image
                            src={src}
                            alt={`${cmd} example`}
                            fill
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                        <div className="px-2.5 py-2">
                          <span className="block font-mono text-[10px] font-semibold" style={{ color: "#7c3aed" }}>{cmd}</span>
                          <span className="block text-[9px] text-foreground/35 leading-tight">{desc}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Supported agents */}
          <div className="space-y-1.5 rounded-2xl border border-foreground/[0.07] bg-white/55 p-3 dark:bg-foreground/[0.02]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/25">
                works in
              </span>
              <span className="font-mono text-[9px] text-foreground/25">context: yes</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Claude Code", "Codex", "Cursor", "Gemini CLI", "+ 20 more"].map((agent) => (
                <span key={agent}
                  className="rounded-md border border-foreground/[0.07] bg-foreground/[0.03]
                    px-2 py-0.5 text-[10px] font-medium text-foreground/40">
                  {agent}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-foreground/25 leading-relaxed pt-0.5">
              Skill context works in all agents above.{" "}
              <span style={{ color: "#fb923c" }} className="font-medium">/slash commands only work in Claude Code</span>
              {" "}— other agents just use natural language.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <a
              href="https://github.com/nyinyiz/resume/tree/main/nyi-agent"
              target="_blank" rel="noopener noreferrer"
              className="glass flex-1 rounded-full border border-foreground/10 py-2 text-center
                text-[12px] font-medium text-foreground/60 hover:border-foreground/20
                hover:text-foreground/80 transition-all duration-200">
              View on GitHub
            </a>
            <button onClick={() => setShowModal(true)}
              className="glass flex-1 rounded-full border border-foreground/10 py-2 text-[12px]
                font-medium text-foreground/60 hover:border-foreground/20 hover:text-foreground/80
                transition-all duration-200">
              Preview SKILL.md
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal — portaled to body to escape overflow:hidden */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)" }}
            onClick={() => setShowModal(false)}>
            <motion.div
              initial={{ scale: 0.95, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 12, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col w-full max-w-2xl rounded-2xl border border-white/[0.08] overflow-hidden"
              style={{ background: "hsl(220 13% 10%)", maxHeight: "85dvh" }}>
              {/* Header — fixed */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold text-white/50">nyi-agent/SKILL.md</span>
                  <span className="rounded-full border border-white/[0.1] bg-white/[0.05] px-2 py-0.5
                    text-[9px] font-semibold text-white/35">
                    vibe check passed
                  </span>
                </div>
                <motion.button onClick={() => setShowModal(false)}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="rounded-full p-1.5 hover:bg-white/[0.07] transition-colors">
                  <X size={14} className="text-white/40" />
                </motion.button>
              </div>
              {/* SKILL.md body — scrolls */}
              <div className="flex-1 overflow-y-auto p-5 overscroll-contain">
                <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white/55">
{`---
name: nyi-agent
description: Know everything about Nyi Nyi Zaw — Lead Mobile Engineer.
  Use when evaluating fit, answering questions about skills/experience,
  or drafting outreach. Triggers on "is Nyi Nyi a good fit", "can he do X".
---

# Nyi Nyi Zaw — Agent Skill

10+ years building mobile apps people actually use. Android-first,
equally at home on iOS and cross-platform.

## Perfect Fit
Kotlin · Java · Android SDK · Jetpack Compose · iOS · Swift · SwiftUI
Flutter/Dart · React Native · TypeScript · Next.js · Spring Boot

## Adjacent
React · Node.js · Technical leadership · Cross-functional teams

## Contact
Email   nyinyizaw.dev@gmail.com
LinkedIn  linkedin.com/in/nyinyiz
Portfolio nyinyizaw.dev

# Install
npx skills add nyinyiz/resume --skill nyi-agent`}
                </pre>
              </div>
              {/* Footer — fixed */}
              <div className="shrink-0 border-t border-white/[0.07] px-5 py-3 flex items-center justify-between">
                <p className="text-[10px] text-white/25 italic">
                  {agentConfig._meta.built_with} · last updated {agentConfig._meta.last_updated}
                </p>
                <a
                  href="https://github.com/nyinyiz/resume/tree/main/nyi-agent"
                  target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-white/35 hover:text-white/60 transition-colors duration-200 underline underline-offset-2">
                  Full SKILL.md on GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* POW Lightbox */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {powImg && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(0,0,0,0.85)" }}
              onClick={() => setPowImg(null)}>
              <motion.div
                initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.93, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08]">
                <Image
                  src={powImg}
                  alt="Proof of work"
                  width={1200}
                  height={800}
                  className="w-full h-auto block"
                  style={{ maxHeight: "85dvh", objectFit: "contain" }}
                />
                <motion.button
                  onClick={() => setPowImg(null)}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="absolute top-3 right-3 rounded-full p-1.5 bg-black/50
                    border border-white/[0.1] hover:bg-black/70 transition-colors">
                  <X size={14} className="text-white/60" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

/* ─── Root ─────────────────────────────────────────── */
export default function HireMe() {
  return (
    <section className="relative z-10">
      {/* Header */}
      <div className="mb-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            className="section-label mb-3">
            <UserRound size={12} /> Hire
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl md:leading-[0.98]">
            Paste the JD. Get the honest fit check.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-4 max-w-2xl text-base text-foreground/55 leading-relaxed">
            A faster hiring lane for mobile, product, and AI-adjacent teams. Use the checker yourself, or install my agent profile and let your tools ask the first questions.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.34, ease }}
          className="grid grid-cols-3 overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white/70 shadow-sm shadow-black/[0.03] dark:bg-foreground/[0.03]">
          {[
            { value: "10+", label: "years" },
            { value: "15+", label: "apps" },
            { value: "3", label: "countries" },
          ].map((item, index) => (
            <div key={item.label} className={index > 0 ? "border-l border-foreground/[0.07] p-4" : "p-4"}>
              <p className="font-mono text-2xl font-bold text-foreground">{item.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-foreground/35">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.35, ease }}
        className="overflow-hidden rounded-[1.75rem] border border-foreground/[0.08] bg-background/70 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.55)] backdrop-blur-sm">

        {/* Top strip with staggered tags */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55, ease }}
          className="flex flex-wrap items-center gap-3 border-b border-foreground/[0.07] bg-white/55 px-5 py-3.5 dark:bg-foreground/[0.02]">
          <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/30 shrink-0">
            Hiring Mode
          </span>
          {["Reads real JDs", "Robot-friendly", "No awkward calls"].map((tag, i) => (
            <motion.span key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.6 + i * 0.07, ease }}
              className="px-2.5 py-1 rounded-md bg-primary/[0.07] text-primary text-[10px]
                font-semibold border border-primary/[0.16]">
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Two columns — slide in from opposite sides */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)]">
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.5, ease }}>
            <RecruiterPanel />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.58, ease }}>
            <SkillPanel />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
