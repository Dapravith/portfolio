# Portfolio vNext — Product Requirements Document (PRD)

## 1) Goal & Outcome
- Migrate the portfolio from React + Vite to **Next.js (App Router)**.
- Use **Radix UI primitives (via shadcn/ui) or Origin UI** for a polished, accessible component library.
- Deliver a modern, fast, and recruiter-friendly experience showcasing projects, skills, and contact options.

## 2) Target Users
- Hiring managers and recruiters evaluating full-stack/DevOps candidates.
- Engineering peers viewing project details and technical breadth.
- Prospective collaborators looking for quick contact or social links.

## 3) Success Metrics
- ≤1.5s First Contentful Paint on broadband (desktop) and ≤2.5s on mobile.
- 90+ Lighthouse scores for Performance, Accessibility, and Best Practices.
- Clear primary CTA click-through (View Work / Download Resume / Contact).
- No blocking errors in `npm run build` and smoke-test navigation.

## 4) Scope
**Must have**
- Navigation with active section awareness and resume download.
- Hero with headline, summary, social links, and primary CTAs.
- Projects grid with featured item, tech badges, GitHub/Demo links, and responsive images.
- About/Experience with role highlights, education, and key tools.
- Skills grouped by domain (frontend, backend, DevOps/cloud) with badges.
- Contact section with validated form hitting `/api/contact` and fallback mailto link.
- Theming (light/dark) persisted per user preference.

**Nice to have**
- Inline language toggle and copy powered by the language store.
- Animated/ambient background (particles or gradient) that remains performant.
- React Query data hooks for projects and contact submissions.

**Out of scope (for now)**
- Blog, dashboard/admin, authentication, and database persistence.

## 5) Experience & UX Guidelines
- Use Radix/Origin UI primitives (Buttons, Tabs/Toggle, Dialog/Sheet, Separator) for accessibility and consistency.
- Mobile-first: stacked layout on small screens; graceful scaling on tablet/desktop.
- Provide resilient fallbacks (placeholder images, default copy) to avoid broken states.
- Respect reduced-motion preferences for animations/backgrounds.
- Keep CTAs prominent in Hero and Navbar; ensure keyboard focus outlines are visible.

## 6) Architecture & Stack
- **Framework:** Next.js 16 App Router, TypeScript, React 19.
- **Styling:** Tailwind CSS with design tokens in `app/globals.css`.
- **UI:** shadcn/ui components backed by Radix UI (or Origin UI where appropriate).
- **State/Data:** Zustand for client UI prefs; React Query for server state; Axios service layer; Zod for validation.
- **API:** Next.js API routes (`/api/contact`, `/api/projects`) with middleware for future enhancements.
- **Assets:** Optimized images in `/public`, Next/Image for responsive loading, resume at `/public/resume.pdf`.

## 7) Content Requirements
- Hero: name, title, short value statement, primary CTAs, social links.
- Projects: at least 5 cards; each needs title, description, tech list, image/placeholder, GitHub + demo links, featured flag.
- Experience/About: roles with company, period, location, bullet highlights, education summary.
- Skills: curated stack with icons and categories; highlight DevOps strength.
- Contact: form fields (name/email/message) with validation errors and success/error states.

## 8) Performance, Accessibility, QA
- Use Next/Image for all hero/project imagery.
- Run `npm run build` without errors; linting should surface no accessibility blockers for new UI.
- Test flows: Hero CTAs scroll correctly, resume downloads, contact form validates, project links open in new tabs.
- Minimum WCAG AA: color contrast, focus states, aria labels on interactive icons.

## 9) Milestones
- **M1:** Finalize layout/content structure and theming tokens.
- **M2:** Implement sections with Radix/Origin UI primitives and responsive styles.
- **M3:** Wire data hooks/services; validate contact + projects fetching.
- **M4:** QA (build + smoke), capture screenshot, and publish.

## 10) Acceptance Criteria
- Stack is demonstrably **Next.js + Radix/Origin UI** with documented sections above.
- Live page presents hero, projects, about, skills, and contact without runtime errors.
- Resume download works; contact CTA is functional; theme toggle persists choice.
- Build succeeds; screenshot of updated UI attached to release/PR.
