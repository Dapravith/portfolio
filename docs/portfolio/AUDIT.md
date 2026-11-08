# Portfolio audit — baseline (2026-11-08)

Audited commit: `bbea38c` (main). The live site (dapravith.vercel.app) could not be
reached from the audit environment (egress blocked), so the baseline was taken from a
local production build of the same commit (`next build && next start`).

Severity: **P0** = wrong/untrue to visitors or a security exposure, **P1** = broken or
misleading functionality, **P2** = quality, performance or maintainability.

## 1. Content accuracy (P0)

Source of truth used: `public/Dapravith_Rotha_flow_cv.pdf` (committed 2025-11-05, the
newest resume), the older `public/resume.pdf`, the owner's initial commit `439d5b9`,
and the public GitHub repositories linked from the site.

| Claim on site | Evidence | Finding |
|---|---|---|
| "Senior Full-Stack Developer & DevOps Engineer" (hero, metadata, chat) | Both resumes: "Fullstack Developer". Owner's original copy: "Full-Stack Developer & DevOps Engineer". | Seniority added by an automated bot commit (`6337e8c`, 2025-12-17). **Inflated.** |
| DGC: "Senior Java Developer & DevOps Lead", Oct 2024 – Aug 2025, "mentor developers", "lead DevOps enablement" | Resume: "Java Developer", Oct 2024 – Sep 2025. No leadership or mentoring bullet. | **Inflated title and responsibilities.** |
| MEF: Spring Boot, PostgreSQL, MongoDB REST APIs | Resume: Angular + NestJS internal system, Keycloak SSO, Docker/GitLab/Jenkins, nginx + pm2. | **Wrong stack.** |
| ITC: Jul – Oct 2023, React + Node | Newest resume: Jun – Nov 2023, MERN delivery-management system, JWT, Docker, GitLab CI. | Dates and detail out of date. |
| Skill bars (e.g. "Docker 97%", "Spring Boot 95%") | No basis. | **Fabricated metrics** — removed. |
| "Microservices Enterprise System … service discovery, Redis, MongoDB" | Repo: Spring Cloud Gateway, Keycloak JWT, Resilience4j, Kafka, Feign, Flyway + PostgreSQL. No Eureka/Redis/Mongo in build files. | Description did not match the code. |
| "Monitoring … Zipkin, MySQL" | Repo: Eureka, Config Server, Prometheus, Grafana. No Zipkin/MySQL. | Description did not match the code. |
| "End-to-End Kubernetes DevSecOps Tetris" listed as own project | GitHub reports the repo is a **fork** of a third-party tutorial. | Presenting a fork as original work — removed. |
| Khmer name "រដ្ឋា ដាប្រាវីត" | Introduced by a bot commit; not in any owner-authored source. | Unverified — not displayed until the owner confirms it. |
| Footer email `rothadapravith@gmail.com` | Resume and every other link: `dapravithrotha@gmail.com`. | **Wrong address** — mail was going to a different inbox. |
| "Available: Immediately" | No dated source. | Kept as owner-stated availability, now with a "last updated" date in content. |

## 2. Functionality

| # | Sev | Finding |
|---|---|---|
| F1 | **P0** | `/api/contact` logs the visitor's name, email and message to server logs and returns `"Message sent successfully"` without sending anything. An invalid email (`not-an-email`) also returned success. Every contact attempt since launch has been silently dropped. |
| F2 | P0 | `/api/chat` forwards client-supplied messages — including `role: "system"` — to OpenAI with no length limit, no message-count limit and no rate limit. When no API key is set it still claims to be "powered by ChatGPT" and returns canned text that repeats the inflated "Senior" title. |
| F3 | P1 | View counter (`/api/analytics/views`) stores counts in process memory. On Vercel each serverless instance has its own counter that resets on cold start, so the footer showed numbers such as "4 total views". Misleading. |
| F4 | P1 | Khmer content is applied only after client hydration (Zustand + localStorage). Search engines and the first paint always see English; `<html lang>` is always `en` in the HTML. No Khmer URLs exist. |
| F5 | P1 | Project thumbnails are decorative SVG "diagrams" that render as near-blank tiles; no project detail pages exist. |
| F6 | P2 | Hero `onError` fallback points to `/public/04_…jpg` (invalid path); the file is also a byte-identical duplicate of `profile.jpg`. `resume.pdf` and `resume_rotha_dapravith (45).pdf` are identical; three resume files ship. |
| F7 | P2 | Mobile menu button has no accessible name or `aria-expanded`. Global CSS hides all scrollbars (`scrollbar-width: none` on `*`), which hurts usability. |

## 3. Security & dependencies

| # | Sev | Finding |
|---|---|---|
| S1 | **P0** | `npm audit --omit=dev`: 15 vulnerabilities (1 critical, 11 high, 3 moderate). Critical is in `next@16.0.10` (fixed in 16.4.x). Others: axios, zod, postcss, sharp, etc. |
| S2 | P1 | No security headers (CSP, frame-ancestors, nosniff, referrer policy, permissions policy). `X-Powered-By: Next.js` exposed. |
| S3 | P1 | Contact and chat endpoints have no abuse protection. Dead `src/middleware/auth.ts`, `cors.ts`, `rateLimiter.ts` are not wired to anything. |
| S4 | P2 | The public resume PDF contains two referees' personal phone numbers and emails. Publishing third-party contact details without need is a privacy risk — owner decision, not changed by this work. |

## 4. Architecture & tooling

- **Two PostCSS configs** (`postcss.config.js` → Tailwind v3 plugin, `postcss.config.mjs` → `@tailwindcss/postcss` v4) and **both Tailwind 3.4 and 4** installed. CSS uses v3 directives.
- The whole page is client-rendered (`"use client"` on every section) only because language lives in a client store.
- Unused code: `about-new`, `projects-new`, `animated-tech-background`, `floating-resume`, `floating-actions`, `*.old.ts` hooks, auth store, dashboard layout, auth/cors/rate-limit middleware, projects API with placeholder data (`github.com/yourusername/ecommerce`), axios client that redirects to a non-existent `/login`.
- Dependencies with no remaining purpose: axios, TanStack Query + Devtools (Devtools shipped to production), Zustand, react-hook-form, react-icons (very large), several Radix packages, two animation plugins.
- CI: `webpack.yml` runs `npx webpack` (no webpack config exists — always fails or no-ops) on Node 18 (unsupported by Next 16). `npm-publish-github-packages.yml` runs `npm test` (no script) and tries to publish a private app as an npm package.
- `appConfig.url` points to `dapravith.pro`; canonical domain is `dapravith.vercel.app`. No `sitemap.xml`, no `robots.txt`, no canonical URLs, no JSON-LD.
- 19 overlapping top-level docs (`COMPLETE_GUIDE.txt`, `FINAL_SUMMARY.txt`, `SETUP_COMPLETE.md`, …) mostly generated by bots; several describe features that never existed.

## 5. Baseline checks

| Check | Result |
|---|---|
| `eslint .` | **fail** — 5 errors, 2 warnings (`no-explicit-any`, `set-state-in-effect`) |
| `tsc --noEmit` | pass |
| `next build` | pass |
| Tests | none exist |
| Home HTML size | 182 KB |
| Horizontal overflow 320–1920px | none detected (root has `overflow-hidden`, which can mask overflow) |
| Home page height @375px | 11,927 px — projects begin ~5 screens down |

## 6. Design assessment

Matches most patterns on the anti-slop list: blue→purple gradient name text, glowing
pulsing orb behind a circular photo, canvas "tech particles", radial colour orbs, logo
as a gradient square, four stacked sections that are all centred-title + card grid,
percentage skill bars, a pulsing "available" dot, and tech-logo pills repeated in three
places. Typography is the system font with no scale. Content order buries the projects.

See `ROADMAP.md` for the prioritised backlog and `DESIGN_SYSTEM.md` for the chosen direction.

## 7. Status after the 2026-11 rebuild

| Finding | Status |
|---|---|
| Inflated titles, wrong stacks/dates, fabricated skill scores, fork presented as own work, wrong footer email | Fixed; guarded by `tests/unit/content.test.ts` |
| F1 contact form silently dropped messages | Fixed — real delivery, honest states, email fallback |
| F2 AI chat | Removed (rationale in `ROADMAP.md`) |
| F3 view counter | Removed |
| F4 client-only Khmer | Fixed — `/km` server-rendered, correct `lang`, hreflang |
| F5 blank thumbnails, no detail pages | Replaced by case studies with HTML architecture diagrams |
| F6 duplicate assets, broken fallback path | Fixed — one résumé file, old URLs redirect |
| F7 menu a11y, hidden scrollbars | Fixed — no menu needed; axe WCAG 2.2 AA clean |
| S1 vulnerabilities | Production: 0. Dev-only: 8 moderate in the typescript-eslint chain (no fix available upstream yet) |
| S2 headers | Fixed — CSP, HSTS, frame-ancestors, nosniff, referrer and permissions policy |
| S3 endpoint abuse | Contact: validation, honeypot, timing, rate limit, origin and size checks |
| S4 referee details in public PDF | **Open** — owner decision |
| Tooling, CI, docs sprawl | Fixed — one Tailwind, working CI, docs consolidated here |

| Check | Before | After |
|---|---|---|
| `eslint .` | 5 errors | 0 |
| Tests | none | 53 unit, 71 e2e |
| Home HTML | 182 KB | 64 KB |
| Home JS (transfer) | 233 KB | 151 KB |
| Lighthouse mobile, home (median) | Perf 96 · A11y 92 · BP 100 · SEO 100 | Perf 98 · A11y 100 · BP 100 · SEO 100 |
| Home height @375px | 11,927 px | ≈5,600 px |
