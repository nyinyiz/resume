"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy, Check, Download, Search,
  ChevronRight, X, ExternalLink, AlertTriangle,
  ArrowUpRight, Cpu, Layers, Zap, BookOpen, Ban, Mail,
} from "lucide-react";
import { analyzeJD, detectGibberish, type MatchResult } from "@/lib/jd-matcher";

const ease = [0.22, 1, 0.36, 1] as const;
const CLI_CMD = `npx create-agent --config https://nyinyizaw.vercel.app/nyi-agent.json`;

// ─── Count-up ─────────────────────────────────────────────────────────────────
function CountUp({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 30);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setDisplay(target); clearInterval(id); }
      else setDisplay(start);
    }, 20);
    return () => clearInterval(id);
  }, [target]);
  return <>{display}</>;
}

// ─── Score ring ───────────────────────────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const color = score >= 70 ? "#16a34a" : score >= 40 ? "#2563eb" : "#ea580c";
  return (
    <div className="relative w-24 h-24 shrink-0">
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#e4e4e7" strokeWidth="4" />
        <motion.circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (score / 100) * circ }}
          transition={{ duration: 1.4, ease }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <span className="text-2xl font-bold tabular-nums text-zinc-900 leading-none font-heading">
          <CountUp target={score} />
        </span>
        <span className="text-[9px] text-zinc-400 font-medium">/ 100</span>
      </div>
    </div>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "perfectMatch" as const, label: "Perfect Match",  icon: Layers,   color: "#16a34a" },
  { key: "canDo"        as const, label: "Can Do",         icon: Zap,      color: "#2563eb" },
  { key: "canLearn"     as const, label: "Can Learn",      icon: BookOpen, color: "#ea580c" },
  { key: "outOfScope"   as const, label: "Out of Scope",   icon: Ban,      color: "#94a3b8" },
] as const;

// ─── AI Skill Card ────────────────────────────────────────────────────────────
function AISkillCard() {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CLI_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease }}
        className="flex flex-col gap-3 h-full"
      >
        {/* Section label */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
            I know you don't want to hire a real human. This is for you.
          </p>
        </div>

        {/* Terminal card */}
        <div className="rounded-2xl border border-zinc-200 bg-zinc-950 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-auto font-mono text-[10px] text-zinc-500 tracking-wider">nyi-agent.json</span>
          </div>

          <div className="p-4 font-mono space-y-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-[11px] text-emerald-400">online · bothering no prod servers</span>
            </div>

            <div className="text-[11px] leading-relaxed space-y-0.5">
              <p className="text-zinc-500">{"{"}</p>
              <p className="pl-3"><span className="text-sky-400">"role"</span><span className="text-zinc-500">: </span><span className="text-amber-300">"Lead Mobile Engineer"</span><span className="text-zinc-500">,</span></p>
              <p className="pl-3"><span className="text-sky-400">"exp"</span><span className="text-zinc-500">: </span><span className="text-amber-300">"10+ years"</span><span className="text-zinc-500">,</span></p>
              <p className="pl-3"><span className="text-sky-400">"stack"</span><span className="text-zinc-500">: [</span><span className="text-emerald-400">"Kotlin"</span><span className="text-zinc-500">, </span><span className="text-emerald-400">"Swift"</span><span className="text-zinc-500">, </span><span className="text-emerald-400">"..."</span><span className="text-zinc-500">]</span></p>
              <p className="text-zinc-500">{"}"}</p>
            </div>

            <div className="group flex items-center gap-2 p-2.5 rounded-lg bg-zinc-800 border border-zinc-700">
              <span className="text-blue-400 text-xs shrink-0">$</span>
              <span className="flex-1 text-[11px] text-zinc-300 truncate">{CLI_CMD.slice(4)}</span>
              <button onClick={copy} className="shrink-0 p-1 rounded-md hover:bg-zinc-700 transition-colors" aria-label="Copy">
                <AnimatePresence mode="wait">
                  {copied
                    ? <motion.div key="y" initial={{ scale: 0.5 }} animate={{ scale: 1 }}><Check size={11} className="text-emerald-400" /></motion.div>
                    : <motion.div key="n" initial={{ scale: 0.5 }} animate={{ scale: 1 }}><Copy size={11} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" /></motion.div>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <a
          href="/nyi-agent.json"
          download="nyi-agent.json"
          className="group flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300 transition-all duration-200"
        >
          <div className="flex items-center gap-2.5">
            <Download size={13} className="text-zinc-500 group-hover:text-zinc-800 transition-colors" />
            <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">Download agent config</span>
          </div>
          <ArrowUpRight size={13} className="text-zinc-400 group-hover:text-blue-600 transition-colors" />
        </a>

        <button
          onClick={() => setShowModal(true)}
          className="group flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200"
        >
          <div className="flex items-center gap-2.5">
            <Cpu size={13} className="text-zinc-400 group-hover:text-zinc-700 transition-colors" />
            <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">Preview agent schema</span>
          </div>
          <ChevronRight size={13} className="text-zinc-300 group-hover:text-zinc-500 transition-colors" />
        </button>

        {/* Contact */}
        <a
          href="mailto:nyinyizaw.dev@gmail.com"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 transition-all duration-200"
        >
          <Mail size={13} className="text-zinc-400 group-hover:text-zinc-700 transition-colors shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors">Already convinced? Skip the algorithm.</p>
            <p className="text-[11px] text-zinc-400 truncate">nyinyizaw.dev@gmail.com</p>
          </div>
          <ExternalLink size={11} className="text-zinc-300 group-hover:text-blue-500 transition-colors shrink-0" />
        </a>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                <p className="text-sm font-semibold text-zinc-900 font-heading">Agent Config</p>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-md hover:bg-zinc-100 transition-colors">
                  <X size={14} className="text-zinc-400" />
                </button>
              </div>
              <div className="p-5 max-h-[55vh] overflow-y-auto bg-zinc-950">
                <pre className="text-[11px] text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap">
{`{
  "name": "Nyi Nyi Zaw — AI Skill Agent",
  "persona": {
    "role": "Lead Mobile Engineer",
    "tone": "Direct, pragmatic, witty"
  },
  "knowledge": {
    "languages": ["Kotlin", "Swift", "Dart", ...],
    "frameworks": ["Android SDK", "Flutter", ...],
    "architecture": ["Clean Architecture", "MVVM", ...]
  },
  "constraints": [
    "Only discuss verified experience.",
    "Redirect out-of-scope queries honestly."
  ],
  "contact": {
    "email": "nyinyizaw.dev@gmail.com"
  }
}`}
                </pre>
              </div>
              <div className="px-5 py-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[10px] text-zinc-400">Full spec at /nyi-agent.json</span>
                <a href="/nyi-agent.json" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-blue-600 hover:underline">
                  Open raw <ExternalLink size={9} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── JD Matcher ───────────────────────────────────────────────────────────────
function JDMatcher() {
  const [jd, setJd]           = useState("");
  const [result, setResult]   = useState<MatchResult | null>(null);
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const analyze = () => {
    setError(null); setResult(null);
    const rejection = detectGibberish(jd);
    if (rejection) { setError(rejection); return; }
    setLoading(true);
    setTimeout(() => { setResult(analyzeJD(jd)); setLoading(false); }, 500);
  };

  const reset = () => {
    setJd(""); setResult(null); setError(null);
    textRef.current?.focus();
  };

  const totalMatches = result
    ? result.perfectMatch.length + result.canDo.length + result.canLearn.length : 0;
  const maxCount = result
    ? Math.max(...CATEGORIES.map(c => result[c.key].length), 1) : 1;
  const hasText = jd.trim().length >= 10;

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease }}>
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div key="input" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-3">

            {/* Textarea */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 focus-within:border-zinc-400 focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.06)] transition-all duration-200 bg-white">
              <textarea
                ref={textRef}
                value={jd}
                onChange={(e) => { setJd(e.target.value); setError(null); }}
                placeholder="Paste the full JD here. Yes, even the part that says 'rockstar ninja 10x engineer'. I've seen worse and I'm still here."
                rows={11}
                className="w-full resize-none px-5 pt-4 pb-10 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none leading-relaxed"
              />
              {/* Textarea footer bar */}
              <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 py-2.5 bg-zinc-50 border-t border-zinc-100">
                <span className="text-[10px] text-zinc-400 font-medium">
                  {jd.length === 0
                    ? "Longer JD = sharper match"
                    : jd.length < 100
                    ? "Keep going, more context helps..."
                    : "Looking good — hit analyse when ready"}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono tabular-nums">{jd.length} chars</span>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700 leading-relaxed"
                >
                  <AlertTriangle size={13} className="shrink-0 mt-0.5 text-amber-500" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analyse button */}
            <motion.button
              onClick={analyze}
              disabled={!hasText || loading}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                hasText
                  ? "bg-zinc-900 text-white hover:bg-zinc-700 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.25)]"
                  : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  Running analysis…
                </>
              ) : (
                <><Search size={14} /> Analyse fit</>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="space-y-5">

            {/* Score */}
            <div className="flex items-center gap-5 p-5 rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white">
              <ScoreRing score={result.score} />
              <div className="flex-1 min-w-0">
                <p className="font-heading text-xl font-bold text-zinc-900 tracking-tight leading-tight">
                  {result.score >= 70 ? "You should just hire me." : result.score >= 40 ? "I'd nail most of this." : "We'd have to get creative."}
                </p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {totalMatches} skill{totalMatches !== 1 ? "s" : ""} mapped
                  {result.outOfScope.length > 0 && ` · ${result.outOfScope.length} outside scope`}
                </p>
                <button onClick={reset} className="mt-2.5 text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                  Not your job? Try another one <ChevronRight size={10} />
                </button>
              </div>
            </div>

            {/* Bars */}
            <div className="space-y-4">
              {CATEGORIES.map(({ key, label, icon: Icon, color }, i) => {
                const items = result[key];
                if (items.length === 0) return null;
                const pct = Math.round((items.length / maxCount) * 100);
                return (
                  <motion.div key={key} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon size={11} style={{ color }} className="shrink-0" />
                      <span className="text-[11px] font-bold text-zinc-700 tracking-wide">{label}</span>
                      <span className="ml-auto text-[10px] font-mono text-zinc-400 tabular-nums">{items.length}</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-zinc-100 mb-2.5 overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ background: color }}
                        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <div key={item.display} className="relative group/pill">
                          <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white border border-zinc-200 text-zinc-700 cursor-default select-none transition-colors duration-150 hover:border-zinc-400 hover:text-zinc-900">
                            {item.display}
                          </span>
                          {item.reason && (
                            <div className="absolute bottom-full left-0 mb-2 w-52 px-3 py-2.5 rounded-xl bg-zinc-900 shadow-xl text-[10px] text-zinc-200 leading-relaxed opacity-0 group-hover/pill:opacity-100 pointer-events-none transition-opacity duration-150 z-20">
                              {item.reason}
                              <div className="absolute -bottom-1 left-3 w-2 h-2 bg-zinc-900 rotate-45" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Stats strip ──────────────────────────────────────────────────────────────
const STATS = [
  { value: "10+", label: "years, zero burnout (yet)" },
  { value: "3",   label: "countries, no excuses" },
  { value: "15+", label: "apps not deleted" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HireMe() {
  return (
    <section className="w-full">

      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="mb-8"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">
          Open to new roles
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] text-zinc-900 mb-4">
          Let's see if we're a fit.
        </h1>
        <p className="text-sm text-zinc-500 leading-relaxed mb-6 max-w-lg">
          Paste a JD below. You'll know if I'm your person before your coffee gets cold.
        </p>

        {/* Stats strip — inline below headline */}
        <div className="inline-flex items-center gap-0 rounded-2xl border border-zinc-200 bg-zinc-50 overflow-hidden">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease }}
              className={`flex items-baseline gap-2 px-5 py-3 ${i < STATS.length - 1 ? "border-r border-zinc-200" : ""}`}
            >
              <span className="font-heading text-xl font-bold text-zinc-900 tabular-nums leading-none">{s.value}</span>
              <span className="text-[11px] text-zinc-500 font-medium">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="w-full h-px bg-zinc-200 mb-8" />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-10">
        {/* Left: JD Matcher */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
              Don't want to talk? Don't want to text? No worries — just drop your JD here.
            </p>
          </div>
          <JDMatcher />
        </div>

        {/* Right: AI Agent */}
        <AISkillCard />
      </div>

    </section>
  );
}
