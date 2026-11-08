import { z } from 'zod';

/**
 * Every visitor-facing string is `{ en, km? }`. When Khmer is missing the
 * English text is shown with `lang="en"` so screen readers and fonts behave.
 */
export const localized = z.object({
  en: z.string().min(1),
  km: z.string().min(1).optional(),
});
export type Localized = z.infer<typeof localized>;

const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM');
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD');
const ownRepo = z
  .url()
  .refine((u) => u.startsWith('https://github.com/Dapravith/'), 'Repository must be under github.com/Dapravith');

export const profileSchema = z.object({
  name: z.string(),
  role: localized,
  location: localized,
  timezone: z.string(),
  summary: localized,
  lead: localized,
  email: z.email(),
  links: z.object({ github: z.url(), linkedin: z.url() }),
  resume: z.object({ href: z.string().startsWith('/'), sizeKb: z.number().int().positive(), updated: isoDate }),
  availability: z.object({ open: z.boolean(), note: localized, updated: isoDate }),
  photo: z.object({ src: z.string().startsWith('/'), width: z.number(), height: z.number(), alt: localized }),
  languages: z.array(localized),
});
export type Profile = z.infer<typeof profileSchema>;

export const experienceSchema = z.object({
  id: z.string(),
  role: localized,
  org: localized,
  orgShort: z.string(),
  start: yearMonth,
  end: yearMonth.nullable(),
  location: localized,
  summary: localized,
  highlights: z.array(localized).min(1),
  stack: z.array(z.string()).min(1),
});
export type Experience = z.infer<typeof experienceSchema>;

export const educationSchema = z.object({
  credential: localized,
  institution: localized,
  start: yearMonth,
  end: yearMonth,
  note: localized.optional(),
});
export type Education = z.infer<typeof educationSchema>;

export const courseSchema = z.object({ title: z.string(), provider: z.string() });
export type Course = z.infer<typeof courseSchema>;

export const skillGroupSchema = z.object({
  id: z.string(),
  title: localized,
  items: z.array(z.string()).min(1),
});
export type SkillGroup = z.infer<typeof skillGroupSchema>;

export const capabilitySchema = z.object({
  title: localized,
  body: localized,
  tools: z.array(z.string()).min(1),
});
export type Capability = z.infer<typeof capabilitySchema>;

export const projectCategories = ['backend', 'security', 'observability', 'delivery'] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export const projectStatuses = ['runs-locally', 'live', 'archived'] as const;

const diagramSchema = z.object({
  /** Rows drawn top-to-bottom; each row is one tier of the system. */
  tiers: z
    .array(
      z.object({
        label: z.string(),
        nodes: z.array(z.object({ name: z.string(), note: z.string().optional() })).min(1),
      }),
    )
    .min(2),
  /** Plain-language description of each connection, read in order. */
  flows: z.array(z.string()).min(1),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: localized,
  summary: localized,
  year: z.number().int().min(2018).max(2100),
  categories: z.array(z.enum(projectCategories)).min(1),
  stack: z.array(z.string()).min(1),
  repo: ownRepo,
  demo: z.url().optional(),
  status: z.enum(projectStatuses),
  featured: z.boolean(),
  caseStudy: z.object({
    context: localized,
    challenge: localized,
    role: localized,
    architecture: z.object({ summary: localized, diagram: diagramSchema }),
    choices: z.array(z.object({ tech: z.string(), reason: localized })).min(1),
    implementation: z.array(localized).min(1),
    security: z.array(localized).min(1),
    testing: localized,
    limitations: z.array(localized).min(1),
    outcome: localized,
  }),
});
export type Project = z.infer<typeof projectSchema>;
