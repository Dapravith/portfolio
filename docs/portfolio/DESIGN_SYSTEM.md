# Design system

## Direction

Two directions were considered before implementation.

| | A. Editorial engineering document (chosen) | B. Technical spec sheet |
|---|---|---|
| Idea | Reads like a well-set technical paper: serif headings, sans body, a narrow margin column for section labels, hairline rules. | Dense monochrome datasheet: monospace-forward, tables everywhere, Swiss grid. |
| Strength | Warm and readable; long case studies are comfortable; distinct from SaaS templates without gimmicks. | Strong "engineer" signal; very compact. |
| Weakness | Needs disciplined typography to avoid looking like a blog. | Tiring to read on mobile; mono-heavy text drifts toward the "fake terminal" look the brief rules out; Khmer in monospace contexts is poor. |
| Effort / upkeep | Low: a few tokens and five components. | Medium: tables need careful responsive fallbacks. |

**A** was chosen for readability on phones, Khmer support and maintainability. One
element of B was kept: monospace for metadata (dates, stacks, labels), where
alignment and scanability matter.

## Principles in practice

- **Content first.** Projects start in the first scroll on desktop and the second on mobile. No hero animation, no decorative backgrounds.
- **One accent.** Blue (`--accent`) marks links on hover, the active nav item, list bullets and focus rings. Nothing else is coloured.
- **Hierarchy from type, not boxes.** Sections are separated by hairline rules and whitespace; there are no cards with shadows. The only bordered surface is the architecture diagram, because it is a figure.
- **Different content, different layout.** Projects are full-width rows, experience is a dated list, capabilities a 2×2 grid with heavy top rules, technology choices a definition list. They share the margin-label column so the page still reads as one document.
- **No unverifiable decoration.** No counters, proficiency bars, stock illustrations or logo walls.

## Tokens (`src/app/globals.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f4f8fc` | `#0a1221` | Page background (cool paper / deep navy) |
| `--surface` | `#ffffff` | `#111f33` | Form fields, diagram figure, code blocks |
| `--ink` | `#101b2c` | `#edf4fa` | Body text, primary button, heavy rules |
| `--muted` | `#465769` | `#b1c2d2` | Secondary text, labels |
| `--rule` / `--rule-strong` | `#cdd9e4` / `#8195a8` | `#30445d` / `#738ba5` | Dividers / control borders |
| `--accent` | `#174b86` | `#99cbf6` | Links on hover, active state, focus, quote rules |
| `--ok` / `--danger` | `#2c6435` / `#a11d2b` | `#8cc797` / `#f29a9a` | Form feedback |

The owner switched from the original warm/rust palette to this cool/blue one in
November 2026. The hero carries a faint 72px grid (`.hero-panel`) — the only
background texture on the site.

Contrast is enforced by `tests/unit/contrast.test.ts` (text ≥ 4.5:1, body ≥ 7:1).

**Type.** IBM Plex Sans (body, 400/500/600), Source Serif 4 600 (headings),
IBM Plex Mono (metadata), Kantumruy Pro (Khmer). Fluid scale with `clamp()`:
`text-display`, `text-h2`, `text-h3`, `text-lead`, `text-body` (17px),
`text-small`, `text-meta`. Khmer gets line-height 1.85 and no negative tracking
via `:lang(km)`.

**Space and shape.** `--spacing-gutter` (16–32px side padding), `--spacing-section`
(56–104px vertical rhythm), `--container-page` 72rem, `--container-prose` 40rem.
Radii are 2px and 4px only.

**Motion.** Colour transitions of 120ms on hover; nothing animates on scroll.
`prefers-reduced-motion` disables transitions and smooth scrolling.

## Components (`src/components`)

Shared primitives are in `ui/`; page sections are in `home/`, `about/`, `projects/`;
the app shell is in `layout/`. Interactive feature UI (contact form, chat, visitor counter)
lives in `src/features/<name>/components/`.

| Component | Purpose |
|---|---|
| `Section`, `PageHeader` | Margin-label + content grid used by every page |
| `ProjectRow` | Project summary row with case-study and source links (projects index) |
| `WorkItem` | Homepage project entry: Problem / My contribution / Result, stack, links |
| `EngineeringApproach` | Eight-step loop, 4×2 grid with heavy top rules; each step links to evidence |
| `AiEngineering` | Stage table (AI helps with / I stay responsible for) and tool list; table rows stack on mobile |
| `Skills` | Engineering toolkit as a definition list, one row per area, icons beside names |
| `ProjectFilter` (client) | `?category=` filter with `aria-current` and a live count |
| `ArchitectureDiagram` | Tiered system diagram rendered from content data as HTML lists |
| `ContactForm` (client) | Validated form with field errors, focus management, honest status |
| `SiteNav`, `LanguageSwitch`, `ThemeToggle` (client) | Header controls, 44px targets |
| `T` | Renders localized content; marks English fallbacks with `lang="en"` |
| `ExternalLink` | New-tab links with `rel` and a screen-reader hint |

Utility classes in `globals.css`: `.page`, `.label`, `.link`, `.btn`, `.btn-primary`,
`.btn-secondary`, `.tags`, `.bullets`, `.prose-block`, `.lang-label`.

## Anti-slop review gate

Run this for any new section before merging:

1. Does it answer a question a recruiter or engineer actually has?
2. Is every number or claim traceable to the résumé or a repository?
3. Could a decorative element be deleted without losing information?
4. Is the layout justified by the content, or copied from the section above?
5. Does it work at 320px and with Khmer text?
6. Is it still clear with animations off?
