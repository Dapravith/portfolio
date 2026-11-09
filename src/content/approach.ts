import type { ApproachStep } from './schema';

// The engineering loop. Each step points to a place on this site where the
// claim can be checked: a role (experience.ts, from the résumé) or a case study
// (projects.ts, checked against its repository). Hrefs are locale-independent.
export const approach: ApproachStep[] = [
  {
    id: 'analyze',
    title: { en: 'Analyze', km: 'វិភាគ' },
    body: {
      en: 'Turn a request into requirements, constraints and the failure cases that matter before writing code.',
      km: 'បំប្លែងសំណើទៅជាតម្រូវការ កម្រិតកំណត់ និងករណីបរាជ័យសំខាន់ៗ មុនពេលសរសេរកូដ។',
    },
    evidence: {
      text: { en: 'Feature design and documentation in Scrum sprints at ITC', km: 'ការរចនាមុខងារ និងឯកសារក្នុង sprint តាមវិធី Scrum នៅ ITC' },
      href: '/about#job-itc',
    },
  },
  {
    id: 'design',
    title: { en: 'Design', km: 'រចនា' },
    body: {
      en: 'Decide which component owns which data, where identity is checked and what happens when a dependency fails.',
      km: 'សម្រេចថាសមាសភាគណាជាម្ចាស់ទិន្នន័យណា អត្តសញ្ញាណត្រូវពិនិត្យនៅកន្លែងណា និងអ្វីកើតឡើងពេល dependency បរាជ័យ។',
    },
    evidence: {
      text: { en: 'Gateway, circuit breakers and event-driven writes', km: 'Gateway, circuit breaker និងការសរសេរទិន្នន័យតាម event' },
      href: '/projects/retail-microservices-platform',
    },
  },
  {
    id: 'build',
    title: { en: 'Build', km: 'អភិវឌ្ឍ' },
    body: {
      en: 'Small services with clear interfaces, secured from the start, and refactored when the logic gets hard to follow.',
      km: 'សេវាកម្មតូចៗដែលមានចំណុចប្រទាក់ច្បាស់លាស់ មានសុវត្ថិភាពតាំងពីដំបូង និងកែលម្អនៅពេល logic ពិបាកយល់។',
    },
    evidence: {
      text: { en: 'Spring Boot REST APIs with Keycloak SSO at DGC', km: 'REST API ជាមួយ Spring Boot និង Keycloak SSO នៅ DGC' },
      href: '/about#job-dgc',
    },
  },
  {
    id: 'test',
    title: { en: 'Test', km: 'តេស្ត' },
    body: {
      en: 'Automate the checks that would otherwise be done by hand, and say plainly where tests are still missing.',
      km: 'ធ្វើស្វ័យប្រវត្តិកម្មការពិនិត្យដែលធ្លាប់ធ្វើដោយដៃ ហើយនិយាយឱ្យច្បាស់ថាកន្លែងណានៅខ្វះតេស្ត។',
    },
    evidence: {
      text: { en: 'A deploy that fails its health check fails the build', km: 'ការដាក់ឱ្យដំណើរការដែល health check បរាជ័យ នឹងធ្វើឱ្យ build បរាជ័យ' },
      href: '/projects/devsecops-jenkins-pipeline',
    },
  },
  {
    id: 'review',
    title: { en: 'Review', km: 'ពិនិត្យ' },
    body: {
      en: 'Let quality gates and scanners catch what tools can, so human review can focus on design and behaviour.',
      km: 'ទុកឱ្យ quality gate និងឧបករណ៍ស្កេនរកឃើញអ្វីដែលឧបករណ៍អាចរកបាន ដើម្បីឱ្យការពិនិត្យដោយមនុស្សផ្តោតលើការរចនា និងឥរិយាបថ។',
    },
    evidence: {
      text: { en: 'A SonarQube quality gate that aborts the pipeline', km: 'SonarQube quality gate ដែលបញ្ឈប់ pipeline' },
      href: '/projects/devsecops-jenkins-pipeline',
    },
  },
  {
    id: 'deploy',
    title: { en: 'Deploy', km: 'ដាក់ឱ្យប្រើ' },
    body: {
      en: 'Releases come from pipelines and provisioned servers, so they are repeatable rather than manual.',
      km: 'ការចេញផ្សាយមកពី pipeline និងម៉ាស៊ីនមេដែលរៀបចំដោយស្វ័យប្រវត្តិ ដូច្នេះអាចធ្វើម្តងទៀតបានដូចគ្នា មិនមែនដោយដៃ។',
    },
    evidence: {
      text: { en: 'Jenkins CI/CD and Ansible-provisioned servers at DGC', km: 'Jenkins CI/CD និងម៉ាស៊ីនមេរៀបចំដោយ Ansible នៅ DGC' },
      href: '/about#job-dgc',
    },
  },
  {
    id: 'monitor',
    title: { en: 'Monitor', km: 'តាមដាន' },
    body: {
      en: 'Make every service observable, so a problem shows up on a dashboard before a user reports it.',
      km: 'ធ្វើឱ្យសេវាកម្មនីមួយៗអាចតាមដានបាន ដើម្បីឱ្យបញ្ហាលេចឡើងលើ dashboard មុនពេលអ្នកប្រើរាយការណ៍។',
    },
    evidence: {
      text: { en: 'Prometheus and Grafana across six Spring processes', km: 'Prometheus និង Grafana លើដំណើរការ Spring ប្រាំមួយ' },
      href: '/projects/spring-microservices-monitoring',
    },
  },
  {
    id: 'improve',
    title: { en: 'Improve', km: 'កែលម្អ' },
    body: {
      en: 'Write down known limitations and the next change for each; a documented gap can be scheduled and fixed.',
      km: 'កត់ត្រាដែនកំណត់ដែលដឹង និងការផ្លាស់ប្តូរបន្ទាប់សម្រាប់នីមួយៗ — ចន្លោះខ្វះខាតដែលបានកត់ត្រាអាចរៀបចំផែនការ និងជួសជុលបាន។',
    },
    evidence: {
      text: { en: 'Every case study ends with its limitations and next steps', km: 'ករណីសិក្សានីមួយៗបញ្ចប់ដោយដែនកំណត់ និងជំហានបន្ទាប់' },
      href: '/projects',
    },
  },
];
