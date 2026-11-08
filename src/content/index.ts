import { z } from 'zod';
import { courses, education, experience } from './experience';
import { profile } from './profile';
import { projects } from './projects';
import {
  capabilitySchema,
  courseSchema,
  educationSchema,
  experienceSchema,
  profileSchema,
  projectSchema,
  skillGroupSchema,
  type Project,
} from './schema';
import { capabilities, skillGroups } from './skills';

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
    capabilities: z.array(capabilitySchema).parse(capabilities),
    projects: z.array(projectSchema).parse(projects),
  };
  const slugs = data.projects.map((p) => p.slug);
  const duplicate = slugs.find((s, i) => slugs.indexOf(s) !== i);
  if (duplicate) throw new Error(`Duplicate project slug: ${duplicate}`);
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

export type { Localized, Project, ProjectCategory } from './schema';
export { projectCategories } from './schema';
