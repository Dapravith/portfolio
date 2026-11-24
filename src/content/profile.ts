import type { Profile } from './schema';

// Source: public/rotha-dapravith-resume.pdf (resume dated 2026-11-24; earlier content from the 2025-11-05 version).
// Khmer copy should be reviewed by a native speaker before each release.
export const profile: Profile = {
  name: 'Rotha Dapravith',
  role: { en: 'Full-stack developer & DevOps engineer', km: 'អ្នកអភិវឌ្ឍកម្មវិធី Full-Stack និងវិស្វករ DevOps' },
  location: { en: 'Phnom Penh, Cambodia', km: 'ភ្នំពេញ ប្រទេសកម្ពុជា' },
  timezone: 'UTC+7',
  lead: {
    en: "I build Cambodia's public digital services end to end: Spring Boot and NestJS APIs, React and Next.js frontends, and the CI/CD, containers and monitoring that keep them running.",
    km: 'ខ្ញុំកសាងសេវាកម្មឌីជីថលសាធារណៈរបស់កម្ពុជាពីដើមដល់ចប់៖ API ជាមួយ Spring Boot និង NestJS, frontend ជាមួយ React និង Next.js ព្រមទាំង CI/CD, container និងការតាមដានប្រព័ន្ធ ដែលធ្វើឱ្យវាដំណើរការជាប់លាប់។',
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
  resume: { href: '/rotha-dapravith-cv.pdf', sizeKb: 126, updated: '2026-11-24' },
  availability: {
    open: true,
    // Manually verify the status with the owner before setting to true.
    // The 2025-11-05 note is historical and must not be presented as current.
    confirmed: false,
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
