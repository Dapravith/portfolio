# Rotha Dapravith — portfolio

Source for [dapravith.vercel.app](https://dapravith.vercel.app): a full-stack developer
portfolio in English and Khmer, with project case studies and a working contact form.

**Stack:** Next.js 16 (App Router, static generation), React 19, TypeScript, Tailwind CSS 4,
Zod. Tested with Vitest and Playwright (+ axe-core). Deployed on Vercel.

## Run it

```bash
npm ci
```

```bash
npm run dev
```

Open http://localhost:3000 (English) or http://localhost:3000/km (Khmer).

## Check it

```bash
npm run check
```

```bash
npm run test:e2e
```

`check` runs lint, typecheck, unit tests and a production build. `test:e2e` builds
the site against a local mock email provider and runs the Playwright suite.

## Where things are

| Path | What |
|---|---|
| `src/content/` | All profile, experience, skills and project content (typed, validated) |
| `src/i18n/` | Locale config and UI strings (English + Khmer) |
| `src/app/[locale]/` | Pages: home, projects, case studies, about, contact |
| `src/app/api/contact/` | Contact endpoint → `src/lib/contact/` |
| `src/proxy.ts` | Maps `/` → English and `/km` → Khmer |
| `src/components/` | UI components |
| `tests/` | Unit and end-to-end tests |
| `docs/portfolio/` | Audit, roadmap, design system, content guide, test plan, operations |

To update content, start with [`docs/portfolio/CONTENT_GUIDE.md`](docs/portfolio/CONTENT_GUIDE.md).
To enable the contact form, see [`docs/portfolio/OPERATIONS.md`](docs/portfolio/OPERATIONS.md).
