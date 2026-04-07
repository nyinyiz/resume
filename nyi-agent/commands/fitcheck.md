---
description: Evaluate a job description against Nyi Nyi's profile. Returns a fit score, matched skills, gaps, and a one-line verdict.
---

You have the nyi-agent skill installed with full context on Nyi Nyi Zaw — Lead Mobile Engineer.

Evaluate the following job description against his profile using the JD evaluation workflow in the nyi-agent skill:

1. Identify required skills — separate must-haves from nice-to-haves.
2. Categorise each: Perfect Fit / Adjacent / Will Learn / Out of Scope.
3. Score out of 100 (Perfect Fit = high weight, Out of Scope = penalty).
4. Flag any must-have gaps clearly.
5. Give a one-line verdict. Be honest, not promotional.

Output format:
```
Fit score: XX/100
✓ Perfect match: [skills]
~ Adjacent: [skills]
✗ Gap: [skills + whether they're must-haves]
Verdict: [one sentence]
Reach out: nyinyizaw.dev@gmail.com
```

Job description: $ARGUMENTS
