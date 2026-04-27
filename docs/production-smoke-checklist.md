# Production Smoke Checklist

Run this before shipping a portfolio update.

## Build Checks

- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npx tsc --noEmit`
- [ ] `npm run build`

## Route Checks

- [ ] `/` loads the slide deck after the boot loader.
- [ ] `/hire` accepts a realistic JD and returns a fit score.
- [ ] `/resume-builder` opens the editor and renders a PDF preview.
- [ ] `/articles` loads the article listing.
- [ ] `/articles/local-llm-old-phone` loads the full article.
- [ ] `/sitemap.xml` includes public indexable routes.

## UI Checks

- [ ] Theme toggle works.
- [ ] Home slide navigation works with keyboard.
- [ ] Home slide navigation works with wheel or trackpad.
- [ ] Scrollable slides can scroll internally.
- [ ] Mobile viewport has no clipped text or overlapping controls.
- [ ] External project links open correctly.

## Content Checks

- [ ] Contact links are correct.
- [ ] Current role and dates are correct.
- [ ] Project descriptions are typo-free.
- [ ] Open Graph image and title are suitable for sharing.
