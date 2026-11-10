# Architecture

How `src/` is organised, the rules that keep it maintainable, and where new code goes.
The import rules are enforced by ESLint (`eslint.config.mjs`), so `npm run lint` fails
when a boundary is crossed.

## Layout

```
src/
├── app/                         # Routing only: pages, layouts, metadata, route handlers
│   ├── [locale]/                #   en at /, km at /km (rewritten by proxy.ts)
│   └── api/<name>/route.ts      #   one-line adapters → features/<name>/server/handler.ts
├── features/                    # Vertical slices with client UI + server logic
│   ├── contact/
│   │   ├── schema.ts            #   Zod schema + types shared by client and server
│   │   ├── components/          #   'use client' UI (contact-form)
│   │   └── server/              #   handler (HTTP), deliver (Resend)  — server-only
│   ├── chat/
│   │   ├── schema.ts            #   request schema, MAX_MESSAGES, MAX_QUESTION_LENGTH
│   │   ├── components/          #   chat-assistant, assistant-mark
│   │   └── server/              #   handler, knowledge (prompt + local answers), openai
│   └── analytics/
│       ├── components/          #   view-counter
│       └── server/              #   handler, redis (Upstash REST)
├── components/                  # Presentational Server Components (no I/O)
│   ├── layout/                  #   app shell: site-nav, theme-toggle, phnom-penh-time
│   ├── home/ about/ projects/   #   sections used by one page area
│   └── ui/                      #   primitives shared across areas
├── server/                      # Cross-feature server infrastructure — server-only
│   ├── env.ts                   #   Zod-validated process.env (the only reader of secrets)
│   ├── http.ts                  #   jsonNoStore, clientKey
│   └── rate-limit.ts            #   in-memory fixed-window limiter
├── lib/                         # Pure, isomorphic helpers: site/SEO, json-ld, tech-icons
├── content/                     # Typed, Zod-validated portfolio data (build fails on errors)
├── i18n/                        # Locale config + UI dictionaries (en and km, same keys)
└── proxy.ts                     # Locale routing
```

## Dependency rule

Imports only point **down**:

```
app ──► features ──► components ──► lib ──► content, i18n
            │
            └─ features/<name>/server ──► server
```

| Code in | May import | May not import |
|---|---|---|
| `content/`, `i18n/`, `lib/` | each other | `components`, `features`, `server`, `app` |
| `components/` | `lib`, `content`, `i18n` | `features`, `server`, `app` |
| `features/*/components`, `features/*/schema.ts` | the above + `features/*/schema` | any `server` code, `app` |
| `features/*/server`, `server/` | everything below | any UI, `app` |
| `app/` | everything | — |

Every file under `server/` and `features/*/server/` starts with `import 'server-only'`,
so importing one into a client bundle is a build error as well as a lint error.
Use `@/…` imports everywhere; `../` is a lint error.

## Patterns

**Route handlers are adapters.** `app/api/*/route.ts` sets the runtime and calls the
feature handler. All logic lives in `features/<name>/server/handler.ts`, which takes
a Web `Request` and an optional `deps` object (config, limiter, `fetch`). Unit tests
call the handler directly with fakes, with no network and no env stubbing.

**One schema, two consumers.** `features/<name>/schema.ts` holds the Zod schema and
limits. The client uses it for instant feedback and `maxLength`; the server uses it
as the authority. Never duplicate a limit as a literal.

**Configuration through `serverEnv()`.** Only `server/env.ts` reads `process.env`
(except `NEXT_PUBLIC_SITE_URL` in `lib/site.ts`). Every variable is optional, and blank
counts as unset; a missing provider disables its feature instead of breaking the build.

**Fail closed, degrade gracefully.** Contact returns success only after the provider
accepts the message. Chat falls back to local answers. The counter shows "Unavailable".
Providers are called with `fetch` and an `AbortSignal.timeout`; no SDKs.

**Server Components by default.** `'use client'` only where interaction needs it; the
current list is in `CLAUDE.md`.

## Where does new code go?

| Adding… | Put it in |
|---|---|
| A page | `app/[locale]/<route>/page.tsx`, with UI strings in `i18n/dictionaries.ts` |
| Portfolio data | `content/<topic>.ts` + schema in `content/schema.ts` |
| A section used by one page | `components/<area>/` |
| A component used by two or more areas | `components/ui/` |
| Anything with an API route, provider or client state | `features/<name>/{schema.ts,components,server}` |
| A new environment variable | `server/env.ts` + the table in `OPERATIONS.md` |
| Infrastructure used by several features | `server/` |
| A pure formatting/SEO helper | `lib/` |

No barrel `index.ts` files in `features/`, `components/` or `server/`. Explicit paths
keep server code out of client bundles and make imports easy to search.
(`content/index.ts` is the exception: it is the validation entry point.)
