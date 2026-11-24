import type { StackLayer } from './schema';

// The stack from the browser down to operations. "atWork" lists only tools used
// in a role in experience.ts or on the résumé; "inProjects" lists tools used in
// the owner's public repositories (projects.ts and the GitHub profile).
export const stackLayers: StackLayer[] = [
  {
    id: 'client',
    title: { en: 'Interfaces', km: 'ចំណុចប្រទាក់' },
    atWork: ['Next.js', 'React', 'TypeScript', 'Angular', 'Tailwind CSS'],
    inProjects: ['Vue.js', 'Nuxt', 'Astro'],
  },
  {
    id: 'services',
    title: { en: 'APIs & services', km: 'API និងសេវាកម្ម' },
    atWork: ['Java', 'Spring Boot', 'NestJS', 'Node.js', 'Express'],
    inProjects: ['Spring Cloud Gateway', 'Spring WebFlux', 'Rust (Axum)'],
  },
  {
    id: 'data',
    title: { en: 'Data & messaging', km: 'ទិន្នន័យ និងការផ្ញើសារ' },
    atWork: ['PostgreSQL', 'MongoDB', 'Redis', 'BullMQ', 'MySQL'],
    inProjects: ['Apache Kafka', 'Flyway'],
  },
  {
    id: 'security',
    title: { en: 'Identity & security', km: 'អត្តសញ្ញាណ និងសុវត្ថិភាព' },
    atWork: ['Keycloak', 'OAuth 2.0 / OpenID Connect', 'JWT', 'RBAC'],
    inProjects: ['SonarQube', 'Trivy', 'gitleaks', 'Sealed Secrets'],
  },
  {
    id: 'delivery',
    title: { en: 'Delivery & platform', km: 'ការដាក់ឱ្យប្រើប្រាស់ និងវេទិកា' },
    atWork: ['Docker', 'Jenkins', 'GitLab CI', 'Ansible', 'nginx', 'pm2'],
    inProjects: ['Kubernetes', 'Argo CD', 'Kustomize', 'GitHub Actions', 'Terraform', 'AWS'],
  },
  {
    id: 'observability',
    title: { en: 'Observability', km: 'ការតាមដានប្រព័ន្ធ' },
    atWork: ['Telegram alerting'],
    inProjects: ['Prometheus', 'Grafana', 'Loki', 'Micrometer'],
  },
];
