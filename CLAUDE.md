# CLAUDE.md

Personal portfolio for Rotha Dapravith. Next.js 16 App Router, React 19, TypeScript,
Tailwind CSS 4, Zod. English at `/`, Khmer at `/km` (via `src/proxy.ts` → `src/app/[locale]`).

## Commands

- `npm run dev` — dev server
- `npm run check` — lint + typecheck + unit tests + build (run before every commit)
- `npm run test:e2e` — Playwright (builds with a mock email provider on :3399, app on :3300)
- `npm run links:external` — checks external URLs in `src/`

## Rules for changes

- **Never invent or embellish content.** Titles, dates, responsibilities and project
  claims must be traceable to `public/rotha-dapravith-resume.pdf` or the linked
  repository. No seniority words, proficiency percentages, metrics, testimonials or
  client logos unless the owner supplies evidence. `tests/unit/content.test.ts` enforces part of this.
- Do not describe confidential employer systems beyond what the résumé says.
- Content goes in `src/content/*.ts`; UI strings in `src/i18n/dictionaries.ts` (both
  locales, same keys). Do not put content arrays in components.
- Server Components by default. Current client components: `site-nav`, `theme-toggle`,
  `project-filter`, `contact-form`. Keep it that way unless interaction requires more.
- Follow `docs/portfolio/DESIGN_SYSTEM.md`: tokens in `src/app/globals.css`, one accent
  colour, no gradients/glow/particles/cards-with-shadows, nothing animating on scroll.
- New UI must pass the e2e suite: axe WCAG 2.2 AA in both themes and languages, no
  horizontal overflow from 320px to 1920px, 44px touch targets.
- The contact API must only report success after the provider accepts the message,
  and must never log message contents.
- Don't push to `main`, merge or deploy without the owner's approval.
