# Slide-Deck Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the portfolio from a continuous-scroll layout into a full-screen slide-deck with curtain-wipe (`clip-path`) transitions, internal scroll for long sections, and swipe/keyboard/dot navigation.

**Architecture:** A `SlideDeck` component (fixed full-screen, `z-20`) manages slide state via context and renders one slide at a time inside `SlideTransition`. `Slide` wraps each section component — scrollable variants detect edge-of-content and trigger slide changes. All navigation (wheel, keyboard, touch, dot click) funnels through two focused hooks sharing a central cooldown gated on `SlideDeck`.

**Tech Stack:** Next.js 14 App Router, Framer Motion v11, Tailwind CSS v3, TypeScript

---

## File Map

**Create:**
```
src/lib/motion.ts                        — spring presets, easing, curtain/fade variants
src/hooks/useSlideNavigation.ts          — keyboard + wheel/touch for non-scrollable slides
src/hooks/useInternalScroll.ts           — edge detection for scrollable slides
src/components/slides/SlideDeckContext.tsx  — context, types, useSlideDeck hook
src/components/slides/SlideDeck.tsx         — orchestrator, state, keyboard/scroll registration
src/components/slides/Slide.tsx             — full-screen wrapper with optional internal scroll
src/components/slides/SlideTransition.tsx   — AnimatePresence + clip-path curtain
src/components/slides/SlideDots.tsx         — side-dot navigation + section labels
src/components/slides/ScrollProgress.tsx    — 2px top progress bar
```

**Modify:**
```
src/app/page.tsx          — replace space-y-32 stack with <SlideDeck>
src/app/layout.tsx        — add overflow:hidden to body wrapper div
src/app/template.tsx      — simplify to clean fade (keep existing structure)
src/components/Navbar.tsx — hide on "/" route (replaced by SlideDots)
src/components/Hero.tsx   — remove min-h-[88vh], replace with h-full
```

---

## Task 1: src/lib/motion.ts

**Files:**
- Create: `src/lib/motion.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/lib/motion.ts
// Central animation config. Import from here instead of hardcoding values in components.

import type { Variants } from "framer-motion"

// ─── Spring presets ───────────────────────────────────────────────────────────
export const spring = {
  default: { type: "spring" as const, stiffness: 100, damping: 20 },
  snappy:  { type: "spring" as const, stiffness: 280, damping: 22 },
  slow:    { type: "spring" as const, stiffness: 60,  damping: 18 },
}

// ─── Easing curves ────────────────────────────────────────────────────────────
export const ease = {
  out:   [0.22, 1, 0.36, 1]  as [number, number, number, number],
  inOut: [0.76, 0, 0.24, 1]  as [number, number, number, number],
  sharp: [0.4,  0, 0.2,  1]  as [number, number, number, number],
}

// ─── Curtain wipe variants (direction-aware, use with custom prop) ────────────
// Forward  (direction=1):  new slide reveals from left  → clip right edge shrinks
// Backward (direction=-1): new slide reveals from right → clip left edge shrinks
export const curtainVariants: Variants = {
  initial: (dir: 1 | -1) => ({
    clipPath: dir > 0 ? "inset(0 100% 0 0)" : "inset(0 0% 0 100%)",
  }),
  animate: (_dir: 1 | -1) => ({
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
  }),
  exit: (_dir: 1 | -1) => ({
    // Hold the outgoing slide fully visible for the wipe duration, then remove
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 0.65 },
  }),
}

// ─── Simple fade (section content enter, route transitions) ───────────────────
export const fadeVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
}
```

- [ ] **Step 2: Verify types compile**

```bash
cd /Volumes/Nyi-Nyi-Sandisk/Resume/resume && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors from `src/lib/motion.ts`

- [ ] **Step 3: Commit**

```bash
git add src/lib/motion.ts
git commit -m "feat: add central motion config (spring presets, easing, curtain variants)"
```

---

## Task 2: src/components/slides/SlideDeckContext.tsx

**Files:**
- Create: `src/components/slides/SlideDeckContext.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/slides/SlideDeckContext.tsx
"use client"

import { createContext, useContext } from "react"

export interface SlideDeckContextValue {
  current:   number
  total:     number
  direction: 1 | -1
  next:      () => void   // includes 750ms cooldown
  prev:      () => void   // includes 750ms cooldown
  goTo:      (index: number) => void  // no cooldown (dot clicks)
}

export const SlideDeckContext = createContext<SlideDeckContextValue | null>(null)

export function useSlideDeck(): SlideDeckContextValue {
  const ctx = useContext(SlideDeckContext)
  if (!ctx) throw new Error("useSlideDeck must be used within a SlideDeck")
  return ctx
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no new errors

- [ ] **Step 3: Commit**

```bash
git add src/components/slides/SlideDeckContext.tsx
git commit -m "feat: add SlideDeckContext with types and useSlideDeck hook"
```

---

## Task 3: src/components/slides/ScrollProgress.tsx

**Files:**
- Create: `src/components/slides/ScrollProgress.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/slides/ScrollProgress.tsx
"use client"

import { motion } from "framer-motion"
import { useSlideDeck } from "./SlideDeckContext"
import { spring } from "@/lib/motion"

export default function ScrollProgress() {
  const { current, total } = useSlideDeck()
  const pct = `${((current + 1) / total) * 100}%`

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-foreground/5 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-violet-500 origin-left"
        animate={{ width: pct }}
        transition={spring.snappy}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/slides/ScrollProgress.tsx
git commit -m "feat: add ScrollProgress bar component"
```

---

## Task 4: src/components/slides/SlideDots.tsx

**Files:**
- Create: `src/components/slides/SlideDots.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/slides/SlideDots.tsx
"use client"

import { motion } from "framer-motion"
import { useSlideDeck } from "./SlideDeckContext"

const LABELS = [
  "Hero",
  "Experience",
  "Projects",
  "Skills",
  "Articles",
  "Speaking",
  "Certificates",
]

export default function SlideDots() {
  const { current, total, goTo } = useSlideDeck()

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-end gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          aria-label={`Go to ${LABELS[i] ?? `slide ${i + 1}`}`}
          className="group flex items-center gap-2.5 cursor-pointer"
        >
          {/* Label — desktop hover only */}
          <span
            className={`
              hidden md:block text-[9px] font-bold tracking-widest uppercase
              transition-all duration-200
              ${i === current
                ? "text-foreground/70 opacity-100"
                : "text-foreground/35 opacity-0 group-hover:opacity-100"}
            `}
          >
            {LABELS[i]}
          </span>

          {/* Dot pill */}
          <motion.div
            animate={{
              height:          i === current ? 22 : 5,
              backgroundColor: i === current
                ? "hsl(var(--primary))"
                : "hsl(var(--foreground) / 0.2)",
              scale: i === current ? 1 : 1,
            }}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="w-[5px] rounded-full"
          />
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/slides/SlideDots.tsx
git commit -m "feat: add SlideDots navigation component"
```

---

## Task 5: src/hooks/useSlideNavigation.ts

**Files:**
- Create: `src/hooks/useSlideNavigation.ts`

- [ ] **Step 1: Create the hooks directory and file**

```bash
mkdir -p /Volumes/Nyi-Nyi-Sandisk/Resume/resume/src/hooks
```

```typescript
// src/hooks/useSlideNavigation.ts
// Handles keyboard (always) and wheel/touch (only for non-scrollable slides).
// Scrollable slides use useInternalScroll instead.
// Uses refs throughout to avoid re-registering event listeners on every render.

import { useEffect, useRef } from "react"

export function useSlideNavigation(
  onNext: () => void,
  onPrev: () => void,
  isCurrentScrollable: boolean,
) {
  const nextRef = useRef(onNext)
  const prevRef = useRef(onPrev)
  const scrollableRef = useRef(isCurrentScrollable)

  // Keep refs in sync without re-registering listeners
  useEffect(() => { nextRef.current = onNext }, [onNext])
  useEffect(() => { prevRef.current = onPrev }, [onPrev])
  useEffect(() => { scrollableRef.current = isCurrentScrollable }, [isCurrentScrollable])

  useEffect(() => {
    let touchStartY = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault()
        nextRef.current()
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault()
        prevRef.current()
      }
    }

    const handleWheel = (e: WheelEvent) => {
      // Scrollable slides own their wheel events via useInternalScroll
      if (scrollableRef.current) return
      e.preventDefault()
      if (e.deltaY > 0) nextRef.current()
      else prevRef.current()
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (scrollableRef.current) return
      const deltaY = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < 40) return
      if (deltaY > 0) nextRef.current()
      else prevRef.current()
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, []) // empty — all deps handled via refs
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useSlideNavigation.ts
git commit -m "feat: add useSlideNavigation hook (keyboard + non-scrollable wheel/touch)"
```

---

## Task 6: src/hooks/useInternalScroll.ts

**Files:**
- Create: `src/hooks/useInternalScroll.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/hooks/useInternalScroll.ts
// Attaches to the scroll container of a scrollable slide.
// When the user is at the top edge and scrolls up → onPrev().
// When at the bottom edge and scrolls down → onNext().
// Otherwise: lets native scroll handle it (content scrolls within the slide).

import { useEffect } from "react"

export function useInternalScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  onNext: () => void,
  onPrev: () => void,
) {
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let touchStartY = 0

    const atTop    = () => el.scrollTop <= 1
    const atBottom = () => el.scrollTop + el.clientHeight >= el.scrollHeight - 1

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0 && atTop()) {
        e.preventDefault()
        onPrev()
      } else if (e.deltaY > 0 && atBottom()) {
        e.preventDefault()
        onNext()
      }
      // else: let native scroll continue
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < 40) return
      if (deltaY < 0 && atTop())    onPrev()
      else if (deltaY > 0 && atBottom()) onNext()
    }

    el.addEventListener("wheel", handleWheel, { passive: false })
    el.addEventListener("touchstart", handleTouchStart, { passive: true })
    el.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      el.removeEventListener("wheel", handleWheel)
      el.removeEventListener("touchstart", handleTouchStart)
      el.removeEventListener("touchend", handleTouchEnd)
    }
  }, [containerRef, onNext, onPrev])
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useInternalScroll.ts
git commit -m "feat: add useInternalScroll hook (edge detection for scrollable slides)"
```

---

## Task 7: src/components/slides/Slide.tsx

**Files:**
- Create: `src/components/slides/Slide.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/slides/Slide.tsx
// Full-screen wrapper for each section.
// - Non-scrollable: flex container, section centers itself
// - Scrollable: overflow-y-auto container; edge detection triggers slide changes
"use client"

import { useRef } from "react"
import { useSlideDeck } from "./SlideDeckContext"
import { useInternalScroll } from "@/hooks/useInternalScroll"

interface SlideProps {
  children:   React.ReactNode
  scrollable: boolean
}

export default function Slide({ children, scrollable }: SlideProps) {
  const { next, prev } = useSlideDeck()
  const scrollRef = useRef<HTMLDivElement>(null)

  // useInternalScroll is a no-op when scrollRef.current is null (non-scrollable case)
  useInternalScroll(scrollable ? scrollRef : { current: null }, next, prev)

  if (scrollable) {
    return (
      <div
        ref={scrollRef}
        className="absolute inset-0 w-full bg-background overflow-y-auto overscroll-contain"
      >
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-16">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full bg-background overflow-hidden">
      <div className="relative h-full w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-8 flex flex-col justify-center">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/slides/Slide.tsx
git commit -m "feat: add Slide wrapper with scrollable/fixed variants"
```

---

## Task 8: src/components/slides/SlideTransition.tsx

**Files:**
- Create: `src/components/slides/SlideTransition.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/slides/SlideTransition.tsx
// Wraps AnimatePresence with the curtain-wipe clip-path transition.
// - Incoming slide (z-10): clips in via clip-path (forward=left, backward=right)
// - Outgoing slide (z-1):  holds visible for the wipe duration then is removed
// - mode="sync": both animate simultaneously so the wipe is seamless
"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { curtainVariants } from "@/lib/motion"

interface SlideTransitionProps {
  slideKey:  number
  direction: 1 | -1
  children:  React.ReactNode
}

export default function SlideTransition({ slideKey, direction, children }: SlideTransitionProps) {
  const reduced = useReducedMotion()

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={slideKey}
          custom={direction}
          variants={reduced ? undefined : curtainVariants}
          initial={reduced ? { opacity: 0 } : "initial"}
          animate={reduced ? { opacity: 1 } : "animate"}
          exit={reduced ? { opacity: 0 } : "exit"}
          className="absolute inset-0"
          style={{ zIndex: 10 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/slides/SlideTransition.tsx
git commit -m "feat: add SlideTransition with clip-path curtain wipe"
```

---

## Task 9: src/components/slides/SlideDeck.tsx

**Files:**
- Create: `src/components/slides/SlideDeck.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/slides/SlideDeck.tsx
// Orchestrates the slide-deck experience.
// - Manages current index + direction state
// - Exposes next/prev (with 750ms cooldown) and goTo (no cooldown) via context
// - Registers keyboard + wheel + touch listeners via useSlideNavigation
// - Renders SlideTransition > Slide > section component
"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { SlideDeckContext } from "./SlideDeckContext"
import SlideTransition from "./SlideTransition"
import Slide from "./Slide"
import SlideDots from "./SlideDots"
import ScrollProgress from "./ScrollProgress"
import { useSlideNavigation } from "@/hooks/useSlideNavigation"

export interface SlideConfig {
  component:  React.ReactNode
  label:      string
  scrollable: boolean
}

interface SlideDeckProps {
  slides: SlideConfig[]
}

export default function SlideDeck({ slides }: SlideDeckProps) {
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  // Central cooldown shared by all navigation paths
  const cooldownRef = useRef(0)

  const canTrigger = useCallback(() => {
    const now = Date.now()
    if (now - cooldownRef.current < 750) return false
    cooldownRef.current = now
    return true
  }, [])

  const goTo = useCallback((index: number) => {
    if (index === current) return
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const next = useCallback(() => {
    if (!canTrigger()) return
    setCurrent(c => {
      const n = Math.min(c + 1, slides.length - 1)
      if (n !== c) setDirection(1)
      return n
    })
  }, [canTrigger, slides.length])

  const prev = useCallback(() => {
    if (!canTrigger()) return
    setCurrent(c => {
      const n = Math.max(c - 1, 0)
      if (n !== c) setDirection(-1)
      return n
    })
  }, [canTrigger])

  const isCurrentScrollable = slides[current]?.scrollable ?? false

  useSlideNavigation(next, prev, isCurrentScrollable)

  // Lock page-level scroll while slide-deck is active
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = original }
  }, [])

  return (
    <SlideDeckContext.Provider value={{ current, total: slides.length, direction, next, prev, goTo }}>
      {/* Full-screen fixed container — sits above layout, below navbar-level z-50 */}
      <div className="fixed inset-0 z-20">
        <SlideTransition slideKey={current} direction={direction}>
          <Slide scrollable={isCurrentScrollable}>
            {slides[current].component}
          </Slide>
        </SlideTransition>

        <ScrollProgress />
        <SlideDots />
      </div>
    </SlideDeckContext.Provider>
  )
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no new errors

- [ ] **Step 3: Commit**

```bash
git add src/components/slides/SlideDeck.tsx
git commit -m "feat: add SlideDeck orchestrator with cooldown-gated navigation"
```

---

## Task 10: Update src/app/page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the page**

```tsx
// src/app/page.tsx
"use client"

import Hero from "@/components/Hero"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import MediumArticles from "@/components/MediumArticles"
import Speaking from "@/components/Speaking"
import Certificates from "@/components/Certificates"
import SlideDeck, { type SlideConfig } from "@/components/slides/SlideDeck"
import { Analytics } from "@vercel/analytics/react"

const slides: SlideConfig[] = [
  { component: <Hero />,           label: "Hero",         scrollable: false },
  { component: <Experience />,     label: "Experience",   scrollable: true  },
  { component: <Projects />,       label: "Projects",     scrollable: false },
  { component: <Skills />,         label: "Skills",       scrollable: true  },
  { component: <MediumArticles />, label: "Articles",     scrollable: true  },
  { component: <Speaking />,       label: "Speaking",     scrollable: false },
  { component: <Certificates />,   label: "Certificates", scrollable: false },
]

export default function Home() {
  return (
    <>
      <SlideDeck slides={slides} />
      <Analytics />
    </>
  )
}
```

- [ ] **Step 2: Run build to check for errors**

```bash
npm run build 2>&1 | tail -30
```

Expected: compiles, may have type warnings — no blocking errors

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire SlideDeck into home page with 7 slide configs"
```

---

## Task 11: Update Hero.tsx — remove min-h-[88vh]

The `Slide` wrapper now provides the full-screen container and vertical centering. Hero's own `min-h-[88vh]` fights with the slide layout.

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Remove min-h and pt-16 pb-20 from the section element**

Find this line in `src/components/Hero.tsx`:
```tsx
<section className="relative flex flex-col-reverse items-center justify-center gap-16 lg:gap-20 md:flex-row min-h-[88vh] w-full pt-16 pb-20">
```

Replace with:
```tsx
<section className="relative flex flex-col-reverse items-center justify-center gap-16 lg:gap-20 md:flex-row w-full h-full">
```

- [ ] **Step 2: Run build**

```bash
npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "fix: remove min-h-[88vh] from Hero — Slide wrapper handles full-screen height"
```

---

## Task 12: Update src/components/Navbar.tsx — hide on home route

The Navbar is replaced by `SlideDots` on `/`. Keep it visible on all other routes.

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Add usePathname and hide on "/"**

Add `usePathname` import (it's already available from `next/navigation`):

```tsx
import { usePathname } from "next/navigation"
```

In the component body, after the existing `const firstName = ...` line, add:

```tsx
const pathname = usePathname()
```

Then update the early return at the bottom of the mount guard:

```tsx
// Replace:
if (!mounted) return null

// With:
if (!mounted || pathname === "/") return null
```

- [ ] **Step 2: Run build**

```bash
npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: hide Navbar on home route (replaced by SlideDots)"
```

---

## Task 13: Update src/app/layout.tsx — allow SlideDeck overflow

The `SlideDeck` is `fixed inset-0` so it breaks out of the normal flow. The `main` element still needs `overflow: hidden` on its wrapper to prevent scroll behind the slide deck. Also remove the `pt-24` from `main` for the home route (handled by Slide) while keeping it for other routes.

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add overflow-hidden to the outer wrapper div**

Find:
```tsx
<div className="relative flex min-h-screen flex-col overflow-hidden">
```

The `overflow-hidden` is already present — no change needed there.

Find the `<main>` element:
```tsx
<main className="relative z-10 flex-1 px-4 sm:px-8 lg:px-16 pt-24 pb-16 w-full max-w-screen-2xl mx-auto">
```

The `SlideDeck` is `fixed` so it doesn't interact with `main`. The `main` element is only used for non-home routes (`/articles`, etc.) where the Navbar is visible and `pt-24` is correct. No change needed to `main`.

> No code change required for `layout.tsx`. The `SlideDeck` at `fixed inset-0 z-20` sits above `main` naturally. The `overflow-hidden` on the outer wrapper already prevents background scroll.

- [ ] **Step 2: Verify by running build**

```bash
npm run build 2>&1 | tail -20
```

Expected: clean build

---

## Task 14: Update src/app/template.tsx — clean up route transitions

The existing `template.tsx` has blur + x-translation which fights with the SlideDeck fade on the home route. Simplify to a clean opacity fade that works for all routes.

**Files:**
- Modify: `src/app/template.tsx`

- [ ] **Step 1: Replace with a clean fade**

```tsx
// src/app/template.tsx
"use client"

import { motion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Run build**

```bash
npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add src/app/template.tsx src/app/layout.tsx
git commit -m "fix: simplify template.tsx to clean fade for route transitions"
```

---

## Task 15: Final build verification + visual check

- [ ] **Step 1: Full production build**

```bash
npm run build 2>&1
```

Expected output:
```
✓ Compiled successfully
Route (app)                              Size     First Load JS
┌ ○ /                                    ...
├ ○ /articles                            ...
...
○  (Static)  prerendered as static content
```

No TypeScript errors, no build errors.

- [ ] **Step 2: Start dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- [ ] Hero slide is full-screen, no scrollbar on body
- [ ] Scroll down → curtain wipe reveals Experience slide
- [ ] Scroll up → curtain wipe reveals Hero slide (wipes from opposite direction)
- [ ] Arrow keys ↑/↓ navigate between slides
- [ ] Side dots appear on right edge, active dot is taller/primary-colored
- [ ] Clicking a dot jumps to that slide directly
- [ ] Hovering a dot on desktop reveals the section label
- [ ] Experience slide: scroll through content, reach bottom → next slide triggers
- [ ] Top progress bar advances with each slide change
- [ ] Navigate to `/articles` — Navbar appears, SlideDeck gone, normal layout
- [ ] Navigate back to `/` — SlideDeck resumes at Hero

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat: implement full-screen slide-deck with curtain-wipe transitions

- Full-screen slides (100dvh) with clip-path curtain wipe transition
- Direction-aware: forward wipes left→right, backward wipes right→left
- Internal scroll for Experience, Skills, Articles sections
- Edge-of-content detection triggers slide change via useInternalScroll
- Keyboard (↑↓), scroll wheel, touch swipe, dot click navigation
- 750ms cooldown prevents accidental double-triggers
- Side dots with section labels (desktop hover) for direct navigation
- 2px progress bar tracks current position
- Navbar hidden on home route, visible on /articles and sub-routes
- Reduced motion: instant switch, no clip-path animation
- SlideDeckContext provides clean interface for all child components

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```
