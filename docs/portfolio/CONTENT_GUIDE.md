# Content guide

All site content lives in `src/content/` as typed TypeScript. It is validated by
Zod when the site builds, so a missing field or a malformed date fails the build
instead of shipping a broken page.

| File | Contents |
|---|---|
| `profile.ts` | Name, role, lead paragraph, summary, email, Telegram, links, résumé file, availability, photo |
| `experience.ts` | Jobs (newest first), education, completed courses |
| `skills.ts` | Skill groups for the About page; four capability blurbs for the home page |
| `projects.ts` | Projects and their case studies |
| `schema.ts` | The rules every entry must satisfy |

UI text (buttons, headings, error messages) lives in `src/i18n/dictionaries.ts`.
The Khmer dictionary must have the same keys as English — a unit test enforces it.

## Rules

1. **Only publish what you can point to.** Job titles and responsibilities come from
   the current résumé. Project descriptions must match the repository. The test
   `tests/unit/content.test.ts` rejects "senior", "lead" or "mentored" in job
   entries and percentage scores in skills; if your résumé changes, update the
   résumé file and the test together.
2. **No confidential employer work.** Government and ministry systems are described
   at the level written on the résumé. Do not add screenshots, internal names,
   architecture or data from those systems.
3. **Forks are not projects.** Only link repositories that are original work.
4. **Limitations are part of a case study.** Keep the "Known limitations" list honest;
   it is what makes the rest credible.

## Common tasks

### Update availability

Edit `profile.availability` in `profile.ts`: set `open`, adjust the note, and set
`updated` to today's date (`YYYY-MM-DD`). The home page shows "as of {date}".
Set `open: false` to hide the status line.

### Replace the résumé

1. Put the PDF at `public/rotha-dapravith-resume.pdf` (keep the name so shared links keep working).
2. Update `profile.resume.sizeKb` and `profile.resume.updated`.
3. Check `experience.ts` still matches the PDF.

### Add a job

Add an entry at the top of `experience` in `experience.ts`. Use `end: null` for a
current role (shown as "present"). Months are `YYYY-MM`; Khmer month names are
generated automatically.

### Add a project

1. Add an object to `projects` in `projects.ts`. The `repo` must be under
   `https://github.com/Dapravith/`.
2. Fill every case-study field. `architecture.diagram.tiers` are rows drawn top to
   bottom (at least two); `flows` are numbered sentences describing the connections.
3. Give `title` and `summary` a Khmer translation (required by a test). Case-study
   body text may stay English-only; Khmer pages label it automatically.
4. Set `featured: true` to show it on the home page (three is a good number).
5. Run `npm test` and `npm run build`. The page appears at `/projects/<slug>` and in the sitemap.

### Khmer translations

Khmer strings were written during the 2026-11 rebuild and **need review by a native
speaker**, especially organisation names in `experience.ts`. The Khmer spelling of
the owner's name is not shown anywhere until confirmed.

## Things the owner should confirm

These are flagged because no source in the repository could verify them:

- The Vectorasoft internship (2022) — present in the original site, not on the current résumé.
- Availability: the last owner-written statement is dated 2025-11-05.
- The résumé ends at September 2025. If there is a newer role (recent repositories
  such as `ebd-*-service` and `access-control-service` suggest ongoing work), add it.
- Case-study "My part" sections describe personal repositories as solo work; adjust
  if any were built with others or from a course.
- `public/rotha-dapravith-resume.pdf` includes two referees' phone numbers and emails.
  Consider a public version without them.
