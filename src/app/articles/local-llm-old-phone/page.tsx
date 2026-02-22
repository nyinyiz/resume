"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Cpu,
  Server,
  Terminal,
  Globe,
  BarChart3,
  ArrowLeft,
  Calendar,
  Clock,
  ChevronRight,
  MessageCircle,
  ExternalLink,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Nodes inside the phone
const phoneNodes = [
  { id: "termux", label: "Termux", sub: "Linux Environment", icon: Terminal },
  { id: "llama", label: "llama-server", sub: "Qwen 2.5 1.5B Q4_K_M", icon: Cpu },
  { id: "pico", label: "PicoClaw", sub: "AI Gateway", icon: Server },
];

// Nodes outside the phone
const externalNodes = [
  { id: "telegram", label: "Telegram Bot", sub: "Cron x 4/day", icon: MessageCircle },
  { id: "dashboard", label: "Dashboard", sub: "Node.js Monitor", icon: BarChart3 },
  { id: "tunnel", label: "Cloudflare Tunnel", sub: "Public Access", icon: Globe },
];

// Tech stack badges
const techStack = [
  { name: "Termux", color: "from-green-500 to-emerald-600" },
  { name: "llama.cpp", color: "from-orange-500 to-red-500" },
  { name: "Qwen 2.5", color: "from-blue-500 to-cyan-500" },
  { name: "PicoClaw", color: "from-purple-500 to-pink-500" },
  { name: "Node.js", color: "from-green-600 to-lime-500" },
  { name: "Telegram Bot", color: "from-sky-400 to-blue-600" },
  { name: "Cron", color: "from-gray-500 to-gray-700" },
  { name: "Cloudflare", color: "from-orange-400 to-yellow-500" },
  { name: "Alpine.js", color: "from-cyan-500 to-blue-500" },
];

export default function LocalLLMArticlePage() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxSrc, closeLightbox]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxSrc}
                alt="Enlarged view"
                width={2000}
                height={2000}
                className="object-contain max-w-[90vw] max-h-[90vh] rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <article className="max-w-3xl mx-auto px-4 py-8">
        {/* Back link */}
        <motion.div {...fadeInUp} className="mb-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Feb 2025
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-4 h-4" /> 6 min read
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              Running a Local LLM on an Old Phone
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              How I turned a retired Huawei nova 7i into a full AI edge server
              — local LLM inference, API gateway, Telegram bot reports, and
              monitoring dashboard — all at zero cost.
            </p>
          </motion.div>
        </motion.header>

        {/* Body */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-12"
        >
          {/* --- Why --- */}
          <motion.section variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Reuse an Old Phone?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              Most old phones end up in a drawer or a landfill. But they&apos;re actually
              capable hardware — ARM64 CPUs, multiple cores, built-in battery
              backup, WiFi, and zero recurring cost. My Huawei nova 7i was
              collecting dust after I upgraded, so I decided to give it a second
              life as an always-on AI edge server.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              No cloud bills. No new hardware. Just a phone, a USB cable for
              power, and Termux.
            </p>
          </motion.section>

          {/* --- The Device --- */}
          <motion.section variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The Device
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              The Huawei nova 7i is a mid-range phone from 2020 with a Kirin 810
              chipset — 8 cores (2x Cortex-A76 + 6x Cortex-A55), 8 GB of RAM,
              128 GB storage, running Android 10. The ARM64 architecture means
              it can compile and run llama.cpp natively.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                {[
                  { label: "SoC", value: "Kirin 810" },
                  { label: "CPU", value: "8 Cores (2x A76 + 6x A55)" },
                  { label: "RAM", value: "8 GB" },
                  { label: "Arch", value: "ARM64 (aarch64)" },
                  { label: "OS", value: "Android 10 + EMUI" },
                  { label: "Storage", value: "128 GB" },
                ].map((spec) => (
                  <div key={spec.label}>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {spec.label}
                    </span>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* --- Architecture --- */}
          <motion.section variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Architecture
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              The full pipeline runs entirely on the phone. Termux provides a Linux
              environment, llama-server handles LLM inference, PicoClaw acts as the
              API gateway, a Telegram bot sends me reports 4 times a day via cron, a
              Node.js dashboard monitors everything, and Cloudflare Tunnel exposes
              it all to the public web.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              {/* Row 1: Phone box wrapping Termux → llama-server → PicoClaw */}
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  className="relative rounded-2xl border-2 border-dashed border-blue-400/60 dark:border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/20 p-5 sm:p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Phone label */}
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                      Old Phone
                    </span>
                    <span className="text-xs text-blue-500/70 dark:text-blue-400/60">
                      — Huawei nova 7i
                    </span>
                  </div>

                  {/* Inner nodes */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {phoneNodes.map((node, i) => (
                      <div key={node.id} className="flex items-center">
                        <motion.div
                          className="flex flex-col items-center text-center"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white dark:bg-gray-800 border-2 border-blue-300/60 dark:border-blue-500/40 flex items-center justify-center mb-2 shadow-sm">
                            <node.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                            {node.label}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                            {node.sub}
                          </span>
                        </motion.div>
                        {i < phoneNodes.length - 1 && (
                          <div className="mx-1 sm:mx-2 flex items-center">
                            <div className="w-4 sm:w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                            <ChevronRight className="w-4 h-4 text-purple-500 dark:text-purple-400 -ml-1" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Connector: vertical line down */}
              <div className="flex justify-center mb-4">
                <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
              </div>

              {/* Row 2: Telegram Bot → Dashboard → Cloudflare Tunnel */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                {externalNodes.map((node, i) => (
                  <div key={node.id} className="flex items-center">
                    <motion.div
                      className="flex flex-col items-center text-center"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i + 3) * 0.1 }}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 border-2 border-purple-400/40 dark:border-purple-500/40 flex items-center justify-center mb-2">
                        <node.icon className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        {node.label}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                        {node.sub}
                      </span>
                    </motion.div>
                    {i < externalNodes.length - 1 && (
                      <div className="mx-1 sm:mx-2 flex items-center">
                        <div className="w-4 sm:w-6 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                        <ChevronRight className="w-4 h-4 text-pink-500 dark:text-pink-400 -ml-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* --- Step by Step --- */}
          <motion.section variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How I Set It Up
            </h2>

            {/* Step 1 */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2">
              1. Install Termux
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              First, I installed{" "}
              <strong className="text-gray-900 dark:text-white">Termux</strong> from
              F-Droid (the Play Store version is outdated) along with{" "}
              <strong className="text-gray-900 dark:text-white">Termux:API</strong> for
              accessing battery and sensor data from the command line.
            </p>
            <pre className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto mb-2">
              <code className="text-sm text-green-400 font-mono">{`pkg update && pkg upgrade
pkg install termux-api`}</code>
            </pre>

            {/* Step 2 */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">
              2. Build llama.cpp & Download Model
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              llama.cpp compiles natively on ARM64. I built it from source, then
              downloaded a quantized{" "}
              <strong className="text-gray-900 dark:text-white">Qwen 2.5 1.5B (Q4_K_M)</strong>{" "}
              GGUF model — small enough to fit in memory but surprisingly capable
              for an edge device.
            </p>
            <pre className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto mb-2">
              <code className="text-sm text-green-400 font-mono">{`pkg install cmake golang git
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp && cmake -B build
cmake --build build --config Release -j4`}</code>
            </pre>

            {/* Step 3 */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">
              3. Configure PicoClaw AI Gateway
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              PicoClaw sits in front of llama-server as an API gateway — routing
              requests, managing rate limits, and providing an OpenAI-compatible
              endpoint. This is what the Telegram bot and dashboard talk to.
            </p>
            <pre className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto mb-2">
              <code className="text-sm text-green-400 font-mono">{`npm install -g picoclaw
picoclaw init --backend llama --port 3000`}</code>
            </pre>

            {/* Step 4 */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">
              4. Set Up the Telegram Bot + Cron Job
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              This is one of my favourite parts. PicoClaw connects to a Telegram bot
              (<strong className="text-gray-900 dark:text-white">NN Mobile Brain</strong>)
              that sends me AI-generated reports 4 times a day — morning briefing,
              mid-day pulse, afternoon update, and evening market wrap. Each message
              includes gold prices, news, productivity tips, task suggestions, and
              insights. A cron job in Termux triggers it every 6 hours.
            </p>
            <pre className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto mb-2">
              <code className="text-sm text-green-400 font-mono">{`pkg install cronie termux-services
sv-enable crond
crontab -e
# Run every 6 hours (4x/day)
0 */6 * * * node ~/picoclaw/telegram-report.js`}</code>
            </pre>

            {/* Telegram screenshot */}
            <figure className="my-6">
              <div
                className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm cursor-zoom-in hover:shadow-md transition-shadow"
                onClick={() => setLightboxSrc("/llm-telegram-bot.png")}
              >
                <Image
                  src="/llm-telegram-bot.png"
                  alt="Telegram bot NN Mobile Brain sending daily AI-generated reports with gold prices, news, productivity tips, and task suggestions"
                  width={800}
                  height={1200}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                The Telegram bot sends 4 reports daily — morning briefing, mid-day pulse, afternoon update, and evening wrap.
              </figcaption>
            </figure>

            {/* Step 5 */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">
              5. Build the Monitoring Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              A Node.js server running on the phone collects system metrics via
              Termux:API (CPU, RAM, battery temp/voltage, storage, uptime) and
              serves a cyberpunk-styled dashboard built with Alpine.js. It shows
              real-time stats and a terminal output log.
            </p>

            {/* Dashboard screenshot */}
            <figure className="my-6">
              <div
                className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm cursor-zoom-in hover:shadow-md transition-shadow"
                onClick={() => setLightboxSrc("/llm-dashboard.png")}
              >
                <Image
                  src="/llm-dashboard.png"
                  alt="System Monitor dashboard showing processor load, memory usage, storage capacity, battery status, and uptime running on the Huawei nova 7i"
                  width={1400}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                The live System Monitor dashboard — processor, memory, storage, battery, and uptime — all served from the phone.
              </figcaption>
            </figure>

            {/* Step 6 */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">
              6. Expose via Cloudflare Tunnel
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              The final piece: making everything publicly accessible. Cloudflare
              Tunnel creates a secure connection from the phone to the internet
              without port forwarding or a static IP. One command and it&apos;s live.
            </p>
            <pre className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto mb-2">
              <code className="text-sm text-green-400 font-mono">{`pkg install cloudflared
cloudflared tunnel --url http://localhost:3000`}</code>
            </pre>
          </motion.section>

          {/* --- Results --- */}
          <motion.section variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Results
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              The server has been running 24/7 with zero downtime. During inference,
              CPU usage sits around 35%, the model uses ~2.1 GB of RAM, and the
              battery stays at 100% (always plugged in). The Telegram bot delivers
              reports like clockwork — 4 times a day — and the dashboard is
              accessible from anywhere through the Cloudflare tunnel.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              All of this on a phone that was going to sit in a drawer forever. Zero
              cloud cost, zero new hardware — just a bit of tinkering and a good
              use case.
            </p>
          </motion.section>

          {/* --- Stack --- */}
          <motion.section variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${tech.color}`}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.section>

          {/* --- Learn More --- */}
          <motion.section variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Learn More
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Want to build something similar? Here are the resources I used.
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "PicoClaw — Lightweight AI Gateway",
                  url: "https://picoclaw.net/",
                  desc: "The API gateway that sits in front of your local LLM and provides an OpenAI-compatible endpoint.",
                },
                {
                  title: "llama.cpp — LLM Inference in C/C++",
                  url: "https://github.com/ggml-org/llama.cpp",
                  desc: "Run large language models on commodity hardware. Compiles natively on ARM64 / Android via Termux.",
                },
                {
                  title: "Telegram Bot API — Getting Started",
                  url: "https://core.telegram.org/bots/tutorial",
                  desc: "Official guide to creating Telegram bots. Use BotFather to generate a token and start sending messages.",
                },
                {
                  title: "Termux Wiki",
                  url: "https://wiki.termux.com/wiki/Main_Page",
                  desc: "Everything about running a Linux environment on Android — package management, APIs, cron jobs, and more.",
                },
                {
                  title: "Cloudflare Tunnel Docs",
                  url: "https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/",
                  desc: "Expose local services to the internet securely without port forwarding or a public IP.",
                },
                {
                  title: "Qwen 2.5 Models on Hugging Face",
                  url: "https://huggingface.co/Qwen",
                  desc: "Browse and download quantized GGUF models for local inference.",
                },
              ].map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {link.title}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.section>
        </motion.div>

        {/* Back link bottom */}
        <motion.div {...fadeInUp} className="mt-16 pb-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </motion.div>
      </article>
    </motion.div>
  );
}
