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
    cmd:     "/fitcheck",
    desc:    "Scores the fit between a JD and Nyi Nyi's profile with a detailed breakdown.",
    example: '/fitcheck "Here\'s our JD — give me an honest score."',
    pow:     "/pow1.png",
    powLabel: "JD fit score output",
  },
  {
    cmd:     "/asknyi",
    desc:    "Ask anything about skills, experience, tech stack, or professional background.",
    example: '/asknyi "Can he do React Native for a fintech startup?"',
    pow:     null,
    powLabel: null,
  },
  {
    cmd:     "/workwithnyi",
    desc:    "Returns preferred working setup, timezone, and availability.",
    example: '/workwithnyi "What\'s his availability and preferred setup?"',
    pow:     null,
    powLabel: null,
  },
  {
    cmd:     "/talkwithnyi",
    desc:    "Draft a contextual intro message or reach out with background.",
    example: '/talkwithnyi "Draft a short intro for a mobile lead role."',
    pow:     "/pow2.png",
    powLabel: "intro & availability output",
  },
] as const;

const SKILL_MD = `\
---
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
Email     nyinyizaw.dev@gmail.com
LinkedIn  linkedin.com/in/nyinyiz
Portfolio nyinyizaw.dev

# Install
npx skills add nyinyiz/resume --skill nyi-agent`;

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
      <div className="flex flex-col gap-8 p-6 md:p-8 lg:grid lg:grid-cols-2 lg:gap-10">

        {/* ── Left column: Install + SKILL.md ─────── */}
        <div className="space-y-6">

          {/* Header */}
          <div className="space-y-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: "#34d399" }}>
              agent skill · v{agentConfig.version}
            </p>
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Let your AI do the first interview.
            </h3>
            <p className="text-sm text-foreground/50 leading-relaxed">
              Install my agent skill and ask fit questions without waiting on a reply.
            </p>
          </div>

          {/* Step 1 */}
          <section className="space-y-2">
            <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-foreground/30">
              1 — install skill
            </p>
            <TerminalBlock copyKey="install" copiedKey={copiedKey} onCopy={() => copy(INSTALL_CMD, "install")}>
              <span style={{ color: "#34d399" }}>$</span>{" "}
              <span style={{ color: "#34d399" }}>npx skills add</span>{" "}
              <span style={{ color: "#60a5fa" }}>nyinyiz/resume</span>{" "}
              <span style={{ color: "#a78bfa" }}>--skill</span>{" "}
              <span style={{ color: "#fb923c" }}>nyi-agent</span>
            </TerminalBlock>
          </section>

          {/* Step 2 */}
          <section className="space-y-2">
            <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-foreground/30">
              2 — enable slash commands{" "}
              <span className="normal-case text-foreground/20">(Claude Code only)</span>
            </p>
            <TerminalBlock copyKey="cmds" copiedKey={copiedKey} onCopy={() => copy(COMMANDS_CMD, "cmds")}>
              <span className="text-foreground/55 break-all">
                mkdir -p{" "}
                <span style={{ color: "#fb923c" }}>~/.claude/commands</span>
                {" "}&amp;&amp; cp .agents/skills/nyi-agent/commands/*.md{" "}
                <span style={{ color: "#fb923c" }}>~/.claude/commands/</span>
              </span>
            </TerminalBlock>
          </section>

          {/* Compatibility */}
          <section className="rounded-xl border border-foreground/[0.07] bg-foreground/[0.02] p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-foreground/25">
                compatibility
              </span>
              <span className="font-mono text-[9px] text-foreground/20">skill-context: ✓</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Claude Code", "Codex", "Cursor", "Gemini CLI", "+ 20 more"].map((a) => (
                <span
                  key={a}
                  className="rounded border border-foreground/[0.07] bg-foreground/[0.03] px-2 py-0.5 font-mono text-[9px] text-foreground/40"
                >
                  {a}
                </span>
              ))}
            </div>
            <p className="font-mono text-[9px] text-foreground/25 leading-relaxed">
              Skill context works in all agents above.{" "}
              <span style={{ color: "#fb923c" }}>/slash commands: Claude Code only</span>
              {" "}— other agents use natural language.
            </p>
          </section>

          {/* SKILL.md preview */}
          <section>
            <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-widest text-foreground/30">
              skill.md preview
            </p>
            <div
              className="overflow-hidden rounded-xl border"
              style={{ background: "hsl(222 14% 9%)", borderColor: "rgba(255,255,255,0.07)" }}
            >
              {/* Editor chrome */}
              <div
                className="flex items-center justify-between border-b px-4 py-2"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <span className="font-mono text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                  nyi-agent / SKILL.md
                </span>
                <a
                  href="https://github.com/nyinyiz/resume/tree/main/nyi-agent"
                  target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[9px] transition-colors duration-150 hover:opacity-70"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  open on GitHub ↗
                </a>
              </div>
              <div className="max-h-[260px] overflow-y-auto p-4">
                <pre
                  className="whitespace-pre-wrap font-mono text-[10.5px] leading-[1.75]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {SKILL_MD}
                </pre>
              </div>
            </div>
          </section>
        </div>

        {/* ── Right column: Commands ───────────────── */}
        <div className="space-y-4">
          <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-foreground/30">
            commands ·{" "}
            <span style={{ color: "#34d399" }}>{COMMANDS.length}</span> available
          </p>

          {COMMANDS.map(({ cmd, desc, example, pow, powLabel }) => {
            const isCopied = copiedKey === cmd;
            return (
              <div
                key={cmd}
                className="overflow-hidden rounded-xl border border-foreground/[0.07] bg-foreground/[0.02]"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-foreground/[0.06] px-3 py-2">
                  <span className="font-mono text-[11px] font-semibold" style={{ color: "#a78bfa" }}>
                    {cmd}
                  </span>
                  <button
                    onClick={() => copy(example, cmd)}
                    className="flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[9px] text-foreground/30 hover:text-foreground/60 transition-colors"
                  >
                    {isCopied
                      ? <><Check size={9} strokeWidth={2.5} />copied</>
                      : <><Copy size={9} strokeWidth={1.8} />example</>}
                  </button>
                </div>

                <div className="px-3 pt-2.5 pb-3 space-y-2">
                  <p className="text-[11px] leading-relaxed text-foreground/50">{desc}</p>
                  <div className="rounded-lg border border-foreground/[0.05] bg-foreground/[0.03] px-2.5 py-2 font-mono text-[10px] text-foreground/35 break-all">
                    {example}
                  </div>

                  {/* Proof screenshot */}
                  {pow && (
                    <motion.button
                      onClick={() => setPowImg(pow)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="group relative w-full overflow-hidden rounded-lg border border-foreground/[0.07] focus:outline-none"
                      style={{ aspectRatio: "16 / 7" }}
                    >
                      <Image
                        src={pow}
                        alt={`${cmd} example output`}
                        fill
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                      <span className="absolute bottom-2 left-2.5 font-mono text-[9px] text-white/50">
                        {powLabel}
                      </span>
                    </motion.button>
                  )}
                </div>
              </div>
            );
          })}

          <p className="font-mono text-[9px] text-foreground/20 leading-relaxed italic pt-1">
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

/* ─── TerminalBlock ──────────────────────────────────── */

function TerminalBlock({
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
    <div className="overflow-hidden rounded-xl border border-foreground/[0.07] bg-foreground/[0.02]">
      <div className="flex items-center justify-between border-b border-foreground/[0.06] px-3 py-1.5">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-400/40" />
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[9px] text-foreground/30 hover:text-foreground/60 transition-colors"
        >
          {isCopied
            ? <><Check size={9} strokeWidth={2.5} />copied</>
            : <><Copy size={9} strokeWidth={1.8} />copy</>}
        </button>
      </div>
      <div className="px-4 py-3 font-mono text-[11px]">
        {children}
      </div>
    </div>
  );
}
