# Project Fix Roadmap

Small, focused tasks to improve reliability, maintainability, and polish.

## P0 - Must Fix

### 1. Install and Configure ESLint - Done

`npm run lint` currently fails because ESLint is not installed.

Tasks:
- Add ESLint and the Next.js ESLint config as dev dependencies.
- Add a basic ESLint config compatible with Next.js 14.
- Run `npm run lint`.
- Fix or document any lint issues that appear.

Done when:
- `npm run lint` exits successfully.
- `npm run build` no longer prints the missing ESLint warning.

### 2. Add `src/features` to Tailwind Content Paths - Done

Tailwind currently scans `src/app` and `src/components`, but many UI classes live in `src/features`.

Tasks:
- Update `tailwind.config.ts`.
- Add `./src/features/**/*.{js,ts,jsx,tsx,mdx}` to `content`.
- Run `npm run build`.
- Manually check `/hire` styling in production mode.

Done when:
- Feature UI styles are included in production builds.

### 3. Fix Resume PDF Education Field Mismatch - Done

The PDF generator expects `education.field`, but the current resume data does not include `field`.

Tasks:
- Decide whether `field` should exist in resume data.
- Either add `field` to `src/data/resume.ts`, or update PDF text to avoid using it.
- Check all templates in `src/features/resume-builder/lib/pdfGenerator.ts`.
- Generate or preview a PDF.

Done when:
- Generated PDFs do not show `undefined`.

## P1 - Important

### 4. Decide the Resume Builder's Future - Done

Resume-builder components and libraries exist, but no app route exposes them.

Tasks:
- Decide whether resume builder is a real feature or leftover code.
- If real, create a route such as `/resume-builder`.
- If not real, remove unused components and libraries.
- Update README accordingly.

Done when:
- There is no hidden half-feature in the codebase.

### 5. Replace `any` Types in Core Components - Done

Several UI components use `any`, which weakens the benefits of TypeScript.

Tasks:
- Start with `src/components/Experience.tsx`.
- Add proper local types or reuse resume data types.
- Then update `src/components/Projects.tsx`.
- Then update resume-builder components if that feature stays.

Done when:
- Core portfolio components avoid `any`.
- `npx tsc --noEmit` still passes.

### 6. Tighten Resume Data Types - Done

`resumeData` is not explicitly typed against the app's resume model.

Tasks:
- Export or refine a `ResumeData` type that matches actual data.
- Type `resumeData` with `satisfies ResumeData`.
- Include optional fields like `profileImage`, `skills`, `detailedTechnicalExpertise`, and `portfolioLinks`.
- Run TypeScript validation.

Done when:
- Data shape mistakes are caught at compile time.

## P2 - Quality

### 7. Add Basic Tests for JD Matcher - Done

The JD matcher is pure logic and easy to test.

Tasks:
- Add a small test setup.
- Test perfect matches, adjacent matches, learnable skills, out-of-scope skills, and gibberish detection.
- Keep test cases short and readable.

Done when:
- Matching logic can be changed safely.

### 8. Improve Project README - Done

The README is clean but light on architecture and feature details.

Tasks:
- Add a short project structure section.
- Document `/hire`.
- Document article pages.
- Document the agent skill folder.
- Mention where resume content is edited.

Done when:
- A new contributor can understand the project in under five minutes.

### 9. Refresh Browser Data - Done

The build warns that Browserslist data is outdated.

Tasks:
- Run the recommended Browserslist update.
- Commit package lock changes if any.
- Re-run build.

Done when:
- Build no longer prints outdated Browserslist warnings.

## P3 - Polish

### 10. Review Image Remote Pattern - Done

`next.config.js` allows images from any HTTPS hostname.

Tasks:
- List actual remote image domains needed.
- Replace wildcard hostname with specific domains.
- Keep local public images unchanged.

Done when:
- Remote image policy is narrower and intentional.

### 11. Add Production Smoke Checklist - Done

Create a simple checklist for manual verification before deploy.

Tasks:
- Check `/`.
- Check `/hire`.
- Check `/articles`.
- Check `/articles/local-llm-old-phone`.
- Check theme toggle.
- Check mobile viewport.

Done when:
- Manual release checks are documented and repeatable.

### 12. Normalize Copy and Spelling - Done

There are a few copy issues in resume/project content.

Tasks:
- Fix small typos such as "Earlier know" to "Earlier known".
- Normalize company names like `GTRIIP`.
- Review wording for consistency across resume sections.

Done when:
- Public-facing copy feels intentional and polished.
