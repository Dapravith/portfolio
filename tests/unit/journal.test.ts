import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { content, getJournalEntry } from '@/content';

const journalDir = join(process.cwd(), 'src/content/journal');
const projectPaths = new Set(content.projects.map((p) => `/projects/${p.slug}`));
const experienceAnchors = new Set(content.experience.map((e) => `/about#job-${e.id}`));

describe('engineering journal', () => {
  it('has an MDX body for every entry and no orphaned files', () => {
    const files = readdirSync(journalDir).filter((f) => f.endsWith('.mdx'));
    expect(files.sort()).toEqual(content.journal.map((j) => `${j.slug}.mdx`).sort());
    for (const j of content.journal) expect(existsSync(join(journalDir, `${j.slug}.mdx`)), j.slug).toBe(true);
  });

  it('lists entries newest first and resolves by slug', () => {
    const dates = content.journal.map((j) => j.published);
    expect([...dates].sort().reverse()).toEqual(dates);
    expect(getJournalEntry(content.journal[0].slug)).toBeDefined();
    expect(getJournalEntry('missing')).toBeUndefined();
  });

  it('provides Khmer titles and summaries for listing pages', () => {
    for (const j of content.journal) {
      expect(j.title.km, j.slug).toBeTruthy();
      expect(j.summary.km, j.slug).toBeTruthy();
    }
  });
});

describe('engineering approach', () => {
  it('covers the eight-step loop in order', () => {
    expect(content.approach.map((s) => s.id)).toEqual(['analyze', 'design', 'build', 'test', 'review', 'deploy', 'monitor', 'improve']);
  });

  it('points every step at evidence that exists on the site', () => {
    for (const step of content.approach) {
      const { href } = step.evidence;
      const ok = href === '/projects' || projectPaths.has(href) || experienceAnchors.has(href);
      expect(ok, `${step.id} → ${href}`).toBe(true);
    }
  });
});

describe('case studies', () => {
  it('answer problem, role, approach, decisions, challenges, trade-offs, results and lessons', () => {
    for (const p of content.projects) {
      const cs = p.caseStudy;
      expect(cs.approach.en.length, p.slug).toBeGreaterThan(40);
      expect(cs.challenges.length, p.slug).toBeGreaterThan(0);
      expect(cs.tradeoffs.length, p.slug).toBeGreaterThan(0);
      expect(cs.nextSteps.length, p.slug).toBeGreaterThan(0);
      expect(p.brief.problem.km && p.brief.contribution.km && p.brief.result.km, p.slug).toBeTruthy();
    }
  });
});

describe('AI-assisted engineering', () => {
  it('describes every use with a matching responsibility, and every use has a tool', () => {
    const uses = content.aiPractice.map((p) => p.use);
    expect(new Set(uses).size).toBe(uses.length);
    for (const use of uses) expect(content.aiTools.some((t) => t.uses.includes(use)), use).toBe(true);
  });

  it('ships the icon file for every tool', () => {
    for (const tool of content.aiTools) expect(existsSync(join(process.cwd(), 'public', tool.icon)), tool.name).toBe(true);
  });
});
