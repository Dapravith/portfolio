import { z } from 'zod';
import { aiPractice, aiTools } from './ai-tools';
import { approach } from './approach';
import { courses, education, experience } from './experience';
import { journal } from './journal';
import { profile } from './profile';
import { projects } from './projects';
import {
  aiPracticeSchema,
  aiToolSchema,
  approachStepSchema,
  courseSchema,
  educationSchema,
  experienceSchema,
  journalEntrySchema,
  profileSchema,
  projectSchema,
  skillGroupSchema,
  type JournalEntry,
  type Project,
} from './schema';
import { skillGroups } from './skills';

/**
 * Parses all content at module load. A typo in content fails `next build`
 * (and the unit tests) instead of shipping a broken page.
 */
function validate() {
  const data = {
    profile: profileSchema.parse(profile),
    experience: z.array(experienceSchema).parse(experience),
    education: z.array(educationSchema).parse(education),
    courses: z.array(courseSchema).parse(courses),
    skillGroups: z.array(skillGroupSchema).parse(skillGroups),
    approach: z.array(approachStepSchema).parse(approach),
    aiTools: z.array(aiToolSchema).parse(aiTools),
    aiPractice: z.array(aiPracticeSchema).parse(aiPractice),
    projects: z.array(projectSchema).parse(projects),
    journal: z.array(journalEntrySchema).parse(journal),
  };
  for (const [kind, slugs] of [
    ['project', data.projects.map((p) => p.slug)],
    ['journal', data.journal.map((j) => j.slug)],
  ] as const) {
    const duplicate = slugs.find((s, i) => slugs.indexOf(s) !== i);
    if (duplicate) throw new Error(`Duplicate ${kind} slug: ${duplicate}`);
  }
  const dates = data.journal.map((j) => j.published);
  if (dates.some((d, i) => i > 0 && d > dates[i - 1])) throw new Error('Journal entries must be newest first');
  return data;
}

export const content = validate();

export function getProject(slug: string): Project | undefined {
  return content.projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return content.projects.filter((p) => p.featured);
}

export function getAdjacentProject(slug: string): Project | undefined {
  const i = content.projects.findIndex((p) => p.slug === slug);
  if (i === -1 || content.projects.length < 2) return undefined;
  return content.projects[(i + 1) % content.projects.length];
}

export function getJournalEntry(slug: string): JournalEntry | undefined {
  return content.journal.find((j) => j.slug === slug);
}

export type { AiUse, ApproachStep, JournalEntry, Localized, Project, ProjectCategory } from './schema';
export { aiUses, projectCategories } from './schema';
