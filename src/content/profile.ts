import type { Profile } from './schema';

// Source: public/rotha-dapravith-resume.pdf (resume dated 2025-11-05).
// Khmer copy should be reviewed by a native speaker before each release.
export const profile: Profile = {
  name: 'Rotha Dapravith',
  role: { en: 'Full-stack developer', km: 'អ្នកអភិវឌ្ឍកម្មវិធី Full-Stack' },
  location: { en: 'Phnom Penh, Cambodia', km: 'ភ្នំពេញ ប្រទេសកម្ពុជា' },
  timezone: 'UTC+7',
  lead: {
    en: 'I build backend services and the pipelines that ship them — most recently Spring Boot APIs, Keycloak single sign-on and Jenkins deployments at the secretariat of Cambodia’s Digital Government Committee.',
    km: 'ខ្ញុំកសាងសេវាកម្ម backend និង pipeline សម្រាប់ដាក់ឱ្យដំណើរការ — ថ្មីៗនេះគឺ API ជាមួយ Spring Boot, ការចូលប្រើតែមួយ (SSO) ជាមួយ Keycloak និងការដាក់ឱ្យដំណើរការតាម Jenkins នៅអគ្គលេខាធិការដ្ឋាន គណៈកម្មាធិការរដ្ឋាភិបាលឌីជីថល។',
  },
  summary: {
    en: 'Full-stack developer focused on reliable, secure enterprise systems. I work mostly with Java Spring Boot, REST APIs, Keycloak and CI/CD automation, with a working understanding of microservices, containers and Linux operations.',
    km: 'អ្នកអភិវឌ្ឍ Full-Stack ដែលផ្តោតលើប្រព័ន្ធសហគ្រាសដែលអាចទុកចិត្តបាន និងមានសុវត្ថិភាព។ ខ្ញុំធ្វើការភាគច្រើនជាមួយ Java Spring Boot, REST API, Keycloak និងស្វ័យប្រវត្តិកម្ម CI/CD ព្រមទាំងយល់ដឹងពី microservices, container និងការគ្រប់គ្រងម៉ាស៊ីនមេ Linux។',
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
    width: 546,
    height: 457,
    alt: { en: 'Portrait of Rotha Dapravith', km: 'រូបថតរបស់ Rotha Dapravith' },
  },
  languages: [
    { en: 'Khmer', km: 'ខ្មែរ' },
    { en: 'English', km: 'អង់គ្លេស' },
  ],
};
