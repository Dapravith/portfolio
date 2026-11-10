# Roadmap

Ordered by value. Correctness and trust come before visual polish.

## Done (2026-11, branch `claude/wonderful-faraday-3yvpik`)

- [x] Restore truthful titles, dates and stacks from the résumé; remove invented skill percentages and a forked project.
- [x] Real contact delivery (Resend) with honest success/failure states and spam controls; email fallback when unconfigured.
- [x] Remove the AI chat assistant (see decision below) and the in-memory view counter.
- [x] Fix critical/high dependency vulnerabilities; consolidate on Tailwind 4; remove 18 unused dependencies and dead code.
- [x] Server-rendered English and Khmer at separate URLs with hreflang, `<html lang>` and remembered choice.
- [x] Project index with shareable filter; four case studies with architecture diagrams and known limitations.
- [x] Editorial design system, light/dark, reduced motion, 44px targets, WCAG 2.2 AA (axe) on every page.
- [x] Sitemap, robots, canonical URLs, JSON-LD, OG image, security headers.
- [x] 53 unit + 71 e2e tests; CI on every PR; weekly link and dependency check.

## Done (2026-11-09, branch `feat/renovation-site`)

- [x] Selected Work back on the homepage, as Problem → My contribution → Result for four projects.
- [x] Case studies restructured: problem, role, approach, architecture, decisions, implementation, challenges → solutions, security, testing, trade-offs, results, lessons and next steps. New fields restate verified repository facts.
- [x] "How I work": eight-step loop, each step linked to a role or case study as evidence.
- [x] Engineering toolkit in nine areas (no tabs); AI-assisted engineering as its own section with per-stage responsibilities.
- [x] ~~Engineering journal~~ — removed 2026-11-10 to keep the site focused on case studies; `/journal/*` redirects to `/projects`.
- [x] Error boundary for localized pages; monospace fallback fixed for first visits.

## Next

1. **Owner review of content** (blocking for merge). Work through "Things the owner should confirm" in `CONTENT_GUIDE.md`; have a native speaker review Khmer.
2. **Enable the contact form** in Vercel (`OPERATIONS.md`) and send a real test message.
3. **Add any role after September 2025**, and a case study for a recent project if one is ready (candidates seen on GitHub: `crowdfunding-platform`, `task-manager-api`). Each must be checked against its repository like the existing four.
4. **Khmer page CLS 0.14 / LCP up to 2.9 s (lab).** Preload Kantumruy only on `/km` routes — e.g. split into per-locale root layouts, or self-host the Khmer subset and emit a preload link from the Khmer layout.
5. **Field performance data.** Enable Vercel Speed Insights to replace lab estimates with real-user Core Web Vitals.
6. **Public résumé without referees' personal contact details.**
7. **Fix issues the case studies document in the project repos** (e.g. Prometheus path case mismatch, committed Keycloak client secret, Trivy `--exit-code`), then update the "Known limitations" lists. This is the most credible way to show engineering growth.

## Later / only with a reason

- **Case-study translations into Khmer.** Worth doing for the two featured projects once the English text is reviewed.
- **Shared rate-limit store** (Upstash) — only if spam gets through the current controls.

## Decisions

**AI assistant — removed.** It answered general questions ("explain Kubernetes")
that have nothing to do with hiring the owner, claimed to be ChatGPT even when no
key was configured, repeated inflated titles, and forwarded client-supplied system
prompts to a paid API without limits. A visitor's questions about the owner are
answered faster by the pages themselves. Reintroduce only with a narrow purpose
(e.g. answering questions about the case studies from their text), server-side
limits and a cost cap.

**No CMS.** Content changes a few times a year; typed files with build-time
validation are safer and simpler than a hosted CMS.

**No client state libraries.** Language is in the URL, theme is a class on
`<html>`; nothing else is shared state.
