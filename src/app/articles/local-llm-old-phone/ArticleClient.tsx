"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Smartphone,
  Cpu,
  Server,
  Terminal,
  Globe,
  BarChart3,
  Calendar,
  Clock,
  MessageCircle,
  X,
  Zap,
  ShieldCheck,
  RotateCcw,
  Layers,
  ArrowUpRight,
  Share2,
  Bookmark,
  Check
} from "lucide-react";
import Image from "next/image";
import Portal from "@/components/ui/Portal";

const premiumEase = [0.22, 1, 0.36, 1];

const phoneNodes = [
  { id: "termux", label: "Termux", sub: "Linux Environment", icon: Terminal },
  { id: "llama", label: "llama-server", sub: "Qwen 2.5 1.5B", icon: Cpu },
  { id: "pico", label: "PicoClaw", sub: "AI Gateway", icon: Server },
];

const externalNodes = [
  { id: "telegram", label: "Telegram Bot", sub: "Automated Reports", icon: MessageCircle },
  { id: "dashboard", label: "Dashboard", sub: "System Monitor", icon: BarChart3 },
  { id: "tunnel", label: "Cloudflare", sub: "Global Access", icon: Globe },
];

const techStack = [
  { name: "Termux", color: "from-green-500 to-emerald-600" },
  { name: "llama.cpp", color: "from-orange-500 to-red-500" },
  { name: "Qwen 2.5", color: "from-blue-500 to-cyan-500" },
  { name: "PicoClaw", color: "from-purple-500 to-pink-500" },
  { name: "Node.js", color: "from-green-600 to-lime-500" },
  { name: "Telegram Bot", color: "from-sky-400 to-blue-600" },
  { name: "Cloudflare", color: "from-orange-400 to-yellow-500" },
];

export default function ArticleClient() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const closeLightbox = useCallback(() => setLightboxSrc(null), []);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={targetRef} className="relative w-full selection:bg-primary/20 selection:text-primary">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[60] origin-left"
        style={{ width: progressWidth }}
      />

      <Portal>
        <AnimatePresence>
          {lightboxSrc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12 cursor-zoom-out"
              onClick={closeLightbox}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-[10000] p-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all hover:scale-110 active:scale-95"
                aria-label="Close image"
              >
                <X size={24} />
              </motion.button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0, filter: "blur(20px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 0.9, opacity: 0, filter: "blur(20px)" }}
                transition={{ duration: 0.5, ease: premiumEase }}
                className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center pointer-events-none"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={lightboxSrc}
                    alt="Article demonstration image expanded"
                    fill
                    className="object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    priority
                    sizes="100vw"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>

      <article className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pb-12 relative z-10">

        <header className="mb-12 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary"
          >
            <span className="flex items-center gap-1.5 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
              <Calendar className="w-3.5 h-3.5" /> Jan 2026
            </span>
            <span className="flex items-center gap-1.5 bg-foreground/5 px-4 py-2 rounded-full border border-foreground/10">
              <Clock className="w-3.5 h-3.5" /> 6 min read
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1, ease: premiumEase }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground tracking-tighter leading-[0.95]"
          >
            Running a Local LLM <br className="hidden md:block" />
            <span className="text-gradient">on an Old Phone</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: premiumEase }}
            className="text-2xl sm:text-3xl text-foreground/60 leading-tight max-w-4xl font-light tracking-tight"
          >
            Turning retired hardware into a high-performance AI edge server with local inference, automated reporting, and real-time monitoring — for free.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-8 space-y-16">
            <section className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tighter text-foreground">The Hidden Power in Your Drawer</h2>
              <div className="prose prose-invert prose-xl max-w-none text-foreground/70 font-light leading-relaxed space-y-6">
                <p>
                  Most old smartphones represent a missed opportunity. Despite their cracked screens or dated cameras, they remain incredible pieces of engineering — ARM64 architectures, highly efficient cores, built-in battery redundancy, and integrated wireless connectivity.
                </p>
                <p>
                  My Huawei nova 7i was collecting dust. By repurposing it as an always-on AI server, I managed to eliminate cloud dependency for basic inference tasks while breathing new life into "e-waste." No cloud bills, no privacy concerns, just a pure local ecosystem.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 not-prose">
                  {[
                    { icon: Zap, title: "Zero Latency/Cost", desc: "No API fees or network delays from external providers." },
                    { icon: ShieldCheck, title: "Total Privacy", desc: "Your data stays on-device, encrypted and local." },
                    { icon: RotateCcw, title: "Sustainable Dev", desc: "Repurposing hardware reduces environmental impact." },
                    { icon: Layers, title: "Full Linux Stack", desc: "Native Linux performance via Termux & ARM64." }
                  ].map((feature) => (
                    <div key={feature.title} className="glass-card p-5 rounded-2xl flex flex-col gap-3 border border-foreground/5 bg-background/20 hover:bg-background/40 transition-colors">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-foreground mb-2">{feature.title}</h4>
                        <p className="text-sm text-foreground/50 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tighter text-foreground text-center md:text-left">Architecture Flow</h2>
                <p className="text-xl text-foreground/60 leading-relaxed font-light">
                  A multi-layered pipeline running entirely on the Kirin 810 SoC.
                </p>
              </div>
              
              <div className="glass-card p-10 md:p-16 rounded-[3rem] bg-background/40 border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    className="relative rounded-[2.5rem] border border-primary/30 bg-primary/[0.05] p-10 md:p-12 w-full max-w-2xl shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-12">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/20">
                          <Smartphone className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-foreground/80">Edge Node</span>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Online</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 md:gap-12">
                      {phoneNodes.map((node) => (
                        <div key={node.id} className="flex flex-col items-center gap-4 text-center">
                          <div className="w-16 h-16 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2rem] bg-background/80 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-700 group-hover:border-primary/50">
                            <node.icon className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                          </div>
                          <div>
                            <span className="text-xs md:text-base font-bold text-foreground block mb-1">{node.label}</span>
                            <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-tighter leading-tight block">{node.sub}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <div className="h-20 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent" />

                  <div className="flex flex-wrap justify-center gap-12">
                    {externalNodes.map((node) => (
                      <div key={node.id} className="flex flex-col items-center gap-4 text-center w-28">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500 group-hover:border-primary/30">
                          <node.icon className="w-7 h-7 md:w-9 md:h-9 text-foreground/40 group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-foreground/60">{node.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tighter text-foreground">Technical Implementation</h2>
              <div className="space-y-12">
                {[
                  {
                    title: "The Linux Foundation",
                    desc: "Deploying a Linux ecosystem on Android begins with Termux. I opted for the F-Droid distribution to ensure full access to the package repository. Integrating Termux:API was critical — it enables low-level hardware access, allowing my scripts to monitor thermal throttling and power states in real-time.",
                    code: "pkg update && pkg upgrade\npkg install termux-api nodejs git cmake"
                  },
                  {
                    title: "Inference Engine: llama.cpp",
                    desc: "The choice of inference engine is vital. llama.cpp provides native C++ performance on ARM64. I compiled it with 4-core parallelization optimized for the Kirin 810 architecture. For the model, Qwen 2.5 (1.5B) at Q4_K_M quantization offers the best balance between token-per-second (TPS) and contextual intelligence.",
                    code: "git clone https://github.com/ggml-org/llama.cpp\ncd llama.cpp && cmake -B build\ncmake --build build --config Release -j4"
                  },
                  {
                    title: "System Orchestration",
                    desc: "Automation is handled via standard Linux cron jobs. The Node.js worker triggers PicoClaw at scheduled intervals, processes the model output, and pushes rich Markdown reports to my Telegram bot. This allows for scheduled news aggregation and personal task management without manual intervention.",
                    code: "0 */6 * * * node ~/scripts/generate-intel-report.js"
                  }
                ].map((step, i) => (
                  <div key={step.title} className="relative pl-12 md:pl-16 border-l-2 border-primary/20 space-y-6 group/step">
                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] group-hover/step:scale-125 transition-transform duration-500" />
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-primary/40 group-hover/step:text-primary transition-colors">Phase 0{i + 1}</span>
                    <h3 className="text-3xl font-bold text-foreground tracking-tight">{step.title}</h3>
                    <p className="text-xl text-foreground/60 font-light leading-relaxed">{step.desc}</p>
                    <div className="pt-4 overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
                      <div className="bg-foreground/[0.05] px-6 py-3 border-b border-white/5 flex items-center justify-between">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                        </div>
                        <span className="text-[10px] font-mono text-foreground/30">terminal — termux</span>
                      </div>
                      <pre className="p-8 bg-[#0A0A0C] overflow-x-auto text-sm font-mono text-primary scrollbar-hide">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <figure className="space-y-6 group">
                <div
                  className="rounded-[3rem] overflow-hidden border border-white/5 bg-foreground/5 cursor-zoom-in group-hover:border-primary/30 transition-all duration-700 shadow-2xl"
                  onClick={() => setLightboxSrc("/llm-telegram-bot.png")}
                >
                  <Image
                    src="/llm-telegram-bot.png"
                    alt="Intelligence reports delivered via Telegram API"
                    width={800}
                    height={1200}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000"
                    priority
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                </div>
                <figcaption className="text-center">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-foreground/30 block mb-1">Figure 1.0</span>
                  <span className="text-sm font-medium text-foreground/50">Scheduled intelligence reports delivered via Telegram API.</span>
                </figcaption>
              </figure>

              <figure className="space-y-6 group">
                <div
                  className="rounded-[3rem] overflow-hidden border border-white/5 bg-foreground/5 cursor-zoom-in group-hover:border-primary/30 transition-all duration-700 shadow-2xl"
                  onClick={() => setLightboxSrc("/llm-dashboard.png")}
                >
                  <Image
                    src="/llm-dashboard.png"
                    alt="Real-time performance monitor"
                    width={1400}
                    height={800}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000"
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                </div>
                <figcaption className="text-center">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-foreground/30 block mb-1">Figure 2.0</span>
                  <span className="text-sm font-medium text-foreground/50">Real-time Node.js + Alpine.js monitoring dashboard.</span>
                </figcaption>
              </figure>
            </section>

            <section className="space-y-6 pb-8">
              <h2 className="text-4xl font-bold tracking-tighter text-foreground">The Future of Edge AI</h2>
              <div className="prose prose-invert prose-xl max-w-none text-foreground/70 font-light leading-relaxed">
                <p>
                  Running local LLMs on repurposed mobile hardware isn&apos;t just a fun experiment — it&apos;s a blueprint for the future of distributed computing. As models become more efficient and NPU (Neural Processing Unit) access becomes more standardized in Linux-on-Android environments, the "phone in your drawer" might just become the most valuable server in your stack.
                </p>
                <p>
                  Zero cloud cost, zero data leakage, and zero recurring fees. The intelligence is now local.
                </p>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="glass-card p-6 rounded-3xl bg-background/40 border border-white/5 space-y-6 group/card">
                <h3 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover/card:rotate-12 transition-transform duration-500">
                    <Smartphone size={18} />
                  </div>
                  Node Specs
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Processor", value: "Kirin 810 (Octa-core)" },
                    { label: "Inference RAM", value: "8 GB LPDDR4X" },
                    { label: "Memory Pressure", value: "~2.1 GB at Peak" },
                    { label: "Avg Inference Speed", value: "4.5 tokens/sec" },
                    { label: "Power Source", value: "USB-C (Constant)" },
                    { label: "Uptime", value: "24/7 (Linux Stable)" }
                  ].map((spec) => (
                    <div key={spec.label} className="space-y-1.5 border-l-2 border-foreground/5 pl-4 hover:border-primary transition-colors">
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20 block">{spec.label}</span>
                      <p className="text-lg font-bold text-foreground/80 tracking-tight">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl bg-background/40 border border-white/5 space-y-4">
                <h3 className="text-lg font-bold tracking-tight text-foreground">The Stack</h3>
                <div className="flex flex-wrap gap-2.5">
                  {techStack.map((tech) => (
                    <span
                      key={tech.name}
                      className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r ${tech.color} shadow-lg shadow-black/20 hover:scale-110 transition-transform cursor-default`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl bg-background/40 border border-white/5 space-y-4">
                <h3 className="text-lg font-bold tracking-tight text-foreground">Resources</h3>
                <div className="space-y-2.5">
                  {[
                    { title: "PicoClaw Gateway", url: "https://picoclaw.net/" },
                    { title: "llama.cpp Source", url: "https://github.com/ggml-org/llama.cpp" },
                    { title: "Cloudflare One", url: "https://cloudflare.com" },
                    { title: "Qwen 2.5 GGUF", url: "https://huggingface.co/Qwen" }
                  ].map((link) => (
                    <a
                      key={link.title}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-foreground/5 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all group/link"
                    >
                      <span className="text-base font-bold text-foreground/60 group-hover/link:text-primary transition-colors">{link.title}</span>
                      <div className="p-2 rounded-full bg-foreground/5 group-hover/link:bg-primary/20 transition-colors">
                        <ArrowUpRight className="w-4 h-4 text-foreground/30 group-hover/link:text-primary transition-all group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-foreground/10 text-center space-y-8"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tighter">Enjoyed the deep dive?</h3>
            <p className="text-base text-foreground/40 font-light">Share it with your fellow engineers or explore more experiments.</p>
          </div>

        </motion.footer>
      </article>
    </div>
  );
}
