import { describe, expect, it } from 'vitest';
import { content, getAdjacentProject, getFeaturedProjects, getProject } from '@/content';
import { getDictionary } from '@/i18n/dictionaries';
import { techIcons } from '@/lib/tech-icons';

const allText = JSON.stringify(content);

/** Every visitor-facing string value (object keys excluded). */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

describe('content', () => {
  it('passes schema validation at import time', () => {
    expect(content.projects.length).toBeGreaterThan(0);
    expect(content.experience.length).toBeGreaterThan(0);
  });

  it('does not claim seniority or leadership titles the résumé does not support', () => {
    // Regression guard: an automated commit once rewrote "Java Developer" as
    // "Senior Java Developer & DevOps Lead". Change this test only together
    // with an updated résumé.
    for (const s of strings(content)) expect(s).not.toMatch(/\bsenior\b/i);
    const claims = [content.profile.role, ...content.experience.flatMap((e) => [e.role, ...e.highlights])].map((l) => l.en);
    for (const c of claims) expect(c).not.toMatch(/\b(lead|leading|led|head|principal|mentor(ed|ing)?)\b/i);
  });

  it('has no invented proficiency scores', () => {
    const skillText = strings([content.skillGroups, content.approach, content.aiTools, content.aiPractice, content.profile]);
    for (const s of skillText) expect(s).not.toMatch(/\d\s?%/);
  });

  it('has an icon for every skill item', () => {
    const missing = content.skillGroups.flatMap((group) => group.items).filter((item) => !techIcons[item]);
    expect(missing).toEqual([]);
  });

  it('lists experience newest first with valid ranges', () => {
    const starts = content.experience.map((e) => e.start);
    expect([...starts].sort().reverse()).toEqual(starts);
    for (const e of content.experience) if (e.end) expect(e.end >= e.start).toBe(true);
  });

  it('links every project to an original repository under the owner account', () => {
    for (const p of content.projects) expect(p.repo).toMatch(/^https:\/\/github\.com\/Dapravith\/[\w.-]+$/);
    expect(content.projects.some((p) => /Tetris/i.test(p.repo))).toBe(false); // a fork, not original work
  });

  it('provides Khmer for every project title and summary', () => {
    for (const p of content.projects) {
      expect(p.title.km, p.slug).toBeTruthy();
      expect(p.summary.km, p.slug).toBeTruthy();
    }
  });

  it('uses one consistent contact email', () => {
    expect(content.profile.email).toBe('dapravithrotha@gmail.com');
    expect(allText).not.toContain('rothadapravith@');
  });

  it('publishes the Telegram contact the owner supplied', () => {
    expect(content.profile.telegram).toEqual({ username: 'dapravith', phone: '+85589937798', phoneDisplay: '+855 89 937 798' });
    expect(content.profile.telegram.phoneDisplay.replace(/\s/g, '')).toBe(content.profile.telegram.phone);
  });

  it('only presents availability claims after explicit owner confirmation', () => {
    const { availability } = content.profile;
    expect(availability.updated).toBe('2025-11-05');
    expect(availability.confirmed).toBe(false);
  });

  it('resolves project helpers', () => {
    expect(getProject('retail-microservices-platform')?.year).toBe(2025);
    expect(getProject('missing')).toBeUndefined();
    expect(getFeaturedProjects().every((p) => p.featured)).toBe(true);
    const first = content.projects[0].slug;
    expect(getAdjacentProject(first)?.slug).toBe(content.projects[1].slug);
  });
});

describe('dictionaries', () => {
  function shape(value: unknown): unknown {
    if (typeof value === 'function') return 'fn';
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
    }
    return typeof value;
  }

  it('Khmer dictionary has exactly the same keys as English', () => {
    expect(shape(getDictionary('km'))).toEqual(shape(getDictionary('en')));
  });

  it('Khmer strings are translated, not copied', () => {
    const en = getDictionary('en');
    const km = getDictionary('km');
    expect(km.nav.about).not.toBe(en.nav.about);
    expect(km.contact.send).not.toBe(en.contact.send);
  });
});
