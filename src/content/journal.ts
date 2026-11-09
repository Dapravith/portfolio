import type { JournalEntry } from './schema';

// Engineering journal index, newest first. Each entry needs a matching
// src/content/journal/<slug>.mdx (checked by tests/unit/journal.test.ts).
// Articles are written in English; Khmer pages show them with lang="en".
// Only publish what happened: every fact must be checkable in a repository,
// the résumé or this site's git history.
export const journal: JournalEntry[] = [
  {
    slug: 'contact-form-that-always-said-sent',
    title: {
      en: 'The contact form that always said “sent”',
      km: 'ទម្រង់ទំនាក់ទំនងដែលតែងតែប្រាប់ថា «បានផ្ញើ»',
    },
    summary: {
      en: 'A portfolio contact endpoint returned success for every message and delivered none. How it was found, why it went unnoticed, and the rule the replacement follows.',
      km: 'API ទំនាក់ទំនងរបស់គេហទំព័រឆ្លើយថាជោគជ័យសម្រាប់គ្រប់សារ ប៉ុន្តែមិនបានផ្ញើសារណាមួយទេ។ របៀបដែលរកឃើញ មូលហេតុដែលគ្មាននរណាកត់សម្គាល់ និងច្បាប់ដែលកូដថ្មីអនុវត្ត។',
    },
    published: '2026-11-09',
    kind: 'debugging',
    tags: ['Next.js', 'API design', 'Reliability'],
    readingMinutes: 5,
  },
  {
    slug: 'making-portfolio-claims-testable',
    title: {
      en: 'Making portfolio claims testable',
      km: 'ធ្វើឱ្យព័ត៌មានក្នុងគេហទំព័រអាចតេស្តបាន',
    },
    summary: {
      en: 'An automated commit once gave me a job title and responsibilities I never had. Why this site now stores content as typed data and fails the build when a claim drifts.',
      km: 'commit ស្វ័យប្រវត្តិមួយធ្លាប់ផ្តល់តួនាទី និងការទទួលខុសត្រូវដែលខ្ញុំមិនធ្លាប់មាន។ ហេតុអ្វីបានជាគេហទំព័រនេះរក្សាទុកមាតិកាជាទិន្នន័យមានប្រភេទ ហើយបញ្ឈប់ build នៅពេលព័ត៌មានខុសពីការពិត។',
    },
    published: '2026-11-09',
    kind: 'decision',
    tags: ['TypeScript', 'Zod', 'Testing'],
    readingMinutes: 4,
  },
];
