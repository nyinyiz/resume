# Nyi Nyi Zaw — Portfolio

Personal portfolio, resume site, and AI agent skill — built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

**Live:** [nyinyizaw.dev](https://nyinyizaw.dev)

---

## What's in here

### Portfolio site
Full-screen slide-deck homepage with shared-element transitions, animated PCB background, and a terminal-style boot loader on first visit. One data file drives the whole site — edit [`src/data/resume.ts`](./src/data/resume.ts) and everything updates.

### `/hire` — Work With Me
Two-panel recruiter page:
- **Left (humans):** Paste a job description, get an instant fit analysis — skills matched against a 200+ entry map, scored 0–100, categorised into Perfect Match / Adjacent / Will Learn / Outside My Lane. All client-side, no API calls.
- **Right (robots):** Installable AI agent skill for Claude Code, Gemini CLI, Codex, Cursor, GitHub Copilot, and 20+ other agents.

### `nyi-agent` — Agent Skill
A real, installable [SKILL.md](./nyi-agent/SKILL.md) following the [Agent Skills open standard](https://agentskills.io/specification).

```bash
npx skills add nyinyiz/resume --skill nyi-agent
```

After installing, your agent knows Nyi Nyi's full background and can respond to:

| Command | What it does |
|---------|-------------|
| `/asknyi [question]` | Q&A about skills, experience, or availability |
| `/workwithnyi [question]` | Working style, team fit, preferred setup |
| `/fitcheck [JD]` | Evaluates a job description, returns a fit score + verdict |
| `/codereview [code]` | Code review in his voice |
| `/talkwithnyi [message]` | Open conversation, first-person, ends with contact nudge |

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| PDF export | jsPDF + jspdf-autotable |
| Analytics | Vercel Analytics |

---

## Project structure

```
src/
  app/                    Routes and page entry points
  components/             Shared UI and slide system
    slides/               SlideDeck, SlideTransition, SlideDots
  context/                ResumeContext — single source of truth
  data/                   resume.ts — all portfolio content lives here
  features/
    hire/
      components/         HireMe.tsx — RecruiterPanel + SkillPanel
      lib/
        jdMatcher.ts      Client-side NLP JD analyser (200+ skill entries)
        agentConfig.ts    Agent persona, capabilities, constraints
    resume-builder/       In-browser resume editor + PDF export
    shell/                App-level layout helpers
  hooks/                  useSlideNavigation, useInternalScroll
  lib/                    Animation presets, motion constants, utilities
  types/                  Shared TypeScript types
public/
  nyi-agent.json          Downloadable agent config (static)
nyi-agent/
  SKILL.md                Installable agent skill (skills.sh standard)
```

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
```

---

## Customising for your own use

All content is in one file:

```
src/data/resume.ts
```

Update `personalInfo`, `experience`, `projects`, `certificates` and the whole site reflects the changes — homepage slides, PDF export, and the JD matcher skill map all read from it.

The JD matcher skill map lives in `src/features/hire/lib/jdMatcher.ts`. Add or reclassify skills there to tune the matching for your own profile.

The agent skill lives in `nyi-agent/SKILL.md`. Rewrite it with your own background and the `npx skills add` command will install your profile into any compatible agent.

---

## License

MIT
