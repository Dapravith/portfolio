export const pages = [
  '/',
  '/projects',
  '/projects/retail-microservices-platform',
  '/projects/keycloak-fine-grained-authorization',
  '/projects/spring-microservices-monitoring',
  '/projects/devsecops-jenkins-pipeline',
  '/about',
  '/contact',
];

export const khmerPages = pages.map((p) => (p === '/' ? '/km' : `/km${p}`));

export const viewportWidths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
