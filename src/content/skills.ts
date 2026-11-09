import type { SkillGroup } from './schema';

// Grouped by engineering area. Every item is backed by the résumé, a role in
// experience.ts, a linked repository or this site's own code. No proficiency scores.
export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: { en: 'Frontend', km: 'Frontend' },
    items: ['React', 'Next.js', 'TypeScript', 'Angular', 'Vue.js', 'Nuxt 4'],
  },
  {
    id: 'backend',
    title: { en: 'Backend', km: 'Backend' },
    items: ['Java', 'Spring Boot', 'Spring WebFlux', 'NestJS', 'Node.js', 'Express'],
  },
  { id: 'data', title: { en: 'Databases', km: 'មូលដ្ឋានទិន្នន័យ' }, items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Flyway'] },
  {
    id: 'architecture',
    title: { en: 'Architecture', km: 'ស្ថាបត្យកម្ម' },
    items: ['System design & architecture', 'Microservices', 'Spring Cloud Gateway', 'Eureka', 'Apache Kafka', 'Resilience4j'],
  },
  {
    id: 'devops',
    title: { en: 'DevOps', km: 'DevOps' },
    items: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Ansible', 'Terraform', 'nginx', 'pm2', 'Linux'],
  },
  { id: 'cloud', title: { en: 'Cloud', km: 'Cloud' }, items: ['AWS'] },
  { id: 'testing', title: { en: 'Testing', km: 'ការធ្វើតេស្ត' }, items: ['JUnit', 'Vitest', 'Playwright'] },
  {
    id: 'security',
    title: { en: 'Security', km: 'សុវត្ថិភាព' },
    items: ['Keycloak', 'OAuth 2.0 / OpenID Connect', 'JWT', 'Single sign-on', 'Spring Security', 'SonarQube', 'Trivy'],
  },
  {
    id: 'observability',
    title: { en: 'Observability', km: 'ការតាមដានប្រព័ន្ធ' },
    items: ['Prometheus', 'Grafana', 'Loki', 'Micrometer'],
  },
];

// Product and technology names stay the same in both languages.
export const skillItemTranslations: Record<string, string> = {
  'System design & architecture': 'ការរចនា និងស្ថាបត្យកម្មប្រព័ន្ធ',
  'Single sign-on': 'Single sign-on (SSO)',
};
