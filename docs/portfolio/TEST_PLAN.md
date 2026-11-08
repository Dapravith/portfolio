# Test plan

| Layer | Command | What it covers |
|---|---|---|
| Lint | `npm run lint` | ESLint with Next.js core-web-vitals and TypeScript rules |
| Types | `npm run typecheck` | `tsc --noEmit`, strict mode |
| Unit | `npm test` | Vitest, `tests/unit/` |
| Build | `npm run build` | Also validates all content (Zod) and generates every page |
| End-to-end | `npm run test:e2e` | Playwright, `tests/e2e/`; builds the site with a mock email provider |
| External links | `npm run links:external` | Every `https://` URL in `src/` (weekly in CI) |
| Dependencies | `npm audit --omit=dev --audit-level=high` | CI gate |

Everything except external links runs on every pull request (`.github/workflows/ci.yml`).
Run `npm run check` locally for lint + types + unit + build.

## Unit tests (53)

- `content.test.ts` — content validates; no seniority/leadership claims beyond the
  résumé; no percentage skill scores; experience ordering; repositories are original
  and under the owner's account; Khmer titles for every project; one contact email;
  Khmer dictionary has the same keys as English.
- `contact.test.ts` — success only after provider 2xx with `reply_to` set; 502 on
  provider error or network failure; 503 when unconfigured; field-level 422; control
  characters rejected; honeypot and timing rejection without sending; per-IP rate
  limit with `Retry-After`; cross-origin, wrong content type, malformed and oversized
  bodies; `no-store`; no personal data in logs.
- `proxy.test.ts` — locale rewrites, `/en` redirects, cookie redirect, query strings kept.
- `i18n.test.ts` — path helpers, fallback marking, Khmer month formatting.
- `contrast.test.ts` — WCAG contrast of the colour tokens in both themes, read from `globals.css`.

## End-to-end tests (71, desktop Chrome + Pixel 7)

- Navigation, `aria-current`, language switch and persistence, theme persistence,
  skip link, bilingual 404, résumé redirects.
- Project filter (click, direct URL, keyboard), case-study sections, diagram, repo links,
  Khmer fallback marking.
- Contact: field errors and focus; success against the mock provider (asserting the
  payload); honest failure message with email fallback and input preserved.
- axe-core WCAG 2.2 AA on all 16 pages (English + Khmer) in light and dark.
- No horizontal overflow at 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920px.
- 44px header touch targets on mobile; unique titles, descriptions, canonical,
  hreflang, single h1; sitemap and robots; security headers; all internal links resolve.

## Manual checks before a release

- Read the home, one case study and contact page on a real phone, in both languages.
- Keyboard-only pass: Tab through header, filter, form; focus is always visible.
- Screen reader spot-check (VoiceOver or NVDA): form errors are announced, the project
  count is announced after filtering.
- If the contact form is enabled in production, send one real message.

## Performance baseline (2026-11-08)

Lighthouse 12, mobile emulation (simulated slow 4G, 4× CPU), local production
builds of both versions on the same machine. Home page rows are medians of 5–7 runs;
other pages are single runs.

| Page | Version | Perf | A11y | Best pr. | SEO | LCP | CLS | TBT | JS (transfer) | Total |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | before (`main`) | 96 | 92 | 100 | 100 | 2.3 s | 0 | 160 ms | 233 KB | 308 KB |
| `/` | after | 98 | 100 | 100 | 100 | 2.2 s | 0 | 80 ms | 151 KB | 294 KB |
| `/km` | after | 90 | 100 | 100 | 100 | 2.3 s | 0.14 | 60 ms | 151 KB | 338 KB |
| case study | after | 96 | 100 | 100 | 100 | 2.7 s | 0 | 100 ms | 151 KB | 291 KB |
| `/projects` | after | 99 | 100 | 100 | 100 | 1.9 s | 0 | 50 ms | 151 KB | 291 KB |
| `/contact` | after | 97 | 100 | 100 | 100 | 2.6 s | 0 | 50 ms | 183 KB | 306 KB |

Notes:

- Simulated LCP is bimodal on this machine (≈2.1 s or ≈2.7 s between identical
  runs); observed, unthrottled LCP is 130–190 ms. Field data from Speed Insights
  would be more reliable than these lab numbers.
- `/km` (median of 3) has CLS 0.14 because the Khmer font uses `display: swap`.
  `optional` scored CLS 0 but left first-time visitors without a system Khmer font
  (common on Linux) with unshaped, unreadable text, so correctness won. The fix is
  to preload the Khmer font on `/km` routes only (see ROADMAP).
- `/contact` ships extra JS for client-side validation (Zod).
