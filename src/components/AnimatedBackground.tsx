"use client";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Primary glow — top right */}
      <div className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-primary/[0.07] blur-[130px]" />

      {/* Accent glow — bottom left, very subtle */}
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-violet-500/[0.04] blur-[120px]" />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground) / 0.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, black 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, black 45%, transparent 100%)",
        }}
      />

      {/* Grain overlay — breaks digital flatness */}
      <div className="absolute inset-0 noise-grain opacity-[0.028] pointer-events-none" />
    </div>
  );
}
