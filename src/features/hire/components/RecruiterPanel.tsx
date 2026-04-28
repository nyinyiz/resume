"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  Copy,
  LinkedinIcon,
  Mail,
  Search,
} from "lucide-react";
import { analyzeJD, detectGibberish, type MatchResult } from "@/features/hire/lib/jdMatcher";

const ease = [0.22, 1, 0.36, 1];

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

export function RecruiterPanel() {
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
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-foreground/50">
                    Fit verdict
                  </p>
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                    {resultLabel(result.score)}
                  </h3>
                  <p className="mt-1 max-w-md text-sm text-foreground/60">
                    {resultSummary(result)}
                  </p>
                </div>
                <div className="relative shrink-0">
                  <svg width="72" height="72" viewBox="0 0 72 72" aria-label={`Match score: ${Math.max(0, result.score)}% - ${resultLabel(result.score)}`} role="img">
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
                  <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/40">Top matches</p>
                  <div className="mt-2 space-y-1.5">
                    {result.perfectMatch.slice(0, 3).length > 0 ? result.perfectMatch.slice(0, 3).map((item) => (
                      <div key={item.display} className="flex items-center gap-2 text-xs font-semibold text-foreground/75">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#34d399" }} />
                        {item.display}
                      </div>
                    )) : (
                      <p className="text-xs text-foreground/40">No clear hard-skill hits yet.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-foreground/[0.07] bg-white/70 p-3 dark:bg-foreground/[0.03]">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/40">Watch-outs</p>
                  <div className="mt-2 space-y-1.5">
                    {[...result.outOfScope, ...result.canLearn].slice(0, 3).length > 0 ? [...result.outOfScope, ...result.canLearn].slice(0, 3).map((item) => (
                      <div key={item.display} className="flex items-center gap-2 text-xs font-semibold text-foreground/75">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: result.outOfScope.includes(item) ? "#f87171" : "#fb923c" }} />
                        {item.display}
                      </div>
                    )) : (
                      <p className="text-xs text-foreground/40">Nothing scary in the detected keywords.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Three sections */}
              <div className="flex flex-1 flex-col gap-2 overflow-auto">

                {/* Perfect match */}
                <div className="rounded-xl p-4" style={{ background: "#34d39912", border: "1px solid #34d39932" }}>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: "#34d399" }} />
                    <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#34d399" }}>
                      Perfect match
                    </span>
                    <span className="ml-auto font-mono text-[10px]" style={{ color: "#34d39980" }}>
                      {result.perfectMatch.length} hit{result.perfectMatch.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {result.perfectMatch.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {result.perfectMatch.map((i) => (
                        <span key={i.display}
                          className="rounded-md px-2.5 py-1 text-[11px] font-semibold border"
                          style={{ background: "#34d39918", color: "#34d399dd", borderColor: "#34d39935" }}>
                          {i.display}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-foreground/40 italic">Your JD is a mystery. Add more tech keywords and try again.</p>
                  )}
                </div>

                {/* Can do / needs work */}
                <div className="rounded-xl border border-foreground/[0.07] bg-white/75 p-3 shadow-sm shadow-black/[0.02] dark:bg-foreground/[0.03]">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#60a5fa" }} />
                    <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#60a5facc" }}>
                      Adjacent — won&apos;t embarrass you
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-foreground/40">
                      {result.canDo.length} hit{result.canDo.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {result.canDo.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {result.canDo.map((i) => (
                        <span key={i.display}
                          className="rounded-md px-2 py-0.5 text-[11px] font-semibold border"
                          style={{ background: "#60a5fa10", color: "#60a5facc", borderColor: "#60a5fa25" }}>
                          {i.display}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-foreground/40 italic">All in scope. Smooth sailing.</p>
                  )}
                </div>

                {/* Will learn */}
                {result.canLearn.length > 0 && (
                  <div className="rounded-xl border border-foreground/[0.07] bg-white/75 p-3 shadow-sm shadow-black/[0.02] dark:bg-foreground/[0.03]">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#fb923c" }} />
                      <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#fb923ccc" }}>
                        Will learn. Fast. Promise.
                      </span>
                      <span className="ml-auto font-mono text-[10px] text-foreground/40">
                        {result.canLearn.length} item{result.canLearn.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.canLearn.map((i) => (
                        <span key={i.display}
                          className="rounded-md px-2 py-0.5 text-[11px] font-semibold border"
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
                      <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#f87171cc" }}>
                        Outside my lane
                      </span>
                      <span className="ml-auto font-mono text-[10px] text-foreground/40">
                        {result.outOfScope.length} flagged
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.outOfScope.map((i) => (
                        <span key={i.display}
                          className="rounded-md px-2 py-0.5 text-[11px] font-semibold border"
                          style={{ background: "#f8717110", color: "#f87171cc", borderColor: "#f8717125" }}>
                          {i.display}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] text-foreground/45 leading-relaxed">
                      These showed up in your JD. Honest answer — not my thing. Worth a conversation if they&apos;re non-negotiable.
                    </p>
                  </div>
                )}

              </div>

              {/* Contact strip */}
              <div className="mt-auto space-y-2 border-t border-foreground/[0.06] pt-3">
                <p className="text-[11px] text-foreground/45">
                  Numbers don&apos;t lie. But I&apos;m better in person.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex gap-1.5 shrink-0">
                    <button onClick={edit}
                      className="glass rounded-full border border-foreground/10 px-3 py-1.5 text-[12px]
                        font-medium text-foreground/60 hover:border-foreground/20 hover:text-foreground/80
                        transition-all duration-200">
                      Edit JD
                    </button>
                    <button onClick={reset}
                      className="glass rounded-full border border-foreground/10 px-2.5 py-1.5 text-[12px]
                        font-medium text-foreground/40 hover:border-foreground/20 hover:text-foreground/60
                        transition-all duration-200">
                      New
                    </button>
                  </div>
                  <button onClick={() => copySummary(result)}
                    className="glass flex min-w-[132px] flex-1 items-center justify-center gap-1.5 rounded-full border
                      border-foreground/10 py-1.5 text-[12px] font-semibold text-foreground/70
                      hover:border-foreground/20 hover:text-foreground/90 transition-all duration-200">
                    {copiedSummary ? <Check size={12} strokeWidth={2.2} /> : <Copy size={12} strokeWidth={1.8} />}
                    {copiedSummary ? "Copied" : "Copy summary"}
                  </button>
                  <a href="https://www.linkedin.com/in/nyinyiz/" target="_blank" rel="noopener noreferrer"
                    className="glass flex min-w-[112px] flex-1 items-center justify-center gap-1.5 rounded-full border
                      border-foreground/10 py-1.5 text-[12px] font-semibold text-foreground/70
                      hover:border-foreground/20 hover:text-foreground/90 transition-all duration-200">
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
