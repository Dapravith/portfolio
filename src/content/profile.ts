import type { Profile } from './schema';

// Source: public/rotha-dapravith-resume.pdf (resume dated 2025-11-05).
// Khmer copy should be reviewed by a native speaker before each release.
export const profile: Profile = {
  name: 'Rotha Dapravith',
  role: { en: 'Full-stack developer', km: 'អ្នកអភិវឌ្ឍកម្មវិធី Full-Stack' },
  location: { en: 'Phnom Penh, Cambodia', km: 'ភ្នំពេញ ប្រទេសកម្ពុជា' },
  timezone: 'UTC+7',
  lead: {
    en: 'I turn ideas into real, working systems — designing the architecture, building secure backend services with Java Spring Boot, crafting React interfaces and automating delivery to the cloud.',
    km: 'ខ្ញុំប្រែក្លាយគំនិតឱ្យទៅជាប្រព័ន្ធដែលដំណើរការពិតប្រាកដ — ចាប់ពីការរចនាស្ថាបត្យកម្ម ការបង្កើតសេវាកម្ម backend ដែលមានសុវត្ថិភាពជាមួយ Java Spring Boot ការបង្កើតចំណុចប្រទាក់ React រហូតដល់ការដាក់ឱ្យប្រើប្រាស់ដោយស្វ័យប្រវត្តិលើ cloud។',
  },
  summary: {
    en: 'Full-stack developer focused on secure, scalable applications. I work on system architecture and flows, backend services with Spring Boot and WebFlux, and refactoring application logic for maintainability.',
    km: 'អ្នកអភិវឌ្ឍ Full-stack ដែលផ្តោតលើកម្មវិធីមានសុវត្ថិភាព និងអាចពង្រីកបាន។ ខ្ញុំធ្វើការលើស្ថាបត្យកម្ម និងលំហូរប្រព័ន្ធ សេវាកម្ម backend ជាមួយ Spring Boot និង WebFlux ព្រមទាំងកែលម្អ logic ដើម្បីឱ្យងាយស្រួលថែទាំ។',
  },
  email: 'dapravithrotha@gmail.com',
  links: {
    github: 'https://github.com/Dapravith',
    linkedin: 'https://www.linkedin.com/in/rotha-dapravith/',
  },
  // Supplied by the owner on 2026-11-08 for publication.
  telegram: { username: 'dapravith', phone: '+85589937798', phoneDisplay: '+855 89 937 798' },
  resume: { href: '/rotha-dapravith-resume.pdf', sizeKb: 97, updated: '2025-11-05' },
  availability: {
    open: true,
    note: {
      en: 'Open to full-time and contract roles in backend, full-stack or DevOps work — remote, hybrid or on-site.',
      km: 'កំពុងស្វែងរកការងារពេញម៉ោង ឬកិច្ចសន្យា ផ្នែក backend, full-stack ឬ DevOps — ពីចម្ងាយ ចម្រុះ ឬនៅការិយាល័យ។',
    },
    updated: '2025-11-05',
  },
  photo: {
    src: '/profile.jpg',
    width: 480,
    height: 480,
    alt: { en: 'Portrait of Rotha Dapravith', km: 'រូបថតរបស់ Rotha Dapravith' },
  },
  languages: [
    { en: 'Khmer', km: 'ខ្មែរ' },
    { en: 'English', km: 'អង់គ្លេស' },
  ],
};
