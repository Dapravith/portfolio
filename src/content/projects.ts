import type { Project } from './schema';

// Every statement below was checked against the linked repository on
// 2026-11-08 (build files, configuration and source). The 2026-11-09 fields
// (brief, approach, challenges, tradeoffs, nextSteps) restate those verified
// facts in problem → solution form; they add no new claims. Case-study bodies are
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
    brief: {
      problem: {
        en: 'One authenticated entry point for several services, without one slow service dragging the others down.',
        km: 'ច្រកចូលតែមួយដែលមានការផ្ទៀងផ្ទាត់សម្រាប់សេវាកម្មច្រើន ដោយមិនឱ្យសេវាកម្មយឺតមួយធ្វើឱ្យសេវាកម្មផ្សេងទៀតយឺតតាម។',
      },
      contribution: {
        en: 'Built the gateway, both services, their migrations and the local Kafka and Keycloak setup.',
        km: 'បង្កើត gateway សេវាកម្មទាំងពីរ migration របស់វា និងការរៀបចំ Kafka និង Keycloak សម្រាប់ដំណើរការលើម៉ាស៊ីន។',
      },
      result: {
        en: 'Token checks at the edge, a circuit breaker per route, trace IDs returned to clients and an event-driven write path.',
        km: 'ការពិនិត្យ token នៅ gateway, circuit breaker សម្រាប់ route នីមួយៗ, trace ID ផ្ញើត្រឡប់ទៅ client និងការសរសេរទិន្នន័យតាម event។',
      },
    },
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
      approach: {
        en: 'The design puts each concern in one place. Identity is checked once, at the edge. Failure isolation is a gateway rule per route, not code in every caller. Work that can wait goes onto a Kafka topic instead of a synchronous call. Each service owns its schema through its own Flyway migrations, so services can change independently.',
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
      challenges: [
        {
          problem: { en: 'A slow or failing service can hold gateway requests open and spread the failure to every client.' },
          solution: { en: 'A Resilience4j circuit breaker per route opens at a 50% failure rate over a 10-call window and sends requests to a fallback endpoint instead of waiting.' },
        },
        {
          problem: { en: 'An error a client reports is hard to match to the right lines in several services’ logs.' },
          solution: { en: 'A global gateway filter puts the Micrometer trace ID into the logging context and returns it in an X-Trace-ID response header.' },
        },
        {
          problem: { en: 'Product creation should not depend on the product service being responsive at the moment of the request.' },
          solution: { en: 'POST /v1/async/product publishes to the new-products topic and returns 202 Accepted; product-service consumes the event and saves it in a transaction.' },
        },
        {
          problem: { en: 'Clients need a predictable error when a token is missing or invalid.' },
          solution: { en: 'A custom authentication entry point returns the same JSON error body for every authentication failure.' },
        },
      ],
      tradeoffs: [
        {
          choice: { en: 'Asynchronous product creation through Kafka' },
          cost: { en: 'The client gets 202 before the event is processed and, without a status endpoint, cannot learn whether creation succeeded.' },
        },
        {
          choice: { en: 'A single gateway as the only entry point' },
          cost: { en: 'Every request takes an extra hop, and the gateway itself becomes a component that has to stay available.' },
        },
        {
          choice: { en: 'A three-broker Kafka cluster for local runs' },
          cost: { en: 'Closer to a real cluster’s behaviour, but heavier to start on a laptop than a single broker.' },
        },
      ],
      limitations: [
        { en: 'The gateway has a route to a user-service that is not part of this repository.' },
        { en: 'There are no behavioural tests yet, and the CI workflow the README describes is not committed.' },
        { en: 'The asynchronous endpoint answers 202 before the event is processed and offers no status endpoint, so a client cannot find out whether creation succeeded.' },
        { en: 'Local configuration files are committed; a real deployment would load credentials from a secret store.' },
      ],
      nextSteps: [
        { en: 'Add a status endpoint for asynchronous writes so a client can confirm the outcome.' },
        { en: 'Write behavioural tests for routing, fallbacks and the token check, and commit the CI workflow the README describes.' },
        { en: 'Load credentials from the environment or a secret store instead of committed local configuration.' },
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
    brief: {
      problem: {
        en: 'Decide who may do what — per resource and HTTP method — without role checks in every controller.',
        km: 'កំណត់ថាអ្នកណាអាចធ្វើអ្វីបាន — តាម resource និង HTTP method — ដោយមិនចាំបាច់ពិនិត្យ role នៅក្នុង controller នីមួយៗ។',
      },
      contribution: {
        en: 'Wrote the Spring Boot API and its security configuration, and exported the Keycloak realm so the setup can be recreated.',
        km: 'សរសេរ API ជាមួយ Spring Boot និងការកំណត់សុវត្ថិភាព ហើយ export realm របស់ Keycloak ដើម្បីអាចបង្កើតឡើងវិញបាន។',
      },
      result: {
        en: 'Default-deny authorization decided by Keycloak policies, including a URI-based ownership check.',
        km: 'ការផ្តល់សិទ្ធិដែលបដិសេធជាលំនាំដើម សម្រេចដោយគោលការណ៍ Keycloak រួមទាំងការពិនិត្យភាពជាម្ចាស់ផ្អែកលើ URI។',
      },
    },
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
      approach: {
        en: 'Authorization is treated as configuration, not code. Resources, scopes and policies are defined in the Keycloak realm; the API only enforces the decision. The realm is exported to JSON and started with Docker Compose, so the whole setup can be recreated from the repository.',
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
      challenges: [
        {
          problem: { en: 'Role checks spread across controllers are hard to audit, and changing one needs a redeploy.' },
          solution: { en: 'Keycloak’s ServletPolicyEnforcerFilter runs after Spring’s bearer-token filter; each path maps to a Keycloak resource and each HTTP method to a scope.' },
        },
        {
          problem: { en: '“Users can only read their own profile” depends on the request, not just on the caller’s role.' },
          solution: { en: 'A claim information point passes the request URI into policy evaluation, so a Keycloak policy can compare it with the caller.' },
        },
        {
          problem: { en: 'Menus and API docs must stay public while everything else is protected.' },
          solution: { en: 'The enforcer configuration lists public paths explicitly; any path not listed is checked by Keycloak (default deny).' },
        },
      ],
      tradeoffs: [
        {
          choice: { en: 'Authorization decisions in Keycloak' },
          cost: { en: 'Protected requests depend on Keycloak’s policy evaluation, and the rules live outside the codebase where code review does not see them.' },
        },
        {
          choice: { en: 'Stateless sessions with CSRF protection off' },
          cost: { en: 'Instances can be added without sticky sessions, but the API must not move to cookie-based authentication without turning CSRF protection back on.' },
        },
      ],
      limitations: [
        { en: 'The client secret for the local realm is committed in policy-enforcer.json; it should come from environment configuration.' },
        { en: 'No automated tests cover the policies, so a realm change could silently open or close a path.' },
      ],
      nextSteps: [
        { en: 'Move the client secret out of policy-enforcer.json into environment configuration.' },
        { en: 'Add integration tests that call each protected path as different users, so a realm change that opens or closes a path fails the build.' },
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
    brief: {
      problem: {
        en: 'With six processes running, tell which one is slow or down.',
        km: 'ពេលមានដំណើរការប្រាំមួយកំពុងដំណើរការ ត្រូវដឹងថាមួយណាយឺត ឬឈប់ដំណើរការ។',
      },
      contribution: {
        en: 'Wrote the services, the Prometheus scrape configuration and the Grafana dashboard.',
        km: 'សរសេរសេវាកម្ម ការកំណត់ scrape របស់ Prometheus និង dashboard របស់ Grafana។',
      },
      result: {
        en: 'Request rates, latencies and JVM health for every service in one dashboard.',
        km: 'អត្រាសំណើ ពេលវេលាឆ្លើយតប និងសុខភាព JVM នៃសេវាកម្មនីមួយៗ នៅក្នុង dashboard តែមួយ។',
      },
    },
    caseStudy: {
      context: {
        en: 'A small e-commerce-shaped system used to practise running several Spring services together and seeing what each of them is doing.',
      },
      challenge: {
        en: 'With six processes running, it is hard to tell which one is slow or down. The goal was one place to see request rates, latencies and JVM health for every service.',
      },
      role: { en: 'Personal project. I wrote the services, the Prometheus scrape configuration and the Grafana dashboard.' },
      approach: {
        en: 'Every service exposes the same Actuator metrics endpoint, so adding a service to monitoring is one scrape target rather than new code. Discovery and configuration are centralised the same way, through Eureka and the Config Server.',
      },
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
      challenges: [
        {
          problem: { en: 'With six processes, it is hard to tell which one is slow or down.' },
          solution: { en: 'Prometheus scrapes /actuator/prometheus on every service every 15 seconds and labels each series with the application name; one Grafana dashboard reads them all.' },
        },
        {
          problem: { en: 'Hard-coded ports break callers whenever a service moves.' },
          solution: { en: 'Services register with Eureka at startup and find each other by name.' },
        },
        {
          problem: { en: 'Prometheus and Grafana run in Docker, while the services run on the host.' },
          solution: { en: 'Scrape targets point at host.docker.internal, so the containers can reach the host processes.' },
        },
      ],
      tradeoffs: [
        {
          choice: { en: 'Pull-based scraping every 15 seconds' },
          cost: { en: 'Values are sampled, so a short-lived change between two scrapes is not recorded, and Prometheus must be able to reach every service.' },
        },
        {
          choice: { en: 'Services on the host, monitoring in Docker' },
          cost: { en: 'Fast to iterate on a service, but the system is not one reproducible Compose stack.' },
        },
        {
          choice: { en: 'Metrics only' },
          cost: { en: 'A dashboard shows that something is slow, not which call in a request chain caused it.' },
        },
      ],
      limitations: [
        { en: 'The Compose file mounts ./prometheus/prometheus.yml, but the file is committed as Prometheus/Prometheus.yml. On case-sensitive file systems such as Linux the paths must match.' },
        { en: 'Grafana’s runtime database and plugin files are committed alongside the dashboard JSON; only the JSON needs to be versioned.' },
        { en: 'Images use the latest tag, so a fresh pull can change behaviour.' },
        { en: 'Metrics only — no distributed tracing or log aggregation yet.' },
      ],
      nextSteps: [
        { en: 'Fix the case of the Prometheus configuration path so the stack runs on Linux.' },
        { en: 'Version only the dashboard JSON, and pin image tags.' },
        { en: 'Add distributed tracing so a slow request can be followed across services.' },
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
    featured: true,
    brief: {
      problem: {
        en: 'Catch quality and security problems before a container runs, not after.',
        km: 'រកឃើញបញ្ហាគុណភាព និងសុវត្ថិភាព មុនពេល container ដំណើរការ មិនមែនក្រោយ។',
      },
      contribution: {
        en: 'Wrote the Jenkinsfile, the Dockerfile and a setup guide for the Jenkins and SonarQube servers on EC2.',
        km: 'សរសេរ Jenkinsfile, Dockerfile និងការណែនាំរៀបចំម៉ាស៊ីនមេ Jenkins និង SonarQube លើ EC2។',
      },
      result: {
        en: 'A failed quality gate or health check stops the release; source and image are scanned on every build.',
        km: 'quality gate ឬ health check ដែលបរាជ័យនឹងបញ្ឈប់ការចេញផ្សាយ ហើយកូដ និង image ត្រូវបានស្កេនរាល់ការ build។',
      },
    },
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
      approach: {
        en: 'The pipeline is the release gate: every check runs in the same declarative pipeline and can stop it, in a fixed order — tool checks, quality gate, file-system scan, image build and scan, then deploy and health check.',
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
      challenges: [
        {
          problem: { en: 'SonarQube analyses asynchronously, so a pipeline can move on before the quality-gate result exists.' },
          solution: { en: 'The pipeline waits for SonarQube’s webhook with waitForQualityGate and abortPipeline: true.' },
        },
        {
          problem: { en: 'Trivy downloads its vulnerability database on every run.' },
          solution: { en: 'Trivy runs as a container with the database cached on the agent.' },
        },
        {
          problem: { en: 'A container can start and still not serve requests.' },
          solution: { en: 'The Dockerfile declares a HEALTHCHECK, and the pipeline calls /health after deploying and fails the build if it does not pass.' },
        },
        {
          problem: { en: 'SonarQube’s memory needs compete with builds on the same machine.' },
          solution: { en: 'SonarQube runs on its own EC2 instance and reports back to Jenkins.' },
        },
      ],
      tradeoffs: [
        {
          choice: { en: 'A separate SonarQube server' },
          cost: { en: 'Two instances to provision, secure and pay for instead of one.' },
        },
        {
          choice: { en: 'Deploying with docker run on the Jenkins server' },
          cost: { en: 'Simple to follow, but there is no separate environment and no rollback step.' },
        },
        {
          choice: { en: 'Scanner images on the latest tag' },
          cost: { en: 'Always the newest rules, but results can change between runs without a code change.' },
        },
      ],
      limitations: [
        { en: 'Trivy reports findings of every severity but is not configured with --exit-code, so vulnerabilities are visible in the log without failing the build.' },
        { en: 'Deployment is a docker run on the Jenkins server itself; there is no separate environment or rollback step.' },
        { en: 'Trivy and SonarQube images use the latest tag, so results can change between runs without a code change.' },
      ],
      nextSteps: [
        { en: 'Make Trivy fail the build on high and critical findings with --exit-code.' },
        { en: 'Deploy to a separate environment with a rollback step.' },
        { en: 'Pin scanner image versions so results only change when the pipeline does.' },
      ],
      outcome: {
        en: 'An end-to-end pipeline in which code quality and runtime health gate the deployment and both source and image are scanned on every build.',
      },
    },
  },
];
