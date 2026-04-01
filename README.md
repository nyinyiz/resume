# Nyi Nyi Zaw — Portfolio

Personal portfolio and resume site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

Live: [nyinyizaw.vercel.app](https://nyinyizaw.vercel.app/)

---

## Features

- Full-screen slide-deck homepage with shared-element transitions and animated background
- `/hire` page with a recruiter-facing JD matcher (NLP keyword scoring) and AI agent skill panel
- Terminal-style loading screen on first visit
- Resume data sourced from a single file — one edit updates the whole site
- In-browser resume builder with PDF export
- Dark mode by default, consistent design system across all pages

## Stack

- **Next.js 15** App Router
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React** (icons)
- **jsPDF** (PDF export)

## Project structure

```
src/
  app/                   Routes and page entry points
  components/            Shared UI components and slide system
  context/               Lightweight React context (resume data)
  data/                  Resume and portfolio source content
  features/
    hire/                JD matcher, agent config, recruiter flow
    resume-builder/      Resume editing and PDF generation
    shell/               App-level layout helpers
  hooks/                 Reusable interaction hooks
  lib/                   Shared utilities
  types/                 Shared TypeScript types
public/                  Static assets and downloadable files
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Slide-based portfolio homepage |
| `/hire` | Recruiter page — JD matcher + AI agent skill download |
| `/articles` | Article index |

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build
```

## Content

All portfolio content lives in [`src/data/resume.ts`](./src/data/resume.ts). Components read from it directly or through [`src/context/ResumeContext.tsx`](./src/context/ResumeContext.tsx).
