"use client";

import { useState } from "react";
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

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-foreground/[0.06]">

        {/* ── Left: Installation ───────────────────── */}
        <div className="p-6 md:p-8 space-y-8">
          <h3 className="text-xl font-bold tracking-tight text-foreground">Installation</h3>

          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <StepBadge n={1} />
              <div>
                <p className="text-sm font-semibold text-foreground">Install Skill</p>
                <p className="mt-0.5 text-xs text-foreground/45 leading-relaxed">
                  Run the following command to add the resume agent to your local environment.
                </p>
              </div>
            </div>
            <DarkTerminal copyKey="install" copiedKey={copiedKey} onCopy={() => copy(INSTALL_CMD, "install")}>
              <span className="text-emerald-400">$</span>{" "}
              <span className="text-emerald-400">npx skills add</span>{" "}
              <span className="text-sky-400">nyinyiz/resume</span>{" "}
              <span className="text-violet-400">--skill</span>{" "}
              <span className="text-orange-400">nyi-agent</span>
            </DarkTerminal>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <StepBadge n={2} />
              <div>
                <p className="text-sm font-semibold text-foreground">Enable Slash Commands</p>
                <p className="mt-0.5 text-xs text-foreground/45 leading-relaxed">
                  Point your agent to the profile directory to register new command definitions.
                </p>
              </div>
            </div>
            <DarkTerminal copyKey="cmds" copiedKey={copiedKey} onCopy={() => copy(COMMANDS_CMD, "cmds")}>
              <span className="text-white/35 text-[10px]"># Register local skill definitions</span>
              <br />
              <span className="text-emerald-400">skill config</span>
              <span className="text-white/55"> --path </span>
              <span className="text-orange-400">~/.skills/nyinyiz/resume</span>
            </DarkTerminal>
          </div>

          {/* Supported agents */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full"
                style={{ background: "rgba(52,211,153,0.15)" }}>
                <Check size={10} strokeWidth={3} style={{ color: "#34d399" }} />
              </div>
              <p className="text-sm font-semibold text-foreground">Supported AI Interfaces</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Claude Code", "Codex", "Cursor", "Gemini CLI", "GitHub Copilot"].map((a) => (
                <span key={a}
                  className="rounded-full border border-foreground/[0.08] bg-foreground/[0.03] px-3 py-1 text-[12px] text-foreground/60">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* SKILL.MD Preview */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/50">
              SKILL.MD Preview
            </p>
            <div
              className="overflow-hidden rounded-2xl border"
              style={{ background: "hsl(222 20% 8%)", borderColor: "rgba(255,255,255,0.07)" }}
            >
              {/* Editor chrome */}
              <div
                className="flex items-center justify-between border-b px-4 py-2.5"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-red-500/40" />
                    <span className="h-2 w-2 rounded-full bg-yellow-500/40" />
                    <span className="h-2 w-2 rounded-full bg-green-500/40" />
                  </div>
                  <span className="font-mono text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    SKILL.MD PREVIEW
                  </span>
                </div>
                <a
                  href="https://github.com/nyinyiz/resume/tree/main/nyi-agent"
                  target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[10px] transition-opacity hover:opacity-70"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  GitHub ↗
                </a>
              </div>
              {/* Sections */}
              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                {SKILL_SECTIONS.map(({ heading, body }) => (
                  <div key={heading} className="px-4 py-3.5">
                    <p className="font-mono text-[12px] font-semibold mb-1.5" style={{ color: "#34d399" }}>
                      # {heading}
                    </p>
                    <p className="font-mono text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Slash Commands ────────────────── */}
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">Slash Commands</h3>
            <p className="mt-1 text-[12px] text-foreground/50">Available directives for the agent</p>
          </div>

          <div className="space-y-4">
            {COMMANDS.map((item) => {
              const isCopied = copiedKey === item.cmd;
              return (
                <div
                  key={item.cmd}
                  className="overflow-hidden rounded-2xl border border-foreground/[0.07] bg-foreground/[0.015]"
                >
                  {/* Command header */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="font-mono text-[14px] font-semibold" style={{ color: "#a78bfa" }}>
                      {item.cmd}
                    </span>
                    <button
                      onClick={() => copy(item.example, item.cmd)}
                      className="rounded-lg border border-foreground/[0.07] bg-foreground/[0.03] p-1.5 text-foreground/40
                        hover:border-foreground/20 hover:text-foreground/70 transition-all duration-150"
                    >
                      {isCopied
                        ? <Check size={12} strokeWidth={2.5} />
                        : <Copy size={12} strokeWidth={1.8} />}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="px-4 pb-3 text-[12px] text-foreground/60 leading-relaxed">{item.desc}</p>

                  {/* Visual — proof screenshot or terminal simulation */}
                  {item.pow ? (
                    <motion.button
                      onClick={() => setPowImg(item.pow!)}
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                      transition={{ duration: 0.15 }}
                      className="group relative block w-full overflow-hidden focus:outline-none"
                      style={{ aspectRatio: "16 / 9" }}
                    >
                      <Image
                        src={item.pow}
                        alt={`${item.cmd} output example`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </motion.button>
                  ) : (
                    "terminal" in item && item.terminal && (
                      <div
                        className="mx-4 mb-4 overflow-hidden rounded-xl border p-4"
                        style={{ background: "hsl(222 20% 8%)", borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        {item.terminal.map((line, i) => (
                          <p
                            key={i}
                            className="font-mono text-[11px] leading-[1.7]"
                            style={{
                              color: i === 0
                                ? "#a78bfa"
                                : line === ""
                                  ? "transparent"
                                  : "rgba(255,255,255,0.55)",
                            }}
                          >
                            {line || "\u00a0"}
                          </p>
                        ))}
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-foreground/35 leading-relaxed italic">
            {agentConfig._disclaimer}
          </p>
        </div>
      </div>

      {/* ── POW Lightbox ──────────────────────────── */}
      {typeof document !== "undefined" && createPortal(
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
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold mt-0.5"
      style={{ background: "rgba(52,211,153,0.15)", color: "#34d399" }}
    >
      {n}
    </div>
  );
}

function DarkTerminal({
  children,
  copyKey,
  copiedKey,
  onCopy,
}: {
  children: React.ReactNode;
  copyKey: string;
  copiedKey: string | null;
  onCopy: () => void;
}) {
  const isCopied = copiedKey === copyKey;
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ background: "hsl(222 20% 8%)", borderColor: "rgba(255,255,255,0.07)" }}
    >
      {/* Chrome */}
      <div
        className="flex items-center justify-between border-b px-4 py-2"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500/40" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/40" />
          <span className="h-2 w-2 rounded-full bg-green-500/40" />
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1 font-mono text-[9px] transition-colors duration-150"
          style={{ color: isCopied ? "#34d399" : "rgba(255,255,255,0.25)" }}
        >
          {isCopied
            ? <><Check size={9} strokeWidth={2.5} />copied</>
            : <><Copy size={9} strokeWidth={1.8} />copy</>}
        </button>
      </div>
      {/* Content */}
      <div className="px-5 py-4 font-mono text-[12px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
