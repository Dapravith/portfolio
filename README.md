# Rotha Dapravith — portfolio

Source for **[dapravith.vercel.app](https://dapravith.vercel.app)**, the portfolio of
Rotha Dapravith, a full-stack developer in Phnom Penh working on Spring Boot APIs,
Keycloak single sign-on and CI/CD pipelines.

The site is bilingual (English and Khmer), statically generated, and built so that
every claim on it can be traced to the résumé or to a public repository.

## Features

- **Project case studies** — `/projects` with a shareable category filter
  (`?category=security`), and a page per project covering context, architecture
  (diagram rendered from data), technology choices, security, testing and known limitations.
- **English and Khmer** — English at `/`, Khmer at `/km`, both rendered on the server
  with the correct `<html lang>`, `hreflang` alternates and a remembered language choice.
- **Working contact form** — delivers through [Resend](https://resend.com) and only
  reports success after the provider accepts the message. Spam controls: honeypot,
  minimum fill time, per-IP rate limit, same-origin and size checks. Without
  provider keys the page shows an email link instead.
- **Accessible and responsive** — WCAG 2.2 AA (checked with axe on every page, both
  themes and languages), no horizontal scrolling from 320px to 1920px, 44px touch
  targets, light/dark theme, reduced-motion support.
- **SEO** — unique titles and descriptions, canonical URLs, sitemap, robots.txt,
  JSON-LD (`Person`, `SoftwareSourceCode`), social preview image.
- **Security headers** — Content-Security-Policy, HSTS, `frame-ancestors 'none'`,
  `nosniff`, referrer and permissions policies.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router, static generation, Turbopack) |
| UI | React 19, TypeScript (strict), Tailwind CSS 4 |
| Content | Typed TypeScript modules validated with Zod at build time |
| Email | Resend HTTP API (no SDK) |
| Tests | Vitest (unit), Playwright + axe-core (end-to-end, accessibility) |
| Hosting / CI | Vercel, GitHub Actions |

Runtime dependencies are deliberately few: `next`, `react`, `react-dom`, `zod`.

## Getting started

Requires **Node.js 20.9 or later** (CI uses Node 22).

```bash
npm ci
```

```bash
npm run dev
```

Open http://localhost:3000 for English or http://localhost:3000/km for Khmer.

The contact form is off until the environment variables below are set; everything
else works without configuration.

## Environment variables

Copy them into `.env.local` for local development, or into Vercel → Project →
Settings → Environment Variables for deployments. Never commit them.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | for the contact form | Resend API key (server-only) |
| `CONTACT_TO_EMAIL` | for the contact form | Inbox that receives messages |
| `CONTACT_FROM_EMAIL` | for the contact form | Sender on a domain verified in Resend, e.g. `Portfolio <contact@your-domain>` |
| `RESEND_API_URL` | no | Override the email API endpoint (the e2e tests point it at a local mock) |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical origin; defaults to `https://dapravith.vercel.app` |

The form is enabled **at build time**: after adding the three contact variables,
rebuild or redeploy. Full steps are in
[`docs/portfolio/OPERATIONS.md`](docs/portfolio/OPERATIONS.md#enabling-the-contact-form).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (also validates all content) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit tests (Vitest) |
| `npm run check` | Lint + typecheck + unit tests + build — run before every commit |
| `npm run test:e2e` | Builds against a mock email provider and runs Playwright |
| `npm run links:external` | Checks every external URL in `src/` |

For end-to-end tests, Playwright needs Chromium once:

```bash
npx playwright install chromium
```

## Project structure

```
src/
├── app/
│   ├── [locale]/            # Pages for en and km
│   │   ├── page.tsx         # Home
│   │   ├── projects/        # Project index and [slug] case studies
│   │   ├── about/
│   │   ├── contact/
│   │   └── layout.tsx       # <html lang>, fonts, header, footer
│   ├── api/contact/         # POST /api/contact
│   ├── api/og/              # Social preview image
│   ├── sitemap.ts, robots.ts
│   └── globals.css          # Design tokens and base styles
├── content/                 # Profile, experience, skills, projects (+ Zod schema)
├── i18n/                    # Locale config and UI strings (en + km)
├── lib/                     # Site helpers, JSON-LD, contact handler/delivery/rate limit
├── components/              # UI components
└── proxy.ts                 # Maps / → English, /km → Khmer, /en/* → redirect
tests/
├── unit/                    # Vitest
└── e2e/                     # Playwright, axe, mock email provider
docs/portfolio/              # Audit, roadmap, design system, guides
```

## Updating content

All content lives in `src/content/` — no content is hard-coded in components.

| To change | Edit |
|---|---|
| Role, summary, availability, links, résumé file | `src/content/profile.ts` |
| Jobs, education, courses | `src/content/experience.ts` |
| Skill groups and home-page capabilities | `src/content/skills.ts` |
| Projects and case studies | `src/content/projects.ts` |
| Buttons, headings, messages (both languages) | `src/i18n/dictionaries.ts` |

A content mistake (missing field, bad date, repository outside
`github.com/Dapravith`) fails the build. To replace the résumé, overwrite
`public/rotha-dapravith-resume.pdf` and update `profile.resume` in `profile.ts`.

Step-by-step instructions, including adding a project, are in
[`docs/portfolio/CONTENT_GUIDE.md`](docs/portfolio/CONTENT_GUIDE.md).

## Languages

- English is served at the root (`/about`); Khmer under `/km` (`/km/about`).
- Choosing a language sets a `NEXT_LOCALE` cookie; unprefixed URLs then redirect to
  the Khmer version. Search engines never send the cookie, so they see canonical URLs.
- Case-study body text is currently English-only; on Khmer pages it is marked
  `lang="en"` and a note says so.
- Khmer translations should be reviewed by a native speaker before each release.

## Testing and CI

Every pull request runs [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

1. Lint, typecheck, unit tests, production build
2. `npm audit --omit=dev --audit-level=high`
3. Playwright end-to-end tests, including axe accessibility checks on every page in
   both languages and themes, responsive checks at nine widths, SEO tags, security
   headers, internal links and the full contact flow

A weekly workflow ([`.github/workflows/weekly.yml`](.github/workflows/weekly.yml))
checks external links and dependencies. Details and the performance baseline are in
[`docs/portfolio/TEST_PLAN.md`](docs/portfolio/TEST_PLAN.md).

## Deployment

Vercel builds from GitHub: `main` deploys to production and pull requests get
preview deployments. CI does not deploy. Old résumé URLs (`/resume.pdf`,
`/Dapravith_Rotha_flow_cv.pdf`) redirect to the current file.

## Documentation

| Document | Contents |
|---|---|
| [`AUDIT.md`](docs/portfolio/AUDIT.md) | Findings from the 2026-11 audit and their status |
| [`ROADMAP.md`](docs/portfolio/ROADMAP.md) | What's done, what's next, and key decisions |
| [`DESIGN_SYSTEM.md`](docs/portfolio/DESIGN_SYSTEM.md) | Visual direction, tokens, components, review checklist |
| [`CONTENT_GUIDE.md`](docs/portfolio/CONTENT_GUIDE.md) | How to update content, and what the owner still needs to confirm |
| [`TEST_PLAN.md`](docs/portfolio/TEST_PLAN.md) | Test layers, coverage, performance baseline |
| [`OPERATIONS.md`](docs/portfolio/OPERATIONS.md) | Environment, contact form, monitoring, URLs, maintenance cadence |
| [`CLAUDE.md`](CLAUDE.md) | Rules for AI-assisted changes to this repository |

## Contributing

This is a personal site, but the same rules apply to every change:

- Never add or embellish content that can't be traced to the résumé or a public repository.
- Keep content in `src/content/` and UI strings in `src/i18n/dictionaries.ts` (both languages).
- Follow the design system: one accent colour, no gradients or decorative animation.
- Run `npm run check` and `npm run test:e2e` before opening a pull request.

## Contact

Rotha Dapravith — [dapravithrotha@gmail.com](mailto:dapravithrotha@gmail.com) ·
[LinkedIn](https://www.linkedin.com/in/rotha-dapravith/) ·
[GitHub](https://github.com/Dapravith)

The repository has no license file. Unless one is added, the code, text and
photographs are © Rotha Dapravith, all rights reserved.
