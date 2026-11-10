# Operations

## Deploy

Vercel builds from GitHub. Pushes to `main` deploy to production; pull requests get
preview deployments. Nothing deploys from this repository's CI.

Build: `npm run build` (Next.js 16, Turbopack). Node 22 in CI; Next.js requires ≥ 20.9.

## Environment variables

Set in Vercel → Project → Settings → Environment Variables. Never commit them.
Server variables are parsed in `src/server/env.ts`; blank values count as unset.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | for the contact form | Resend API key (server-only) |
| `CONTACT_TO_EMAIL` | for the contact form | Inbox that receives messages |
| `CONTACT_FROM_EMAIL` | for the contact form | Sender on a domain verified in Resend, e.g. `Portfolio <contact@your-domain>` |
| `RESEND_API_URL` | no | Override the API endpoint (tests use a local mock) |
| `OPENAI_API_KEY` | for AI chat answers | Without it the assistant answers from `src/content` only |
| `OPENAI_MODEL` | no | Chat model; defaults to `gpt-4o-mini` |
| `UPSTASH_REDIS_REST_URL` | for the visitor counter | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | for the visitor counter | Upstash Redis REST token (server-only) |
| `PORTFOLIO_COUNT_VISITORS` | no | `true` records visits outside Vercel production (for testing) |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical origin; defaults to `https://dapravith.vercel.app` |

**The contact form is switched on at build time.** If the three contact variables
are missing, `/contact` shows an email link instead of the form and `/api/contact`
returns 503. After adding them, redeploy.

### Enabling the contact form

1. Create a Resend account and verify a sending domain (or, for testing only, use
   `onboarding@resend.dev` as the sender — Resend then only delivers to the account owner's address).
2. Add the three variables above in Vercel for Production (and Preview if wanted).
3. Redeploy, then send a test message from `/contact` and confirm it arrives.

## Contact form behaviour

- Success is shown only when Resend returns 2xx.
- Spam controls: hidden honeypot field, minimum 2.5s between page load and submit,
  5 messages per IP per 10 minutes, same-origin check, 10 KB body limit.
- The rate limit is per server instance (in memory). If abuse appears, move it to a
  shared store such as Upstash Redis, or enable Vercel BotID / WAF rate limiting.
- Logs record only the provider status code on failure — never names, emails or messages.

## Monitoring

Kept deliberately small for a personal site:

- **Vercel Speed Insights / Web Analytics** — not installed. Enable them in the
  Vercel dashboard and add `@vercel/speed-insights` / `@vercel/analytics` if you
  want field Core Web Vitals; both are cookie-free.
- **Function logs** — Vercel → Logs, filter on `[contact]` to see delivery failures.
- **Weekly workflow** (`.github/workflows/weekly.yml`) — checks every external link
  in the content (project repositories, GitHub, LinkedIn) and runs `npm audit`. GitHub notifies
  the person who last edited the schedule when a scheduled run fails.

## Security headers

Set in `next.config.mjs` for every route: Content-Security-Policy (`script-src`
keeps `'unsafe-inline'` because statically generated pages use inline scripts),
`frame-ancestors 'none'`, HSTS, nosniff, referrer policy, permissions policy.
`X-Powered-By` is off.

## URLs

- English at `/`, Khmer at `/km`. `/en/...` redirects (308) to the unprefixed URL.
- A visitor who chooses Khmer gets a `NEXT_LOCALE=km` cookie; unprefixed URLs then
  redirect (307) to `/km/...`. Crawlers never send the cookie.
- `/resume.pdf` and `/Dapravith_Rotha_flow_cv.pdf` redirect to `/rotha-dapravith-resume.pdf`.
- `vercel.json` still aliases `dapravith.pro`; canonical tags point to
  `dapravith.vercel.app`. If `dapravith.pro` becomes the main domain, set
  `NEXT_PUBLIC_SITE_URL` and redirect the other domain to it in Vercel.

## Improvement cadence

| When | What |
|---|---|
| Every PR | CI: lint, typecheck, unit tests, build, production audit, e2e + axe + responsive |
| Weekly (automated) | External links, dependency audit |
| Monthly (15 min) | Vercel deployment health and function errors; update availability; Dependabot/`npm outdated` |
| Quarterly | Re-read every page on a phone; refresh case studies against their repos; remove anything no longer true or useful |

Do not add content just to look active.
