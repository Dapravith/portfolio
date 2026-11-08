import type { Capability, SkillGroup } from './schema';

// Skills come from the owner's résumé and subsequent additions. No proficiency scores.
export const skillGroups: SkillGroup[] = [
  { id: 'languages', title: { en: 'Languages', km: 'ភាសាសរសេរកម្មវិធី' }, items: ['Java', 'TypeScript', 'JavaScript'] },
  { id: 'backend', title: { en: 'Backend', km: 'Backend' }, items: ['Spring Boot', 'Spring WebFlux', 'NestJS', 'Node.js', 'Express'] },
  { id: 'frontend', title: { en: 'Frontend', km: 'Frontend' }, items: ['React', 'Next.js', 'Vue.js', 'Nuxt 4', 'Angular'] },
  { id: 'data', title: { en: 'Databases', km: 'មូលដ្ឋានទិន្នន័យ' }, items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  {
    id: 'engineering',
    title: { en: 'Engineering practices', km: 'ការអនុវត្តការងារវិស្វកម្ម' },
    items: ['System design & architecture', 'System flows', 'Secure & scalable applications', 'Refactoring & logic improvements'],
  },
  {
    id: 'identity',
    title: { en: 'Identity & security', km: 'អត្តសញ្ញាណ និងសុវត្ថិភាព' },
    items: ['Keycloak', 'OAuth 2.0 / OpenID Connect', 'JWT', 'Single sign-on'],
  },
  {
    id: 'delivery',
    title: { en: 'Delivery & infrastructure', km: 'ការដាក់ឱ្យដំណើរការ និងហេដ្ឋារចនាសម្ព័ន្ធ' },
    items: [
      'Docker',
      'Jenkins',
      'GitLab CI',
      'GitHub Actions',
      'Ansible',
      'Terraform',
      'Kubernetes',
      'Grafana',
      'Prometheus',
      'Loki',
      'nginx',
      'Linux',
      'AWS',
    ],
  },
];

// Product and technology names stay the same in both languages.
export const skillItemTranslations: Record<string, string> = {
  'System design & architecture': 'ការរចនា និងស្ថាបត្យកម្មប្រព័ន្ធ',
  'System flows': 'លំហូរប្រព័ន្ធ',
  'Secure & scalable applications': 'កម្មវិធីមានសុវត្ថិភាព និងអាចពង្រីកបាន',
  'Refactoring & logic improvements': 'ការកែលម្អកូដ និង តក្កវិទ្យា',
};

export const capabilities: Capability[] = [
  {
    title: { en: 'Backend services', km: 'សេវាកម្ម Backend' },
    body: {
      en: 'Design system architecture and flows, build secure and scalable backend applications, and refactor logic for clarity and maintainability.',
      km: 'រចនាស្ថាបត្យកម្ម និងលំហូរប្រព័ន្ធ បង្កើតកម្មវិធី backend ដែលមានសុវត្ថិភាព និងអាចពង្រីកបាន ព្រមទាំងកែលម្អកូដ និង logic ឱ្យងាយស្រួលថែទាំ។',
    },
    tools: ['Java', 'Spring Boot', 'Spring WebFlux', 'NestJS', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: { en: 'Identity and access', km: 'អត្តសញ្ញាណ និងសិទ្ធិចូលប្រើ' },
    body: {
      en: 'Keycloak single sign-on over OpenID Connect in two government roles, plus resource-level authorization policies in a personal project.',
      km: 'Keycloak SSO តាម OpenID Connect ក្នុងតួនាទីការងាររដ្ឋាភិបាលពីរ និងគោលការណ៍ផ្តល់សិទ្ធិកម្រិត resource ក្នុងគម្រោងផ្ទាល់ខ្លួន។',
    },
    tools: ['Keycloak', 'OIDC', 'OAuth 2.0', 'JWT'],
  },
  {
    title: { en: 'Delivery and operations', km: 'ការដាក់ឱ្យដំណើរការ និងប្រតិបត្តិការ' },
    body: {
      en: 'Jenkins and GitLab pipelines, Docker deployments, Ansible-provisioned Ubuntu servers, nginx and pm2 in production, and security scanning in CI.',
      km: 'pipeline របស់ Jenkins និង GitLab, ការដាក់ឱ្យដំណើរការជាមួយ Docker, ម៉ាស៊ីនមេ Ubuntu រៀបចំដោយ Ansible, nginx និង pm2 លើ production និងការស្កេនសុវត្ថិភាពក្នុង CI។',
    },
    tools: ['Jenkins', 'GitLab CI', 'Docker', 'Ansible', 'Grafana', 'Prometheus', 'Loki', 'Trivy', 'SonarQube'],
  },
  {
    title: { en: 'Frontend', km: 'Frontend' },
    body: {
      en: 'Frontend development with React, Next.js, Vue.js, Nuxt 4 and Angular.',
      km: 'អភិវឌ្ឍ frontend ជាមួយ React, Next.js, Vue.js, Nuxt 4 និង Angular។',
    },
    tools: ['Angular', 'React', 'Next.js', 'Vue.js', 'Nuxt 4', 'TypeScript'],
  },
];
