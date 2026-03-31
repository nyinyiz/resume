"use client";

import { motion } from "framer-motion";

// PCB-style circuit traces covering the full viewport (viewBox 1440×900)
const TRACES = [
  "M -10,160 H 180 V 60 H 420 V 200 H 700 V 80 H 960 V 220 H 1240 V 120 H 1450",
  "M -10,480 H 240 V 360 H 500 V 520 H 760 V 380 H 1020 V 560 H 1280 V 460 H 1450",
  "M -10,740 H 160 V 640 H 380 V 780 H 620 V 680 H 860 V 820 H 1100 V 700 H 1320 V 840 H 1450",
  "M 240,-10 V 100 H 380 V 250 H 520 V 140 H 660 V 320 H 800 V 200 H 940 V 380 H 1080 V 260 H 1440",
  "M 60,910 V 780 H 200 V 680 H 360 V 780 H 520 V 640 H 680 V 760 H 840 V 620 H 1000 V 740 H 1160 V 600 H 1320 V 720 H 1450",
  "M 560,-10 V 140 H 700 V 300 H 840 V 180 H 980 V 340 H 1120 V 180 H 1260 V 340 H 1450",
];

const LIGHTS: { trace: number; color: string; duration: string; delay: string }[] = [
  { trace: 0, color: "#60a5fa", duration: "8s",  delay: "0s"   },
  { trace: 1, color: "#22d3ee", duration: "11s", delay: "2s"   },
  { trace: 2, color: "#a78bfa", duration: "13s", delay: "0.5s" },
  { trace: 3, color: "#38bdf8", duration: "9s",  delay: "4s"   },
  { trace: 4, color: "#818cf8", duration: "14s", delay: "1s"   },
  { trace: 5, color: "#2dd4bf", duration: "10s", delay: "3s"   },
  { trace: 0, color: "#fbbf24", duration: "8s",  delay: "5s"   },
  { trace: 1, color: "#fb7185", duration: "11s", delay: "7s"   },
  { trace: 3, color: "#60a5fa", duration: "9s",  delay: "6s"   },
];

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Orb 1 — sky blue, top-right — primary light source */}
      <motion.div
        className="absolute rounded-full bg-sky-400/[0.14] dark:bg-sky-400/[0.18] blur-[160px]"
        style={{
          width:  "min(1000px, 90vw)",
          height: "min(1000px, 90vw)",
          top:    "-35%",
          right:  "-20%",
        }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — indigo, bottom-left — cool depth shadow */}
      <motion.div
        className="absolute rounded-full bg-indigo-500/[0.09] dark:bg-indigo-500/[0.14] blur-[140px]"
        style={{
          width:  "min(850px, 80vw)",
          height: "min(850px, 80vw)",
          bottom: "-35%",
          left:   "-20%",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Orb 3 — cyan, top-left — fills corner, complements orb 1 */}
      <motion.div
        className="absolute rounded-full bg-cyan-400/[0.06] dark:bg-cyan-400/[0.10] blur-[130px]"
        style={{
          width:  "min(650px, 65vw)",
          height: "min(650px, 65vw)",
          top:    "-20%",
          left:   "-15%",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 9 }}
      />

      {/* Circuit board layer — PCB traces with traveling light pulses */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Trace lines */}
        {TRACES.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.06"
            className="dark:opacity-100 opacity-60"
          />
        ))}

        {/* Junction dots at key vertices */}
        {[
          [180, 160], [420, 60], [700, 200], [960, 80], [1240, 120],
          [240, 480], [500, 360], [760, 520], [1020, 380], [1280, 460],
          [380, 740], [620, 780], [860, 680], [1100, 820],
          [380, 100], [520, 250], [800, 200], [1080, 380],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="2"
            fill="currentColor"
            fillOpacity="0.08"
          />
        ))}

        {/* Traveling lights */}
        {LIGHTS.map((light, i) => (
          <circle
            key={i}
            r="2.5"
            fill={light.color}
            style={{
              offsetPath: `path("${TRACES[light.trace]}")`,
              animation: `circuit-travel ${light.duration} linear ${light.delay} infinite`,
              filter: `drop-shadow(0 0 5px ${light.color}) drop-shadow(0 0 10px ${light.color}80)`,
            } as React.CSSProperties}
          />
        ))}
      </svg>

      {/* Subtle top-edge radial — creates a soft "skylight" from above */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh] opacity-40 dark:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 0%, hsl(210 80% 65% / 0.12) 0%, transparent 100%)",
        }}
      />

      {/* Dot grid — fades out toward edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Grain overlay — breaks digital flatness */}
      <div className="absolute inset-0 noise-grain opacity-[0.04] pointer-events-none" />
    </div>
  );
}
