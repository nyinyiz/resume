# Nyi Nyi Zaw — Portfolio

**Live:** [nyinyizaw.dev](https://nyinyizaw.dev)

Next.js · TypeScript · Tailwind CSS · Framer Motion

---

## Agent Skill

Install my profile into any AI agent:

```bash
npx skills add nyinyiz/resume --skill nyi-agent
mkdir -p ~/.claude/commands && cp .agents/skills/nyi-agent/commands/*.md ~/.claude/commands/
```

| Command | |
|---------|--|
| `/asknyi` | Skills, experience, availability |
| `/fitcheck [JD]` | Fit score + verdict for a job description |
| `/talkwithnyi` | Open conversation |
| `/workwithnyi` | Working style, team fit |
| `/codereview [code]` | Code review in his voice |

> Slash commands work in Claude Code. Other agents use natural language.

---

## Highlights

- **Homepage** — full-screen slide deck, animated PCB background, terminal boot loader
- **`/hire`** — paste a JD, get an instant fit analysis (client-side, no API)
- **`/resume-builder`** — edit resume content and preview downloadable PDF templates
- **Agent skill** — [SKILL.md](./nyi-agent/SKILL.md) following the [Agent Skills](https://agentskills.io/specification) standard

---

## Project Structure

| Path | Purpose |
|------|---------|
| `src/app` | Next.js app routes, metadata, sitemap, and page shells |
| `src/components` | Main portfolio sections, navigation, slide deck UI, shared UI |
| `src/features/hire` | Recruiter-facing JD matcher and agent config |
| `src/features/resume-builder` | Resume form, JSON editor helpers, and PDF generation |
| `src/data/resume.ts` | Single source of truth for public resume content |
| `nyi-agent` | Portable AI agent skill and slash commands |

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Slide-based portfolio homepage |
| `/hire` | Client-side job description fit checker |
| `/resume-builder` | Resume editor and PDF preview |
| `/articles` | Article listing |
| `/articles/local-llm-old-phone` | Long-form 2nd Brain article |

## Testing

```bash
npm run lint
npm run test
npx tsc --noEmit
npm run build
```

---

## Dev

```bash
npm install
npm run dev    # localhost:3000
```

Most public content lives in `src/data/resume.ts`. Edit once, and the portfolio, recruiter view, and resume tooling stay aligned.

---

MIT
