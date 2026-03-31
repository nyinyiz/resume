# Nyi Nyi Zaw Portfolio

Personal portfolio and resume site built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

Live site: [nyinyizaw.vercel.app](https://nyinyizaw.vercel.app/)

## What this project includes

- A full-screen slide-deck homepage for the portfolio experience
- A recruiter-focused `/hire` route with a job-description matcher
- Resume data-driven content sourced from a single file
- In-browser resume builder and PDF export utilities
- Article pages for longer-form writing and project breakdowns

## Tech stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- jsPDF
- Radix UI

## Project structure

```text
src/
  app/                         App routes and page entry points
  components/
    slides/                    Slide-deck presentation system
    ui/                        Shared UI primitives
  context/                     Lightweight shared React context
  data/                        Resume and portfolio source content
  features/
    hire/                      Recruiter-facing matching flow
    resume-builder/            Resume editing and PDF generation tooling
    shell/                     App-level layout helpers
  hooks/                       Reusable interaction hooks
  lib/                         Shared utilities not tied to a single feature
  types/                       Shared TypeScript types
docs/
  architecture/                Design and architecture notes
  plans/                       Implementation plans
public/                        Static assets and downloadable files
```

## Core routes

- `/` slide-based portfolio homepage
- `/hire` recruiter-oriented page with JD matching and agent config download
- `/articles` article index
- `/articles/local-llm-old-phone` featured article page

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Note: Next.js currently warns that `eslint` is not installed as a dev dependency during build-time linting.

## Content model

Most portfolio content is maintained in [`src/data/resume.ts`](./src/data/resume.ts). Presentation components read from that source directly or through the small context wrapper in [`src/context/ResumeContext.tsx`](./src/context/ResumeContext.tsx).

## Documentation

- Architecture notes: [`docs/architecture`](./docs/architecture)
- Implementation plans: [`docs/plans`](./docs/plans)
