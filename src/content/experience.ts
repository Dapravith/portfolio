import type { Course, Education, Experience } from './schema';

// Source: resume dated 2025-11-05. The Vectorasoft internship comes from the
// owner's original site copy (commit 439d5b9); it is not on the current resume.
// DEBC and the AUPP course were supplied by the owner in November 2026.
// Newest first.
export const experience: Experience[] = [
  {
    id: 'debc',
    role: { en: 'Full-stack Developer', km: 'អ្នកអភិវឌ្ឍកម្មវិធីអ៊ិនធឺណិត' },
    org: { en: 'Digital Economy and Business Committee', km: 'អគ្គលេខាធិការដ្ឋាន គណៈកម្មាធិការសេដ្ឋកិច្ច និងធុរកិច្ចឌីជីថល' },
    orgShort: 'DEBC',
    start: '2026-01',
    end: null,
    location: { en: 'Phnom Penh', km: 'ភ្នំពេញ' },
    summary: {
      en: 'Full-stack applications for digital economy initiatives, including business registration.',
      km: 'កម្មវិធី Full-stack សម្រាប់គំនិតផ្តួចផ្តើមសេដ្ឋកិច្ចឌីជីថល រួមទាំងការចុះបញ្ជីអាជីវកម្ម។',
    },
    highlights: [
      { en: 'Build responsive interfaces, APIs and database integrations.', km: 'បង្កើតចំណុចប្រទាក់ responsive, API និងការភ្ជាប់មូលដ្ឋានទិន្នន័យ។' },
      { en: 'Collaborate on testing and deployment.', km: 'សហការជាមួយក្រុមលើការធ្វើតេស្ត និងការដាក់ឱ្យប្រើប្រាស់។' },
    ],
    stack: ['Java Spring Boot', 'React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Git'],
  },
  {
    id: 'dgc',
    role: { en: 'Java Developer', km: 'អ្នកអភិវឌ្ឍកម្មវិធីផ្នែកខាងក្រោយ Java' },
    org: {
      en: 'General Secretariat of the Digital Government Committee',
      km: 'អគ្គលេខាធិការដ្ឋាន គណៈកម្មាធិការរដ្ឋាភិបាលឌីជីថល',
    },
    orgShort: 'DGC',
    start: '2024-10',
    end: '2025-09',
    location: { en: 'Phnom Penh', km: 'ភ្នំពេញ' },
    summary: {
      en: 'Spring Boot APIs, Keycloak single sign-on and automated Jenkins deployments for government systems.',
      km: 'API ជាមួយ Spring Boot, SSO ជាមួយ Keycloak និងការដាក់ឱ្យដំណើរការស្វ័យប្រវត្តិតាម Jenkins សម្រាប់ប្រព័ន្ធរដ្ឋាភិបាល។',
    },
    highlights: [
      {
        en: 'Built and deployed RESTful APIs with Spring Boot, improving system performance and response times.',
        km: 'បង្កើត និងដាក់ឱ្យដំណើរការ RESTful API ជាមួយ Spring Boot ដែលធ្វើឱ្យប្រព័ន្ធដំណើរការ និងឆ្លើយតបបានលឿនជាងមុន។',
      },
      {
        en: 'Integrated Keycloak single sign-on (OpenID Connect) for authentication and access control.',
        km: 'ភ្ជាប់ Keycloak SSO (OpenID Connect) សម្រាប់ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ និងការគ្រប់គ្រងសិទ្ធិចូលប្រើ។',
      },
      {
        en: 'Automated deployments with Jenkins CI/CD so releases were repeatable.',
        km: 'ធ្វើស្វ័យប្រវត្តិកម្មការដាក់ឱ្យដំណើរការជាមួយ Jenkins CI/CD ដើម្បីឱ្យការចេញផ្សាយមានភាពស្របគ្នា។',
      },
      {
        en: 'Provisioned Ubuntu servers with Ansible to simplify environment setup.',
        km: 'រៀបចំម៉ាស៊ីនមេ Ubuntu ដោយប្រើ Ansible ដើម្បីសម្រួលការរៀបចំបរិស្ថាន។',
      },
      {
        en: 'Worked with the frontend and DevOps teams on stability and performance monitoring.',
        km: 'សហការជាមួយក្រុម frontend និង DevOps លើស្ថិរភាព និងការតាមដានដំណើរការប្រព័ន្ធ។',
      },
    ],
    stack: ['Java', 'Spring Boot', 'Keycloak', 'OpenID Connect', 'Jenkins', 'Ansible', 'Ubuntu'],
  },
  {
    id: 'mef',
    role: { en: 'Software Developer and DevOps Engineer Interned', km: 'កម្មសិក្សា អ្នកអភិវឌ្ឍកម្មវិធី និង DevOps Engineer' },
    org: {
      en: 'Secretariat of the Legal Council, Ministry of Economy and Finance',
      km: 'លេខាធិការដ្ឋាន ក្រុមប្រឹក្សានិតិកម្ម នៃ ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ',
    },
    orgShort: 'MEF',
    start: '2024-02',
    end: '2024-07',
    location: { en: 'Phnom Penh', km: 'ភ្នំពេញ' },
    summary: {
      en: 'An internal Angular and NestJS system with Keycloak SSO, deployed through Docker, GitLab and Jenkins.',
      km: 'ប្រព័ន្ធផ្ទៃក្នុងជាមួយ Angular និង NestJS ភ្ជាប់ Keycloak SSO ដាក់ឱ្យដំណើរការតាម Docker, GitLab និង Jenkins។',
    },
    highlights: [
      {
        en: 'Developed an internal system with Angular and NestJS, integrated with Keycloak SSO.',
        km: 'អភិវឌ្ឍប្រព័ន្ធផ្ទៃក្នុងជាមួយ Angular និង NestJS ដោយភ្ជាប់ជាមួយ Keycloak SSO។',
      },
      {
        en: 'Managed containerised deployments with Docker and GitLab/Jenkins pipelines.',
        km: 'គ្រប់គ្រងការដាក់ឱ្យដំណើរការជា container ជាមួយ Docker និង pipeline របស់ GitLab/Jenkins។',
      },
      {
        en: 'Configured nginx and pm2 for load balancing and production reliability.',
        km: 'កំណត់រចនាសម្ព័ន្ធ nginx និង pm2 សម្រាប់ការបែងចែកបន្ទុក និងភាពជឿជាក់នៅលើ production។',
      },
      {
        en: 'Supported operations by automating test and monitoring environments.',
        km: 'គាំទ្រប្រតិបត្តិការដោយធ្វើស្វ័យប្រវត្តិកម្មបរិស្ថានសាកល្បង និងការតាមដាន។',
      },
    ],
    stack: ['Angular', 'NestJS', 'Keycloak', 'Docker', 'GitLab CI', 'Jenkins', 'nginx', 'pm2'],
  },
  {
    id: 'itc',
    role: { en: 'Full-stack Developer', km: 'អ្នកអភិវឌ្ឍកម្មវិធីអ៊ិនធឺណិត' },
    org: { en: 'Institute of Technology of Cambodia', km: 'វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា' },
    orgShort: 'ITC',
    start: '2023-06',
    end: '2023-11',
    location: { en: 'Phnom Penh', km: 'ភ្នំពេញ' },
    summary: {
      en: 'A delivery-management system on the MERN stack, containerised and built with GitLab CI.',
      km: 'ប្រព័ន្ធគ្រប់គ្រងការដឹកជញ្ជូនលើ MERN stack ដាក់ជា container និង build ជាមួយ GitLab CI។',
    },
    highlights: [
      {
        en: 'Developed a delivery-management system on the MERN stack.',
        km: 'អភិវឌ្ឍប្រព័ន្ធគ្រប់គ្រងការដឹកជញ្ជូនលើ MERN stack។',
      },
      {
        en: 'Built Express.js APIs secured with JWT and consumed by React frontends.',
        km: 'បង្កើត API ជាមួយ Express.js ការពារដោយ JWT ហើយប្រើប្រាស់ដោយ frontend React។',
      },
      {
        en: 'Containerised the apps with Docker and automated builds with GitLab CI/CD.',
        km: 'ដាក់កម្មវិធីជា container ជាមួយ Docker និងធ្វើស្វ័យប្រវត្តិកម្ម build ជាមួយ GitLab CI/CD។',
      },
      {
        en: 'Contributed to feature design and documentation in Scrum sprints.',
        km: 'ចូលរួមរចនាមុខងារ និងសរសេរឯកសារក្នុង sprint តាមវិធី Scrum។',
      },
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Docker', 'GitLab CI'],
  },
  {
    id: 'vectorasoft',
    role: { en: 'Web Developer Interned', km: 'កម្មសិក្សាអ្នកអភិវឌ្ឍគេហទំព័រ' },
    org: { en: 'Vectorasoft', km: 'ក្រុមហ៊ុន Vectorasoft' },
    orgShort: 'Vectorasoft',
    start: '2022-07',
    end: '2022-10',
    location: { en: 'Phnom Penh', km: 'ភ្នំពេញ' },
    summary: {
      en: 'Internship building responsive pages and React UI components.',
      km: 'កម្មសិក្សាបង្កើតគេហទំព័រដែលឆ្លើយតបតាមឧបករណ៍ និងសមាសភាគ UI ជាមួយ React។',
    },
    highlights: [
      {
        en: 'Built responsive pages with HTML, CSS and JavaScript.',
        km: 'បង្កើតគេហទំព័រដែលឆ្លើយតបតាមឧបករណ៍ ជាមួយ HTML, CSS និង JavaScript។',
      },
      {
        en: 'Built interactive UI components with React.',
        km: 'បង្កើតសមាសភាគ UI អន្តរកម្មជាមួយ React។',
      },
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap'],
  },
];

export const education: Education[] = [
  {
    credential: { en: 'IT Professional Course: Cloud Computing', km: 'វគ្គសិក្សាសម្រាប់អ្នកជំនាញ IT៖ Cloud Computing' },
    institution: { en: 'American University of Phnom Penh (AUPP)', km: 'សាកលវិទ្យាល័យអាមេរិកាំងភ្នំពេញ (AUPP)' },
    start: '2026-01', end: '2026-07',
    note: { en: 'AWS foundations, cloud architecture and operations, microservices, Docker, Kubernetes, serverless APIs and CI/CD.', km: 'មូលដ្ឋាន AWS ស្ថាបត្យកម្ម និងប្រតិបត្តិការ Cloud, microservices, Docker, Kubernetes, serverless APIs និង CI/CD។' },
  },
  {
    credential: {
      en: 'Engineer’s degree in Computer Science',
      km: 'សញ្ញាបត្រវិស្វករ ផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ',
    },
    institution: { en: 'Institute of Technology of Cambodia', km: 'វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា' },
    start: '2019-11',
    end: '2024-07',
    note: {
      en: 'Department of Information and Communication Engineering',
      km: 'ដេប៉ាតឺម៉ង់វិស្វកម្មព័ត៌មានវិទ្យា និងទំនាក់ទំនង',
    },
  },
];

export const courses: Course[] = [
  { title: 'Master Microservices with Spring Boot, Docker, Kubernetes', provider: 'Udemy' },
  { title: 'Spring Security 6 Zero to Master along with JWT, OAuth2', provider: 'Udemy' },
  { title: 'The Ultimate DevOps Bootcamp', provider: 'Udemy' },
  { title: 'The Complete Full-Stack Web Development Bootcamp', provider: 'Udemy' },
];
