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
- **Agent skill** — [SKILL.md](./nyi-agent/SKILL.md) following the [Agent Skills](https://agentskills.io/specification) standard

---

## Dev

```bash
npm install
npm run dev    # localhost:3000
```

All content lives in `src/data/resume.ts`. Edit once, everything updates.

---

MIT
