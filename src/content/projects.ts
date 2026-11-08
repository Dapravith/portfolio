import type { Project } from './schema';

// Every statement below was checked against the linked repository on
// 2026-11-08 (build files, configuration and source). Case-study bodies are
// English-only for now; Khmer pages show them with lang="en".
// Excluded on purpose: End-to-End-Kubernetes-DevSecOps-Tetris-Project is a
// fork of a third-party tutorial, not original work.
export const projects: Project[] = [
  {
    slug: 'retail-microservices-platform',
    title: { en: 'Retail microservices platform', km: 'វេទិកា microservices សម្រាប់ការលក់រាយ' },
    summary: {
      en: 'A Spring Cloud Gateway in front of product and invoice services, with Keycloak-issued JWTs, per-route circuit breakers and Kafka for asynchronous product creation.',
      km: 'Spring Cloud Gateway នៅពីមុខសេវាកម្មផលិតផល និងវិក្កយបត្រ ជាមួយ JWT ពី Keycloak, circuit breaker តាម route នីមួយៗ និង Kafka សម្រាប់បង្កើតផលិតផលដោយមិនរង់ចាំ។',
    },
    year: 2025,
    categories: ['backend', 'security'],
    stack: ['Java', 'Spring Cloud Gateway', 'Keycloak', 'Kafka', 'Resilience4j', 'OpenFeign', 'PostgreSQL', 'Flyway', 'Docker'],
    repo: 'https://github.com/Dapravith/microservices-enterprise-system',
    status: 'runs-locally',
    featured: true,
    caseStudy: {
      context: {
        en: 'A personal project for practising how a small retail back office splits into services: a product catalogue, invoicing, and one gateway that every client request passes through. It runs locally with Docker; there is no public deployment.',
      },
      challenge: {
        en: 'Give clients a single authenticated entry point while keeping the services independent, stop one slow or failing service from tying up the gateway, and accept product-creation requests quickly even when the product service is busy.',
      },
      role: {
        en: 'Personal project. I wrote the gateway, the product and invoice services, their database migrations and the local Docker and Kafka setup.',
      },
      architecture: {
        summary: {
          en: 'Clients only talk to the gateway. It validates the Keycloak token, rewrites the path and forwards the request to the owning service through a circuit breaker. Writes that can be processed later go onto a Kafka topic instead of a synchronous call.',
        },
        diagram: {
          tiers: [
            { label: 'Client', nodes: [{ name: 'API client', note: 'Swagger UI, Postman or a frontend' }] },
            {
              label: 'Edge',
              nodes: [
                { name: 'Spring Cloud Gateway', note: 'JWT check · circuit breakers · trace IDs' },
                { name: 'Keycloak', note: 'issues tokens for the retail realm' },
              ],
            },
            {
              label: 'Services',
              nodes: [
                { name: 'product-service', note: 'catalogue · Kafka consumer' },
                { name: 'invoice-service', note: 'invoices · Feign client to products' },
              ],
            },
            {
              label: 'Data & messaging',
              nodes: [
                { name: 'PostgreSQL', note: 'one Flyway-managed schema per service' },
                { name: 'Kafka', note: 'topic new-products · 3 local brokers' },
              ],
            },
          ],
          flows: [
            'The client gets an access token from Keycloak and calls the gateway with it.',
            'The gateway verifies the token against Keycloak’s published keys, then routes /product-service/** and /invoice-service/** to the matching service.',
            'Each route is wrapped in a Resilience4j circuit breaker; while it is open, requests go to a fallback endpoint instead of waiting.',
            'POST /v1/async/product publishes to the new-products topic and returns 202 Accepted; product-service consumes the event and saves it in a transaction.',
            'invoice-service reads product data through an OpenFeign client.',
          ],
        },
      },
      choices: [
        {
          tech: 'Spring Cloud Gateway',
          reason: { en: 'Routing, authentication and resilience rules live in gateway configuration instead of being repeated in each service.' },
        },
        { tech: 'Keycloak', reason: { en: 'A standard OpenID Connect provider, so services trust signed tokens rather than managing users.' } },
        {
          tech: 'Resilience4j',
          reason: { en: 'One circuit breaker per route (opens at a 50% failure rate over a 10-call window), so a failing service fails fast.' },
        },
        { tech: 'Kafka', reason: { en: 'Decouples product creation from the request that asks for it.' } },
        { tech: 'Flyway', reason: { en: 'Versioned SQL migrations, so each service owns and evolves its own schema.' } },
        { tech: 'OpenFeign', reason: { en: 'A declarative client for the one synchronous call between services.' } },
      ],
      implementation: [
        {
          en: 'The gateway is configured almost entirely in YAML: each route has a path rewrite and a named circuit breaker. A global filter takes the current trace ID from Micrometer Tracing, adds it to the logging context and returns it in an X-Trace-ID response header, so an error a client reports can be matched to server logs.',
        },
        {
          en: 'Security is a resource-server setup. Every path except /actuator/** needs a valid JWT, and authentication failures go through a custom entry point that returns a consistent JSON error body.',
        },
        {
          en: 'Each service has its own Dockerfile and Spring profiles for local and container runs. One Compose file starts a three-broker Kafka cluster with ZooKeeper; another starts Keycloak with Prometheus.',
        },
      ],
      security: [
        { en: 'Tokens are verified against Keycloak’s signing keys; services never handle passwords.' },
        { en: 'Only the health and prometheus actuator endpoints are exposed, for health checks and metrics scraping.' },
        { en: 'Circuit breakers and a fixed-backoff retry template (three attempts, two seconds apart) limit the impact of a slow dependency.' },
      ],
      testing: {
        en: 'Each service has a Spring Boot context-load test, which catches wiring and configuration errors but not behaviour. API flows are checked by hand through Swagger UI and Postman.',
      },
      limitations: [
        { en: 'The gateway has a route to a user-service that is not part of this repository.' },
        { en: 'There are no behavioural tests yet, and the CI workflow the README describes is not committed.' },
        { en: 'The asynchronous endpoint answers 202 before the event is processed and offers no status endpoint, so a client cannot find out whether creation succeeded.' },
        { en: 'Local configuration files are committed; a real deployment would load credentials from a secret store.' },
      ],
      outcome: {
        en: 'One runnable repository that shows token validation at the edge, per-route circuit breakers, trace IDs returned to clients and an event-driven write path.',
      },
    },
  },
  {
    slug: 'keycloak-fine-grained-authorization',
    title: { en: 'Fine-grained authorization with Keycloak', km: 'ការផ្តល់សិទ្ធិលម្អិតជាមួយ Keycloak' },
    summary: {
      en: 'A Spring Boot restaurant-ordering API where Keycloak Authorization Services decide access per resource and HTTP method, instead of role checks spread across controllers.',
      km: 'API បញ្ជាទិញអាហារជាមួយ Spring Boot ដែល Keycloak Authorization Services សម្រេចសិទ្ធិចូលប្រើតាម resource និង HTTP method ជំនួសឱ្យការពិនិត្យ role នៅក្នុង controller នីមួយៗ។',
    },
    year: 2024,
    categories: ['security', 'backend'],
    stack: ['Java 21', 'Spring Boot', 'Spring Security', 'Keycloak', 'PostgreSQL', 'Docker Compose'],
    repo: 'https://github.com/Dapravith/springboot-sso-keycloak',
    status: 'runs-locally',
    featured: true,
    caseStudy: {
      context: {
        en: 'Single sign-on tells an API who the caller is, not what they may do. This project moves those decisions into Keycloak for a small restaurant domain: public menus, staff-managed restaurants and customer orders.',
      },
      challenge: {
        en: 'Express rules such as “anyone can read menus”, “only staff can change a restaurant” and “users can only read their own profile” without hard-coding role checks in every controller, and keep them changeable without a redeploy.',
      },
      role: {
        en: 'Personal project. I wrote the Spring Boot API and its security configuration, and exported the Keycloak realm and Docker Compose setup so it can be recreated.',
      },
      architecture: {
        summary: {
          en: 'Spring Security runs as a stateless bearer-token resource server. Once a token is accepted, Keycloak’s policy-enforcer filter asks Keycloak whether this path and HTTP method are allowed, using the resources and policies stored in the realm.',
        },
        diagram: {
          tiers: [
            { label: 'Client', nodes: [{ name: 'Browser or API client' }] },
            { label: 'Identity', nodes: [{ name: 'Keycloak', note: 'realm dive-dev · Authorization Services' }] },
            {
              label: 'API',
              nodes: [
                { name: 'Spring Security', note: 'bearer token · no sessions' },
                { name: 'Policy enforcer', note: 'path + method → permission' },
                { name: 'Controllers', note: '/restaurant · /order · /keycloak/users' },
              ],
            },
            { label: 'Data', nodes: [{ name: 'PostgreSQL', note: 'restaurants · menus · orders' }] },
          ],
          flows: [
            'The client signs in through Keycloak and sends the access token as a bearer token.',
            'Spring Security validates the token; no HTTP session is created.',
            'The policy enforcer maps the path to a Keycloak resource and the HTTP method to a scope, then asks Keycloak for a decision.',
            'Public paths such as /restaurant/public/** and the API docs skip enforcement. /keycloak/users/{userId} passes the request URI as a claim so a policy can compare it with the caller.',
            'Allowed requests reach the controllers, which use Spring Data repositories on PostgreSQL.',
          ],
        },
      },
      choices: [
        { tech: 'Keycloak Authorization Services', reason: { en: 'Policies live in the identity server and can change without redeploying the API.' } },
        { tech: 'HTTP method as scope', reason: { en: 'GET, POST and PUT become separate permissions on one resource with no extra code.' } },
        { tech: 'Claim information point', reason: { en: 'Feeds request data (the URI) into policy evaluation for ownership-style rules.' } },
        { tech: 'Stateless sessions', reason: { en: 'Every request carries its own token, so instances can be added without sticky sessions.' } },
        { tech: 'Docker Compose', reason: { en: 'Keycloak and PostgreSQL start with one command, and the realm is imported from a JSON export.' } },
      ],
      implementation: [
        {
          en: 'SecurityConfig adds Keycloak’s ServletPolicyEnforcerFilter after Spring’s BearerTokenAuthenticationFilter and turns sessions off. The enforcer reads a JSON file on the classpath that lists protected and public paths.',
        },
        {
          en: 'User and role operations go through the Keycloak admin client, wrapped in small resource classes, so the API manages identities through the same server that issues tokens.',
        },
        { en: 'The realm, clients and authorization settings are exported to keycloak/realm-export.json.' },
      ],
      security: [
        { en: 'Default deny: any path not explicitly marked public is checked by Keycloak.' },
        { en: 'CSRF protection is off because the API is stateless and authenticates with bearer tokens, not cookies.' },
        { en: 'Ownership rules are Keycloak policies driven by the request URI, not controller code.' },
      ],
      testing: {
        en: 'The repository contains a Spring Boot context-load test. The authorization rules themselves have no automated tests yet.',
      },
      limitations: [
        { en: 'The client secret for the local realm is committed in policy-enforcer.json; it should come from environment configuration.' },
        { en: 'No automated tests cover the policies, so a realm change could silently open or close a path.' },
      ],
      outcome: {
        en: 'A runnable example of keeping authorization decisions in Keycloak rather than in application code, covering public paths, per-method permissions and a URI-based ownership check.',
      },
    },
  },
  {
    slug: 'spring-microservices-monitoring',
    title: { en: 'Metrics for Spring microservices', km: 'ការតាមដាន metrics សម្រាប់ Spring microservices' },
    summary: {
      en: 'Inventory, order and cart services registered with Eureka and configured from a Config Server, each exposing Micrometer metrics that Prometheus scrapes and Grafana charts.',
      km: 'សេវាកម្មស្តុក ការបញ្ជាទិញ និងរទេះទំនិញ ចុះឈ្មោះជាមួយ Eureka ទាញការកំណត់ពី Config Server ហើយបញ្ចេញ metrics តាម Micrometer ដែល Prometheus ប្រមូល និង Grafana បង្ហាញជាក្រាហ្វ។',
    },
    year: 2025,
    categories: ['observability', 'backend'],
    stack: ['Java', 'Spring Boot', 'Eureka', 'Spring Cloud Config', 'Spring Cloud Gateway', 'Micrometer', 'Prometheus', 'Grafana'],
    repo: 'https://github.com/Dapravith/Springboot-microservices-monitoring',
    status: 'runs-locally',
    featured: true,
    caseStudy: {
      context: {
        en: 'A small e-commerce-shaped system used to practise running several Spring services together and seeing what each of them is doing.',
      },
      challenge: {
        en: 'With six processes running, it is hard to tell which one is slow or down. The goal was one place to see request rates, latencies and JVM health for every service.',
      },
      role: { en: 'Personal project. I wrote the services, the Prometheus scrape configuration and the Grafana dashboard.' },
      architecture: {
        summary: {
          en: 'Services pull configuration from the Config Server and register with Eureka at startup. Each exposes /actuator/prometheus; Prometheus scrapes them every 15 seconds and Grafana reads from Prometheus.',
        },
        diagram: {
          tiers: [
            { label: 'Edge', nodes: [{ name: 'api-gateway', note: 'Spring Cloud Gateway' }] },
            {
              label: 'Platform',
              nodes: [
                { name: 'service-registry', note: 'Eureka server' },
                { name: 'configserver', note: 'Spring Cloud Config, native profile' },
              ],
            },
            {
              label: 'Services',
              nodes: [{ name: 'inventory-service' }, { name: 'order-service' }, { name: 'cart-service' }],
            },
            {
              label: 'Observability',
              nodes: [
                { name: 'Prometheus', note: '15 s scrape interval' },
                { name: 'Grafana', note: 'dashboard committed as JSON' },
              ],
            },
          ],
          flows: [
            'On startup each service imports its configuration from the Config Server and registers with Eureka.',
            'Every service exposes Micrometer metrics at /actuator/prometheus.',
            'Prometheus runs in Docker and scrapes the services on the host every 15 seconds, labelling each series with the application name.',
            'Grafana uses Prometheus as its data source; the dashboard is committed as Grafana_Dashboard.json.',
          ],
        },
      },
      choices: [
        { tech: 'Eureka', reason: { en: 'Services find each other by name, so ports can change without editing every caller.' } },
        { tech: 'Spring Cloud Config', reason: { en: 'Shared configuration in one place instead of copied into each service.' } },
        { tech: 'Micrometer + Actuator', reason: { en: 'Standard JVM and HTTP metrics with no custom instrumentation code.' } },
        { tech: 'Prometheus', reason: { en: 'Pull-based scraping: a service that stops responding shows up as a failed target, not silence.' } },
        { tech: 'Grafana', reason: { en: 'Dashboards kept as JSON next to the code they describe.' } },
      ],
      implementation: [
        {
          en: 'Each service is its own Gradle project with the Actuator and the Micrometer Prometheus registry on the runtime classpath. Scrape targets and labels are declared in Prometheus/Prometheus.yml.',
        },
        {
          en: 'Prometheus and Grafana run in Docker Compose while the Spring services run on the host and are reached through host.docker.internal.',
        },
      ],
      security: [
        { en: 'Actuator endpoints are reachable without authentication. That is acceptable on a laptop; anywhere shared they belong on a separate management port or behind authentication.' },
        { en: 'Grafana’s admin credentials are set in the Compose file and are for local use only.' },
      ],
      testing: {
        en: 'Each service includes the generated context-load test. The monitoring configuration has no automated checks.',
      },
      limitations: [
        { en: 'The Compose file mounts ./prometheus/prometheus.yml, but the file is committed as Prometheus/Prometheus.yml. On case-sensitive file systems such as Linux the paths must match.' },
        { en: 'Grafana’s runtime database and plugin files are committed alongside the dashboard JSON; only the JSON needs to be versioned.' },
        { en: 'Images use the latest tag, so a fresh pull can change behaviour.' },
        { en: 'Metrics only — no distributed tracing or log aggregation yet.' },
      ],
      outcome: {
        en: 'A compact, reproducible example of service discovery, central configuration and metrics collection across several Spring services.',
      },
    },
  },
  {
    slug: 'devsecops-jenkins-pipeline',
    title: { en: 'DevSecOps pipeline with Jenkins', km: 'Pipeline DevSecOps ជាមួយ Jenkins' },
    summary: {
      en: 'A Jenkins pipeline on AWS EC2 that stops on a failed SonarQube quality gate, scans source and image with Trivy, then deploys the container and health-checks it.',
      km: 'Pipeline Jenkins លើ AWS EC2 ដែលឈប់នៅពេល SonarQube quality gate បរាជ័យ ស្កេនកូដ និង image ជាមួយ Trivy រួចដាក់ container ឱ្យដំណើរការ និងពិនិត្យ health។',
    },
    year: 2026,
    categories: ['delivery', 'security'],
    stack: ['Jenkins', 'SonarQube', 'Trivy', 'Docker', 'Node.js', 'Express', 'AWS EC2'],
    repo: 'https://github.com/Dapravith/Task12-DevSecOps-Jenkins-SonarQube-Docker-Trivy',
    status: 'archived',
    featured: false,
    caseStudy: {
      context: {
        en: 'A structured DevOps exercise: take a small Express API from a commit to a running container, with security checks built into the release path rather than run as a separate report.',
      },
      challenge: {
        en: 'Make code quality, vulnerability scanning and a post-deploy check part of every build, so problems are visible before — not after — the container is running.',
      },
      role: {
        en: 'The repository holds my Jenkinsfile, Dockerfile and a step-by-step guide to setting up the Jenkins and SonarQube servers on EC2.',
      },
      architecture: {
        summary: {
          en: 'Two Ubuntu EC2 instances: one runs Jenkins with Docker and Trivy, the other runs SonarQube. Jenkins sends analysis to SonarQube and waits for its webhook with the quality-gate result before continuing.',
        },
        diagram: {
          tiers: [
            { label: 'Source', nodes: [{ name: 'GitHub repository' }] },
            {
              label: 'CI server (EC2)',
              nodes: [
                { name: 'Jenkins', note: 'declarative pipeline, 12 stages' },
                { name: 'Trivy', note: 'runs as a container, cached DB' },
                { name: 'Docker' },
              ],
            },
            { label: 'Analysis (EC2)', nodes: [{ name: 'SonarQube', note: 'quality gate · webhook to Jenkins' }] },
            { label: 'Runtime', nodes: [{ name: 'NodeAPI container', note: 'port 8000 · /health' }] },
          ],
          flows: [
            'Jenkins clones the repository and checks that Node.js, npm and Docker are available.',
            'Dependencies are installed and SonarScanner sends the analysis to SonarQube.',
            'The pipeline waits for SonarQube’s quality-gate webhook and aborts if the gate fails.',
            'Trivy scans the file system, the image is built, and Trivy scans the image.',
            'The container starts and the pipeline calls /health; the build fails if the check does not pass.',
          ],
        },
      },
      choices: [
        { tech: 'SonarQube quality gate', reason: { en: 'Turns code-quality findings into a pass/fail decision on the release.' } },
        { tech: 'Trivy', reason: { en: 'One scanner for vulnerable dependencies, secrets and misconfiguration in both source and image.' } },
        { tech: 'Separate SonarQube server', reason: { en: 'Keeps SonarQube’s memory needs away from the build agent.' } },
        { tech: 'node:22-alpine, non-root', reason: { en: 'A small base image and an unprivileged user reduce what an attacker gets from a compromised process.' } },
      ],
      implementation: [
        {
          en: 'The Jenkinsfile is a declarative pipeline of twelve stages. Trivy runs as a container with the vulnerability database cached on the agent, so scans don’t download it every time.',
        },
        {
          en: 'The Dockerfile installs production dependencies with npm ci, runs as an unprivileged user and declares a HEALTHCHECK against /health.',
        },
      ],
      security: [
        { en: 'waitForQualityGate abortPipeline: true stops the release when SonarQube’s gate fails.' },
        { en: 'The container runs as a non-root user.' },
        { en: 'Security groups limit SSH and the Jenkins and SonarQube interfaces to known addresses, as documented in the setup guide.' },
      ],
      testing: {
        en: 'The health-check stage is the automated verification: the build fails if the deployed container does not answer on /health. The sample API has no unit tests.',
      },
      limitations: [
        { en: 'Trivy reports findings of every severity but is not configured with --exit-code, so vulnerabilities are visible in the log without failing the build.' },
        { en: 'Deployment is a docker run on the Jenkins server itself; there is no separate environment or rollback step.' },
        { en: 'Trivy and SonarQube images use the latest tag, so results can change between runs without a code change.' },
      ],
      outcome: {
        en: 'An end-to-end pipeline in which code quality and runtime health gate the deployment and both source and image are scanned on every build.',
      },
    },
  },
];
