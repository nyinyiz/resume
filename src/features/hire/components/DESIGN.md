# Design System: Nyi Agent Install

## 1. Visual Theme & Atmosphere
A "High-End Developer Utility" interface with a focus on precision and technical clarity. The atmosphere is a blend of "Art Gallery Airy" (Density 3) and "OLED Dark" (for code elements). It uses the project's signature "Liquid Glass" effect for cards, providing a sense of depth and premium build quality.

## 2. Color Palette & Roles
- **OLED Black** (#020617) — Terminal backgrounds and code blocks
- **Emerald Pulse** (#34D399) — Singular accent for successful status, installation progress, and primary CTAs
- **Sky Refraction** (#38BDF8) — Secondary accent for technical keywords and links
- **Glass Surface** (rgba(255,255,255,0.03)) — Card fills with 20px blur
- **Ghost Border** (rgba(255,255,255,0.08)) — Structural lines and card edges
- **Muted Zinc** (#71717A) — Secondary descriptions and metadata

## 3. Typography Rules
- **Display:** Outfit — Track-tight, bold (700) for section headers.
- **Body:** Inter — Clean, neutral (400) for descriptions and steps.
- **Mono:** JetBrains Mono — For all terminal commands, code snippets, and slash command names.
- **Anti-Patterns:** No Inter for display headers (keep Outfit for brand consistency). No generic system fonts.

## 4. Component Stylings
* **Vertical Timeline:** A structural left-aligned line (Emerald Pulse) connecting installation steps. Each step marked with a high-contrast numeric badge.
* **Terminal Blocks:** Deep OLED black with subtle inner shadows. Emerald prompt (`$`). Syntax highlighting using Emerald (commands), Sky (values), and Violet (flags).
* **Command Cards:** Clean glass cards with Lucide icons. Focus on hover with a 2px Emerald left-border transition.
* **Preview Manifest:** A code-editor-like view of the SKILL.MD file, reinforcing the "Agentic" nature of the tool.

## 5. Layout Principles
- **Asymmetric Split:** 40/60 split for Desktop. Left side handles the "Linear Install" path; right side displays the "Command Registry".
- **Density 3:** Generous internal padding (p-8 to p-12) to allow the technical content to "breathe".
- **Safe-Area Compliance:** All fixed elements respect mobile notch and gesture bars.

## 6. Motion & Interaction
- **Spring Physics:** { stiffness: 100, damping: 20 } for all tab transitions and lightbox reveals.
- **Cascade Reveals:** Installation steps waterfall in with 50ms stagger.
- **Micro-interactions:** "Copied" state triggers a 200ms scale-up and Emerald color shift.

## 7. Anti-Patterns (Banned)
- No emojis anywhere.
- No neon/outer glow shadows.
- No pure black (#000000) for UI surfaces — use OLED Black (#020617).
- No generic "3-column grid" for commands.
- No filler UI text like "Scroll to explore".
