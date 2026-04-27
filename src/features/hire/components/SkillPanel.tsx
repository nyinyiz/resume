"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  HelpCircle,
  TerminalSquare,
  X,
} from "lucide-react";
import { agentConfig } from "@/features/hire/lib/agentConfig";

const CLI_CMD = `npx skills add nyinyiz/resume --skill nyi-agent && mkdir -p ~/.claude/commands && cp .agents/skills/nyi-agent/commands/*.md ~/.claude/commands/`;
const ease = [0.22, 1, 0.36, 1];

export function SkillPanel() {
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
