# Slide-Deck Portfolio Animation — Design Spec
Date: 2026-03-31

## Overview

Convert the portfolio from a continuous-scroll single-page layout into a full-screen slide-deck experience. Each section occupies 100dvh. A curtain-wipe (`clip-path`) transition moves between slides. Sections with content taller than the viewport scroll internally; reaching the top or bottom edge triggers a slide change. Navigation works via scroll wheel, keyboard, touch swipe, and clickable side dots. The architecture is cleanly separated into a slides layer, a hooks layer, and a shared motion config.

## Decisions Made

| Question | Decision |
|---|---|
| Layout model | Full-screen slides (approach B) |
| Long content sections | Internal scroll within the slide |
| Transition style | Curtain wipe — `clip-path` reveal |
| Mobile behavior | Same slide behavior on mobile (swipe up/down) |

## Sections (slides in order)

1. Hero
2. Experience
3. Projects
4. Skills
5. Articles
6. Speaking
7. Certificates

## Navigation Inputs

| Input | Behavior | Cooldown |
|---|---|---|
| Scroll wheel | At slide top/bottom edge → slide change. Otherwise → scroll content | 750ms lock after transition |
| Keyboard ↑ ↓ | Always navigates between slides | 750ms lock |
| Touch swipe | At slide top/bottom edge → slide change. δY > 40px threshold | 750ms lock |
| Dot click | Jump directly to any slide | No cooldown |
| Dot label click | Same as dot (desktop only) | No cooldown |

The 750ms cooldown is enforced via a `useRef` timestamp — no `useState` involved.

## Curtain Wipe Transition

Both directions use `clip-path` on the **incoming** slide only. The outgoing slide stays in place underneath.

**Forward (next slide):**
- Incoming: `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` — wipes in from left
- Duration: 650ms
- Easing: `cubic-bezier(0.76, 0, 0.24, 1)`

**Backward (previous slide):**
- Incoming: `clip-path: inset(0 0 0 100%)` → `inset(0 0 0 0%)` — wipes in from right
- Duration: 650ms
- Same easing

Implemented via Framer Motion `AnimatePresence` with direction-aware `custom` prop and `variants`. `mode="sync"` so incoming and outgoing overlap during transition. Incoming slide is rendered at `z-index: 10`; outgoing stays at `z-index: 1` beneath it. Both are `position: absolute; inset: 0` inside the `SlideTransition` container.

## Internal Scroll Behavior

Slides with content taller than 100dvh use a scrollable inner container (`overflow-y: auto`, `overscroll-behavior: contain`).

The `useInternalScroll` hook attaches to the scroll container ref and:
- On `wheel` event: if `scrollTop === 0` and `deltaY < 0` → call `prevSlide()`. If `scrollTop + clientHeight >= scrollHeight - 1` and `deltaY > 0` → call `nextSlide()`. Otherwise do nothing (let native scroll handle it).
- On `touchstart`/`touchend`: same logic with touch delta instead of `deltaY`.
- Respects the 750ms cooldown to prevent accidental double-triggers.

Sections that fit within 100dvh (Hero, Speaking, Certificates) use a non-scrollable container.

## Code Architecture

### New files

```
src/lib/motion.ts                     — spring presets, easing curves, variant factories
src/hooks/useSlideNavigation.ts       — wheel / keyboard / touch → next/prev dispatch
src/hooks/useInternalScroll.ts        — edge detection → triggers slide change
src/components/slides/SlideDeck.tsx   — manages current index, provides SlideDeckContext
src/components/slides/Slide.tsx       — full-screen wrapper + internal scroll container
src/components/slides/SlideTransition.tsx — AnimatePresence + clip-path curtain variants
src/components/slides/SlideDots.tsx   — side dots + section labels, click navigation
src/components/slides/ScrollProgress.tsx — 2px top progress bar tied to slide index
```

### Modified files

```
src/app/page.tsx          — renders <SlideDeck> with slides array instead of space-y-32 stack
src/app/layout.tsx        — adds overflow:hidden to body (prevents page-level scroll)
src/app/template.tsx      — route-level fade transition for /articles and other routes
src/components/Hero.tsx            — remove standalone FadeInSection; Slide provides the enter animation
src/components/Experience.tsx      — same
src/components/Projects.tsx        — same
src/components/Skills.tsx          — same
src/components/MediumArticles.tsx  — same
src/components/Speaking.tsx        — same
src/components/Certificates.tsx    — same
src/components/FadeInSection.tsx   — kept but no longer used at page.tsx level
src/components/Navbar.tsx          — hides when inside slide-deck (nav replaced by SlideDots)
```

### Deleted/superseded

`FadeInSection` wrapping at `page.tsx` level is removed. Section-level scroll-triggered animations inside each component are kept for the internal-scroll sections (they still trigger when content enters the viewport within the slide).

## Component Contracts

### SlideDeck

```tsx
// Provides SlideDeckContext: { current, total, goTo, next, prev }
// Registers global keyboard and scroll listeners via useSlideNavigation
// Renders SlideTransition wrapping the active Slide
<SlideDeck slides={[<Hero />, <Experience />, ...]} />
```

### Slide

```tsx
// scrollable: boolean — enables internal scroll container
// onEdgeTop / onEdgeBottom: () => void — called by useInternalScroll
<Slide scrollable={true}>
  {children}
</Slide>
```

### SlideTransition

```tsx
// direction: 1 (forward) | -1 (backward)
// Wraps AnimatePresence; applies clip-path variants based on direction
<SlideTransition direction={direction} slideKey={current}>
  {activeSlide}
</SlideTransition>
```

### SlideDots

```tsx
// Reads SlideDeckContext
// Renders vertical dot stack on the right edge (desktop + mobile)
// Shows section labels on desktop hover
```

## lib/motion.ts — exports

```ts
export const spring = {
  default: { type: "spring", stiffness: 100, damping: 20 },
  snappy:  { type: "spring", stiffness: 280, damping: 22 },
  slow:    { type: "spring", stiffness: 60,  damping: 18 },
}

export const ease = {
  out:     [0.22, 1, 0.36, 1],
  inOut:   [0.76, 0, 0.24, 1],  // used for curtain wipe
  sharp:   [0.4, 0, 0.2, 1],
}

export const curtainVariants = (direction: 1 | -1) => ({
  initial: { clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" },
  animate: { clipPath: "inset(0 0% 0 0%)", transition: { duration: 0.65, ease: ease.inOut } },
  exit:    { clipPath: "inset(0 0% 0 0%)", transition: { duration: 0 } }, // no exit anim
})

export const fadeVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -16 },
}
```

## Sections: scrollable vs fixed

| Section | Scrollable | Reason |
|---|---|---|
| Hero | No | Content fits in 100dvh |
| Experience | Yes | Roles + responsibilities overflow on smaller screens |
| Projects | No | Phone mockup fits in 100dvh |
| Skills | Yes | 4-column grid + legend may overflow |
| Articles | Yes | 5 article cards exceed 100dvh |
| Speaking | No | Card grid fits in 100dvh |
| Certificates | No | Short card grid fits in 100dvh |

## Progress Bar

`ScrollProgress` reads `current` and `total` from `SlideDeckContext`. Width = `(current + 1) / total * 100%`. Animated via Framer Motion `layoutId` or `width` spring transition.

## Route Transitions (template.tsx)

`app/template.tsx` wraps all routes in a simple `motion.div` fade (`opacity: 0 → 1`, 300ms). This handles the transition when navigating to `/articles` and back. The slide deck is only active on `/`.

## Constraints & Edge Cases

- **Reduced motion:** All transitions check `useReducedMotion()`. If true, skip clip-path animation (instant switch).
- **Overflow lock:** `document.body` gets `overflow: hidden` on mount, restored on unmount of `SlideDeck`.
- **Navbar:** Hidden on the main `/` route (navigation replaced by `SlideDots`). Visible on `/articles` and other sub-routes.
- **Back button / deep links:** `SlideDeck` does not use the URL hash for slide state (too complex for scope). Navigation is session-only.
- **iOS Safari:** Uses `min-h-[100dvh]` not `h-screen` throughout.
- **Dot labels:** Visible on desktop only (`hidden md:flex`). Appear on dot hover via CSS opacity transition.
