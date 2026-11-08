import type { Capability, SkillGroup } from './schema';

// Skill lists come from the two resumes in the repository history. No
// proficiency scores: the work history and case studies are the evidence.
export const skillGroups: SkillGroup[] = [
  { id: 'languages', title: { en: 'Languages', km: 'ភាសាសរសេរកម្មវិធី' }, items: ['Java', 'TypeScript', 'JavaScript'] },
  { id: 'backend', title: { en: 'Backend', km: 'Backend' }, items: ['Spring Boot', 'NestJS', 'Node.js', 'Express'] },
  { id: 'frontend', title: { en: 'Frontend', km: 'Frontend' }, items: ['React', 'Next.js', 'Angular'] },
  { id: 'data', title: { en: 'Databases', km: 'មូលដ្ឋានទិន្នន័យ' }, items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
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
      'nginx',
      'Linux',
      'AWS',
    ],
  },
];

export const capabilities: Capability[] = [
  {
    title: { en: 'Backend services', km: 'សេវាកម្ម Backend' },
    body: {
      en: 'REST APIs in Spring Boot for government systems, an internal NestJS service at the Ministry of Economy and Finance, and Express APIs before that.',
      km: 'REST API ជាមួយ Spring Boot សម្រាប់ប្រព័ន្ធរដ្ឋាភិបាល សេវាកម្ម NestJS ផ្ទៃក្នុងនៅក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ និង API ជាមួយ Express មុននោះ។',
    },
    tools: ['Java', 'Spring Boot', 'NestJS', 'PostgreSQL', 'MongoDB'],
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
    tools: ['Jenkins', 'GitLab CI', 'Docker', 'Ansible', 'Trivy', 'SonarQube'],
  },
  {
    title: { en: 'Frontend', km: 'Frontend' },
    body: {
      en: 'Angular for an internal ministry system, React on MERN projects, and Next.js for this site.',
      km: 'Angular សម្រាប់ប្រព័ន្ធផ្ទៃក្នុងរបស់ក្រសួង React លើគម្រោង MERN និង Next.js សម្រាប់គេហទំព័រនេះ។',
    },
    tools: ['Angular', 'React', 'Next.js', 'TypeScript'],
  },
];
