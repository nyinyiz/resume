"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
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

const CLI_CMD = `npx create-agent --config https://nyinyizaw.vercel.app/nyi-agent.json`;
const ease = [0.22, 1, 0.36, 1];

/* ─── CountUp ──────────────────────────────────────── */

function fitText(s: number) {
  if (s >= 75) return "Not gonna lie — this looks good.";
  if (s >= 50) return "Workable. I've shipped with less.";
  return "We'd need coffee, optimism, and a miracle.";
}

function scoreAccent(s: number) {
  if (s >= 75) return "#34d399";
  if (s >= 50) return "#fb923c";
  return "#f87171";
}

/* ─── RecruiterPanel ───────────────────────────────── */
function RecruiterPanel() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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

  const hint = jd.length === 0 ? "Longer JD = sharper match"
    : jd.length < 100 ? "Keep going…"
    : "Looking good — hit analyse";

  const SUGGESTIONS = [
    { label: "iOS Lead", text: "Looking for a Senior iOS Engineer with 5+ years experience in Swift and SwiftUI. Must have shipped apps to the App Store, strong knowledge of UIKit, CoreData, and CI/CD pipelines. Remote-friendly, startup pace." },
    { label: "Mobile Architect", text: "Seeking a Lead Mobile Architect to own the end-to-end mobile strategy across iOS and Android. Experience with React Native, native modules, and cross-platform architecture required. 8+ years preferred." },
    { label: "Fractional CTO", text: "Early-stage startup looking for a Fractional CTO with mobile-first product experience. Must be comfortable with technical strategy, hiring, and hands-on engineering. Part-time, equity-based role." },
    { label: "React Native", text: "We need a React Native developer with deep experience in Expo, TypeScript, and native module integration. Familiarity with Firebase, REST APIs, and app performance optimisation is a must." },
  ];

  return (
    <div className="flex flex-col border-r border-foreground/[0.07]">
      {/* Strip header */}
      <div className="flex items-center gap-3 border-b border-foreground/[0.07] px-5 py-3.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-md shrink-0"
          style={{ background: "#60a5fa18" }}>
          <UserRound size={12} style={{ color: "#60a5fa" }} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#60a5facc" }}>
          Recruiter View
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="input" className="flex flex-1 flex-col gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>

              <div className="space-y-1">
                <p className="font-heading text-xl font-bold tracking-tight text-foreground leading-snug">
                  Don&apos;t want to talk?{" "}
                  <span className="text-foreground/35">Don&apos;t want to text?</span>
                </p>
                <p className="font-heading text-xl font-bold tracking-tight text-foreground">
                  No worries.
                </p>
                <p className="text-[11px] text-foreground/40 leading-relaxed pt-0.5">
                  Drop the JD here — plain English works.
                </p>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/25 self-center mr-0.5">
                  Try
                </span>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => { setJd(s.text); setError(null); ref.current?.focus(); }}
                    className="rounded-full border border-foreground/[0.1] bg-foreground/[0.04] px-2.5 py-1
                      text-[10px] font-semibold text-foreground/50 transition-all duration-200
                      hover:border-foreground/[0.2] hover:bg-foreground/[0.08] hover:text-foreground/80
                      active:scale-95"
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-foreground/[0.1]
                focus-within:border-primary/40 transition-all duration-300 bg-foreground/[0.04]">
                <textarea
                  ref={ref}
                  value={jd}
                  onChange={(e) => { setJd(e.target.value); setError(null); }}
                  placeholder="e.g. Looking for a Senior Engineer with React, Node, and AWS. Remote-first, 5+ years, startup mindset required."
                  className="flex-1 w-full resize-none bg-transparent px-4 pt-4 pb-3 text-sm leading-relaxed
                    text-foreground/80 placeholder:text-foreground/25 focus:outline-none min-h-[160px]"
                  rows={7}
                />
                <div className="flex items-center justify-between border-t border-foreground/[0.07] px-4 py-3">
                  <span className="text-[10px] text-foreground/40">{hint}</span>
                  <span className="font-mono text-[10px] text-foreground/25">{jd.length}c</span>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-2 overflow-hidden rounded-xl bg-amber-500/[0.08] px-3 py-2 text-xs
                      text-amber-200/80 ring-1 ring-amber-500/[0.15]">
                    <AlertTriangle size={13} className="mt-0.5 shrink-0 text-amber-400/70" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between gap-3 pt-0.5">
                <div className="flex gap-1.5 flex-wrap">
                  {["Tone: technical", "Urgency: high"].map((t) => (
                    <span key={t}
                      className="rounded-md bg-foreground/[0.04] px-2.5 py-1 text-[9px] font-bold
                        uppercase tracking-widest text-foreground/30 border border-foreground/[0.07]">
                      {t}
                    </span>
                  ))}
                </div>
                <motion.button
                  onClick={run}
                  disabled={!hasText || loading}
                  whileHover={hasText ? { scale: 1.03 } : {}}
                  whileTap={hasText ? { scale: 0.96 } : {}}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold
                    transition-all duration-300 shrink-0 ${
                    hasText
                      ? "bg-foreground text-background shadow-lg hover:opacity-90"
                      : "bg-foreground/[0.05] text-foreground/20 cursor-not-allowed"
                  }`}
                >
                  <Search size={13} strokeWidth={1.8} />
                  {loading ? "Checking…" : "Check fit"}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" className="flex flex-1 flex-col gap-3"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}>

              {/* Score headline */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                    {fitText(result.score)}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-foreground/40">
                    Here&apos;s the honest verdict.
                  </p>
                </div>
                <div className="relative shrink-0">
                  <svg width="52" height="52" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="20" fill="none" stroke="hsl(var(--foreground)/0.07)" strokeWidth="3.5" />
                    <motion.circle
                      cx="26" cy="26" r="20" fill="none"
                      stroke={scoreAccent(result.score)} strokeWidth="3.5" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - result.score / 100) }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      transform="rotate(-90 26 26)"
                    />
                    <text x="26" y="30" textAnchor="middle"
                      style={{ fontSize: 11, fontWeight: 700, fontFamily: "ui-monospace,monospace", fill: scoreAccent(result.score) }}>
                      {result.score}
                    </text>
                  </svg>
                </div>
              </div>

              {/* Three sections */}
              <div className="flex flex-1 flex-col gap-2 overflow-auto">

                {/* Perfect match */}
                <div className="rounded-xl border border-foreground/[0.07] bg-foreground/[0.03] p-3">
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
                <div className="rounded-xl border border-foreground/[0.07] bg-foreground/[0.03] p-3">
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
                  <div className="rounded-xl border border-foreground/[0.07] bg-foreground/[0.03] p-3">
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

              </div>

              {/* Contact strip */}
              <div className="mt-auto space-y-2 border-t border-foreground/[0.06] pt-3">
                <p className="text-[10px] text-foreground/35">
                  Still on the fence? That&apos;s what I&apos;m here for.
                </p>
                <div className="flex gap-2">
                  <button onClick={reset}
                    className="glass rounded-full border border-foreground/10 px-3 py-1.5 text-[12px]
                      font-medium text-foreground/50 hover:border-foreground/20 hover:text-foreground/70
                      transition-all duration-200 shrink-0">
                    Try another
                  </button>
                  <a href="https://www.linkedin.com/in/nyinyiz/" target="_blank" rel="noopener noreferrer"
                    className="glass flex flex-1 items-center justify-center gap-1.5 rounded-full border
                      border-foreground/10 py-1.5 text-[12px] font-semibold text-foreground/60
                      hover:border-foreground/20 hover:text-foreground/80 transition-all duration-200">
                    <LinkedinIcon size={12} strokeWidth={1.8} />
                    LinkedIn
                  </a>
                  <motion.a
                    href="mailto:nyinyizaw.dev@gmail.com?subject=Role%20Fit%20Discussion"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full
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
  const [showModal, setShowModal] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CLI_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const capColors: Record<string, { bg: string; text: string; border: string }> = {
    languages:    { bg: "#60a5fa10", text: "#60a5facc", border: "#60a5fa25" },
    frameworks:   { bg: "#a78bfa10", text: "#a78bfacc", border: "#a78bfa25" },
    architecture: { bg: "#fb923c10", text: "#fb923ccc", border: "#fb923c25" },
    tools:        { bg: "#34d39910", text: "#34d399cc", border: "#34d39925" },
  };

  return (
    <>
      <div className="flex flex-col">
        {/* Strip header */}
        <div className="flex items-center gap-3 border-b border-foreground/[0.07] px-5 py-3.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md shrink-0"
            style={{ background: "#34d39918" }}>
            <TerminalSquare size={12} style={{ color: "#34d399" }} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#34d399cc" }}>
            Agent Skill
          </span>
          <span className="ml-auto font-mono text-[9px] text-foreground/20">
            v{agentConfig.version}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-5">

          {/* Headline */}
          <div className="space-y-1">
            <p className="font-heading text-xl font-bold tracking-tight text-foreground leading-snug">
              I know you don&apos;t want to{" "}
              <span className="text-foreground/35">hire people.</span>
            </p>
            <p className="font-heading text-xl font-bold tracking-tight text-foreground">
              Yeah, this is for you.
            </p>
            <p className="text-[11px] text-foreground/40 leading-relaxed pt-0.5">
              Feed this to your tooling. Let the agents gossip. The human still wins.
            </p>
          </div>

          {/* Disclaimer callout */}
          <div className="rounded-xl px-4 py-3.5"
            style={{ background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.25)" }}>
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest" style={{ color: "#fb923c" }}>
              // disclaimer
            </p>
            <p className="text-[13px] font-semibold leading-relaxed" style={{ color: "rgba(251,146,60,0.9)" }}>
              {agentConfig._disclaimer}
            </p>
          </div>

          {/* Capabilities */}
          <div className="space-y-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/25">
              What this agent knows
            </span>
            {(["languages", "frameworks"] as const).map((key) => {
              const col = capColors[key];
              const items = agentConfig.capabilities[key] as readonly string[];
              return (
                <div key={key} className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest self-center mr-0.5"
                    style={{ color: col.text }}>
                    {key}
                  </span>
                  {items.map((name) => (
                    <span key={name}
                      className="rounded-md px-2 py-0.5 text-[10px] font-semibold border"
                      style={{ background: col.bg, color: col.text, borderColor: col.border }}>
                      {name}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>

          {/* CLI block */}
          <div className="overflow-hidden rounded-xl border border-foreground/[0.07] bg-foreground/[0.02]">
            {/* Chrome bar */}
            <div className="flex items-center justify-between border-b border-foreground/[0.07] bg-foreground/[0.03] px-4 py-2">
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
                  bg-foreground/[0.04] px-2 py-1 text-[10px] font-semibold text-foreground/40
                  hover:border-foreground/[0.15] hover:text-foreground/70 transition-all duration-200">
                {copied
                  ? <><Check size={10} strokeWidth={2.5} />Copied</>
                  : <><Copy size={10} strokeWidth={1.8} />Copy</>}
              </motion.button>
            </div>
            <div className="px-4 py-3 font-mono text-[11px]">
              <p className="text-foreground/25 mb-1.5">
                <span style={{ color: "#34d399" }}>$</span>{" "}
                <span className="text-foreground/30"># provision agent with Nyi Nyi&apos;s skill config</span>
              </p>
              <p className="break-all" style={{ color: "#34d399" }}>
                npx create-agent <span style={{ color: "#60a5fa" }}>--config</span>{" "}
                <span style={{ color: "#fb923c" }}>https://nyinyizaw.vercel.app/nyi-agent.json</span>
              </p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="inline-block h-3 w-0.5 animate-pulse bg-foreground/30" />
              </div>
            </div>
          </div>

          {/* Note to AI */}
          <p className="text-[10px] text-foreground/25 italic leading-relaxed">
            {agentConfig._note_to_ai_systems}
          </p>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <a href="/nyi-agent.json" download="nyi-agent.json"
              className="glass flex-1 rounded-full border border-foreground/10 py-2 text-center
                text-[12px] font-medium text-foreground/60 hover:border-foreground/20
                hover:text-foreground/80 transition-all duration-200">
              Download schema
            </a>
            <button onClick={() => setShowModal(true)}
              className="glass flex-1 rounded-full border border-foreground/10 py-2 text-[12px]
                font-medium text-foreground/60 hover:border-foreground/20 hover:text-foreground/80
                transition-all duration-200">
              Preview JSON
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
                  <span className="font-mono text-[11px] font-semibold text-white/50">nyi-agent.json</span>
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
              {/* JSON body — scrolls */}
              <div className="flex-1 overflow-y-auto p-5 overscroll-contain">
                <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white/55">
                  {JSON.stringify(agentConfig, null, 2)}
                </pre>
              </div>
              {/* Footer — fixed */}
              <div className="shrink-0 border-t border-white/[0.07] px-5 py-3">
                <p className="text-[10px] text-white/25 italic">
                  {agentConfig._meta.built_with} · last updated {agentConfig._meta.last_updated}
                </p>
              </div>
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
      <div className="max-w-2xl mb-5">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="section-label mb-2">
          <UserRound size={12} /> Hire
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          className="font-heading text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-2">
          Work With Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="text-sm text-foreground/50 leading-relaxed">
          Two ways in. Left for humans, right for robots. Either way — same answer.
        </motion.p>
      </div>

      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.35, ease }}
        className="rounded-2xl border border-foreground/[0.08] bg-background/50 backdrop-blur-sm overflow-hidden">

        {/* Top strip with staggered tags */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55, ease }}
          className="flex items-center gap-3 border-b border-foreground/[0.07] px-5 py-3.5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/30 shrink-0">
            Hiring Mode
          </span>
          {["Reads real JDs", "Robot-friendly", "No awkward calls"].map((tag, i) => (
            <motion.span key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.6 + i * 0.07, ease }}
              className="px-2.5 py-1 rounded-md bg-primary/[0.08] text-primary text-[10px]
                font-semibold border border-primary/[0.18]">
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Two columns — slide in from opposite sides */}
        <div className="grid grid-cols-1 md:grid-cols-2">
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
