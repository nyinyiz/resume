"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, X } from "lucide-react";
import { agentConfig } from "@/features/hire/lib/agentConfig";

/* ─── Constants ──────────────────────────────────────── */

const INSTALL_CMD  = `npx skills add nyinyiz/resume --skill nyi-agent`;
const COMMANDS_CMD = `mkdir -p ~/.claude/commands && cp .agents/skills/nyi-agent/commands/*.md ~/.claude/commands/`;

const COMMANDS = [
  {
    cmd:      "/fitcheck",
    desc:     "Validates candidate skills against job description keywords.",
    example:  '/fitcheck "Here\'s our JD — give me an honest score."',
    pow:      "/pow1.png",
  },
  {
    cmd:      "/asknyi",
    desc:     "Ask anything about skills, experience, or tech stack.",
    example:  '/asknyi "Can he do React Native for a fintech startup?"',
    pow:      null,
    terminal: [
      "> /asknyi \"Can he do React Native for a fintech startup?\"",
      "",
      "Short answer: yes.",
      "Nyi Nyi has shipped React Native in production",
      "alongside native Android (Kotlin) and Flutter.",
      "Fintech context: crypto wallet, payments — familiar",
      "territory. Full breakdown in his profile.",
    ],
  },
  {
    cmd:      "/workwithnyi",
    desc:     "Returns preferred setup, timezone, and availability.",
    example:  '/workwithnyi "What\'s his preferred setup?"',
    pow:      null,
    terminal: [
      "> /workwithnyi \"What's his preferred setup?\"",
      "",
      "Location: Bangkok, Thailand (ICT, UTC+7)",
      "Open to: Remote · Bangkok onsite",
      "Setup: Mac + Android Studio + Xcode",
      "Comms: async-first, ships on time.",
    ],
  },
  {
    cmd:      "/talkwithnyi",
    desc:     "Draft a contextual intro message or reach out with background.",
    example:  '/talkwithnyi "Draft a short intro for a mobile lead role."',
    pow:      "/pow2.png",
  },
] as const;

const SKILL_SECTIONS = [
  {
    heading: "Perfect Fit",
    body:    "Kotlin · Java · Android SDK · Jetpack Compose · iOS · Swift · SwiftUI · Flutter/Dart · React Native · TypeScript · Next.js · Spring Boot",
  },
  {
    heading: "Adjacent",
    body:    "React · Node.js · Technical leadership · Cross-functional teams · Fractional CTO",
  },
  {
    heading: "Contact",
    body:    "nyinyizaw.dev@gmail.com · linkedin.com/in/nyinyiz · nyinyizaw.dev",
  },
  {
    heading: "Install",
    body:    "npx skills add nyinyiz/resume --skill nyi-agent",
  },
] as const;

/* ─── Component ──────────────────────────────────────── */

export function SkillPanel() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [powImg,    setPowImg]    = useState<string | null>(null);
  const [mounted,   setMounted]   = useState(false);

  useEffect(() => setMounted(true), []);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-foreground/[0.08] bg-background/40">

        {/* ── Left: Installation Timeline ───────────────────── */}
        <div className="p-8 md:p-12 space-y-12">
          <div>
            <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Direct Installation
            </h3>
            <p className="mt-2 text-[14px] text-foreground/60 leading-relaxed">
              Add the resume intelligence to your local workspace in two steps.
            </p>
          </div>

          <div className="relative space-y-12">
            {/* Structural timeline line */}
            <div className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />

            {/* Step 1 */}
            <div className="relative pl-10 space-y-4">
              <div className="absolute left-0 top-0">
                <StepBadge n={1} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-foreground">Deploy Resume Skill</p>
                <p className="mt-1 text-[13px] text-foreground/55 leading-relaxed">
                  Fetches the latest profile manifest and registers it with your local agent.
                </p>
              </div>
              <DarkTerminal label="install" copyKey="install" copiedKey={copiedKey} onCopy={() => copy(INSTALL_CMD, "install")}>
                <span className="text-emerald-400">$</span>{" "}
                <span className="text-emerald-400">npx skills add</span>{" "}
                <span className="text-sky-400">nyinyiz/resume</span>{" "}
                <span className="text-violet-400">--skill</span>{" "}
                <span className="text-orange-400">nyi-agent</span>
              </DarkTerminal>
            </div>

            {/* Step 2 */}
            <div className="relative pl-10 space-y-4">
              <div className="absolute left-0 top-0">
                <StepBadge n={2} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-foreground">Activate Context</p>
                <p className="mt-1 text-[13px] text-foreground/55 leading-relaxed">
                  Link your agent to the local manifest to enable personality-aware responses.
                </p>
              </div>
              <DarkTerminal label="configure" copyKey="cmds" copiedKey={copiedKey} onCopy={() => copy(COMMANDS_CMD, "cmds")}>
                <span className="text-white/40 text-[11px]"># Register slash commands with your agent</span>
                <br />
                <span className="text-emerald-400">mkdir -p</span>
                <span className="text-white/70"> ~/.claude/commands </span>
                <span className="text-white/40">&amp;&amp;</span>
                <span className="text-emerald-400"> cp</span>
                <span className="text-white/70"> .agents/skills/nyi-agent/commands/*.md ~/.claude/commands/</span>
              </DarkTerminal>
            </div>
          </div>

          {/* Supported interfaces with better badge design */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                <Check size={11} strokeWidth={3} className="text-emerald-500" />
              </div>
              <p className="text-[13px] font-semibold text-foreground/70">Works with your tools</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {["Claude Code", "Cursor", "Windsurf", "Codex", "Gemini CLI", "Copilot"].map((a) => (
                <span key={a}
                  className="rounded-lg border border-foreground/[0.06] bg-foreground/[0.02] px-3.5 py-1.5 text-[12px] font-medium text-foreground/60 transition-colors hover:border-foreground/20 hover:text-foreground">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* SKILL.MD Preview Redesign */}
          <div className="space-y-4 pt-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/40">
              Agent Manifest (SKILL.MD)
            </p>
            <div
              className="overflow-hidden rounded-2xl border shadow-xl"
              style={{ background: "hsl(var(--terminal-bg))", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="flex items-center justify-between border-b px-5 py-3"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/30">
                  Manifest Preview
                </span>
                <a
                  href="https://github.com/nyinyiz/resume/tree/main/nyi-agent"
                  target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[10px] text-white/20 hover:text-white/50 transition-colors"
                >
                  SOURCE ↗
                </a>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {SKILL_SECTIONS.map(({ heading, body }) => (
                  <div key={heading} className="px-6 py-4">
                    <p className="font-mono text-[12px] font-bold text-emerald-500/90 mb-2">
                      # {heading}
                    </p>
                    <p className="font-mono text-[12px] leading-relaxed text-white/50">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Command Registry ────────────────── */}
        <div className="p-8 md:p-12 space-y-10">
          <div>
            <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Command Registry
            </h3>
            <p className="mt-2 text-[14px] text-foreground/60 leading-relaxed">
              Native directives available to your agent post-installation.
            </p>
          </div>

          <div className="space-y-5">
            {COMMANDS.map((item) => {
              const isCopied = copiedKey === item.cmd;
              return (
                <div
                  key={item.cmd}
                  className="group relative overflow-hidden rounded-3xl border border-foreground/[0.06] bg-foreground/[0.015] transition-all duration-300 hover:border-emerald-500/30 hover:bg-foreground/[0.02]"
                >
                  {/* Focus line effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Command header */}
                  <div className="flex items-center justify-between px-6 pt-5 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[16px] font-bold tracking-tight text-emerald-500/90">
                        {item.cmd}
                      </span>
                    </div>
                    <button
                      onClick={() => copy(item.example, item.cmd)}
                      className="rounded-xl border border-foreground/[0.08] bg-foreground/[0.03] px-3 py-1.5 text-foreground/40
                        hover:border-emerald-500/40 hover:text-emerald-500 transition-all duration-200"
                    >
                      {isCopied
                        ? <Check size={13} strokeWidth={3} />
                        : <Copy size={13} strokeWidth={2} />}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="px-6 pb-5 text-[14px] text-foreground/60 leading-relaxed max-w-md">
                    {item.desc}
                  </p>

                  {/* Visual Proof / Terminal Simulation */}
                  {item.pow ? (
                    <div className="px-6 pb-6">
                      <motion.button
                        onClick={() => setPowImg(item.pow!)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group/pow relative block w-full overflow-hidden rounded-2xl border border-foreground/[0.06] focus:outline-none shadow-lg"
                        style={{ aspectRatio: "16 / 9" }}
                      >
                        <Image
                          src={item.pow}
                          alt={`${item.cmd} output example`}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover/pow:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 transition-opacity group-hover/pow:opacity-80" />
                        <div className="absolute bottom-4 left-5 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
                            View Console Output
                          </span>
                        </div>
                      </motion.button>
                    </div>
                  ) : (
                    "terminal" in item && item.terminal && (
                      <div className="px-6 pb-6">
                        <div
                          className="overflow-hidden rounded-2xl border p-5 shadow-inner"
                          style={{ background: "hsl(var(--terminal-bg))", borderColor: "rgba(255,255,255,0.06)" }}
                        >
                          {item.terminal.map((line, i) => (
                            <p
                              key={i}
                              className="font-mono text-[12px] leading-[1.8] tracking-tight"
                              style={{
                                color: i === 0
                                  ? "#38bdf8" // Sky for command
                                  : line === ""
                                    ? "transparent"
                                    : "rgba(255,255,255,0.6)",
                              }}
                            >
                              {line || "\u00a0"}
                            </p>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-foreground/[0.06]">
            <p className="text-[12px] text-foreground/45 leading-relaxed italic max-w-sm">
              {agentConfig._disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* ── POW Lightbox ──────────────────────────── */}
      {mounted && createPortal(
        <AnimatePresence>
          {powImg && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(0,0,0,0.85)" }}
              onClick={() => setPowImg(null)}
            >
              <motion.div
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.93, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08]"
              >
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
                  className="absolute top-3 right-3 rounded-full p-1.5 bg-black/50 border border-white/[0.1] hover:bg-black/70 transition-colors"
                >
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

/* ─── Helpers ────────────────────────────────────────── */

function StepBadge({ n }: { n: number }) {
  return (
    <div
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-bold mt-0.5 border border-emerald-500/20"
      style={{ background: "hsl(var(--agent-accent) / 0.1)", color: "hsl(var(--agent-accent))" }}
    >
      {n}
    </div>
  );
}

function DarkTerminal({
  children,
  label,
  copyKey,
  copiedKey,
  onCopy,
}: {
  children: React.ReactNode;
  label: string;
  copyKey: string;
  copiedKey: string | null;
  onCopy: () => void;
}) {
  const isCopied = copiedKey === copyKey;
  return (
    <div
      className="overflow-hidden rounded-2xl border shadow-2xl"
      style={{ background: "hsl(var(--terminal-bg))", borderColor: "rgba(255,255,255,0.08)" }}
    >
      {/* Header — typographic frame (top rule + label), not re-drawn window chrome */}
      <div
        className="flex items-center justify-between border-b px-5 py-2.5"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">
          {label}
        </span>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-200"
          style={{ color: isCopied ? "hsl(var(--agent-accent))" : "rgba(255,255,255,0.4)" }}
        >
          {isCopied
            ? <><Check size={11} strokeWidth={3} />copied</>
            : <><Copy size={11} strokeWidth={2} />copy</>}
        </button>
      </div>
      {/* Content */}
      <div className="px-6 py-5 font-mono text-[13px] leading-relaxed selection:bg-emerald-500/30">
        {children}
      </div>
    </div>
  );
}
