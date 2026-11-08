// The timeline keeps any month details available for each role.
export const workPeriods = {
  debc: { start: [2026, 1], end: null },
  dgc: { start: [2024, 10], end: [2025, 8] },
  mef: { start: [2024, 2], end: [2024, 7] },
  itc: { start: [2023, 7], end: [2023, 10] },
  vectorasoft: { start: [2021], end: [2022] },
} as const;


export const experienceByLanguage = {
  en: [
    {
      title: "Full-stack Developer",
      company: "Digital Economy and Business Committee (DEBC)",
      role: "debc" as const,
      location: "",
      description: "Develop full-stack applications for digital economy initiatives, including business registration. Build responsive interfaces, APIs, and database integrations, and collaborate on testing and deployment.",
      technologies: ["Java Spring Boot", "React", "Next.js", "TypeScript", "PostgreSQL", "Docker", "Git"],
    },
    {
      title: "Full-stack Java Developer",
      company: "General Secretariat of the Digital Government Committee (DGC)",
      role: "dgc" as const,
      location: "Phnom Penh, Cambodia",
      description: "Built microservices and React interfaces for digital government platforms. Automated deployments and implemented SSO, monitoring, and production performance safeguards.",
      technologies: ["Java Spring Boot", "React", "Docker", "Kubernetes", "Jenkins", "PostgreSQL", "Redis"],
    },
    {
      title: "Software Developer",
      company: "Secretariat of Legal Council of the Ministry of Economy and Finance (MEF)",
      role: "mef" as const,
      location: "Phnom Penh, Cambodia",
      description: "Developed RESTful APIs and secured access with Keycloak and OAuth2. Designed database schemas, optimized queries, and integrated external services.",
      technologies: ["Spring Boot", "Keycloak", "PostgreSQL", "MongoDB", "Git", "Docker"],
    },
    {
      title: "Fullstack Developer",
      company: "Institute of Technology of Cambodia (ITC)",
      role: "itc" as const,
      location: "Phnom Penh, Cambodia",
      description: "Built full-stack web applications with responsive, accessible interfaces and RESTful APIs connected to MongoDB and PostgreSQL.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "Material-UI"],
    },
    {
      title: "Web Developer Internship",
      company: "Vectorasoft Company",
      role: "vectorasoft" as const,
      location: "Phnom Penh, Cambodia",
      description: "Built responsive web pages and interactive React components in collaboration with designers and developers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap", "Git"],
    },
  ],
  km: [
    {
      title: "អ្នកអភិវឌ្ឍ Full-stack",
      company: "គណៈកម្មាធិការសេដ្ឋកិច្ច និងធុរកិច្ចឌីជីថល (DEBC)",
      role: "debc" as const,
      location: "",
      description: "អភិវឌ្ឍកម្មវិធី Full-stack សម្រាប់គំនិតផ្តួចផ្តើមសេដ្ឋកិច្ចឌីជីថល ដោយបង្កើតចំណុចប្រទាក់ responsive, APIs និងការភ្ជាប់មូលដ្ឋានទិន្នន័យ។ សហការជាមួយក្រុមលើការធ្វើតេស្ត និងការដាក់ឱ្យប្រើប្រាស់។",
      technologies: ["Java Spring Boot", "React", "Next.js", "TypeScript", "PostgreSQL", "Docker", "Git"],
    },
    {
      title: "អ្នកអភិវឌ្ឍ Java ជាន់ខ្ពស់ និងអ្នកដឹកនាំ DevOps",
      company: "អគ្គលេខាធិការដ្ឋាន គណៈកម្មាធិការរដ្ឋាភិបាលឌីជីថល (DGC)",
      role: "dgc" as const,
      location: "ភ្នំពេញ កម្ពុជា",
      description: "បង្កើត microservices និងចំណុចប្រទាក់ React សម្រាប់វេទិការដ្ឋាភិបាលឌីជីថល។ ធ្វើស្វ័យប្រវត្តិកម្មការដាក់ឱ្យប្រើប្រាស់ និងអនុវត្ត SSO ការត្រួតពិនិត្យ និងការការពារប្រសិទ្ធភាព។",
      technologies: ["Java Spring Boot", "React", "Docker", "Kubernetes", "Jenkins", "PostgreSQL", "Redis"],
    },
    {
      title: "អ្នកអភិវឌ្ឍកម្មវិធី",
      company: "អគ្គលេខាធិការដ្ឋាន សភារដ្ឋប្បវេណី គណៈកម្មាធិការហិរញ្ញវត្ថុ និងសេដ្ឋកិច្ច (MEF)",
      role: "mef" as const,
      location: "ភ្នំពេញ កម្ពុជា",
      description: "អភិវឌ្ឍ RESTful APIs និងការពារការចូលប្រើដោយប្រើ Keycloak និង OAuth2។ រចនាមូលដ្ឋានទិន្នន័យ បង្កើនប្រសិទ្ធភាព queries និងភ្ជាប់សេវាខាងក្រៅ។",
      technologies: ["Spring Boot", "Keycloak", "PostgreSQL", "MongoDB", "Git", "Docker"],
    },
    {
      title: "អ្នកអភិវឌ្ឍ Fullstack",
      company: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា (ITC)",
      role: "itc" as const,
      location: "ភ្នំពេញ កម្ពុជា",
      description: "បង្កើតកម្មវិធីវេប Full-stack ជាមួយចំណុចប្រទាក់ responsive ដែលងាយស្រួលប្រើ និង RESTful APIs ភ្ជាប់ទៅ MongoDB និង PostgreSQL។",
      technologies: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "Material-UI"],
    },
    {
      title: "អ្នកហាត់ការអភិវឌ្ឍគេហទំព័រ",
      company: "ក្រុមហ៊ុន Vectorasoft",
      role: "vectorasoft" as const,
      location: "ភ្នំពេញ កម្ពុជា",
      description: "បង្កើតទំព័រវេប responsive និងគ្រឿង UI អន្តរកម្ម React ដោយសហការជាមួយក្រុមរចនា និងអភិវឌ្ឍន៍។",
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap", "Git"],
    },
  ],
};

export const educationByLanguage = {
  en: [
    {
      degree: "IT Professional Course: Cloud Computing",
      institution: "American University of Phnom Penh (AUPP)",
      period: "Jan 2026 - July 2026",
      description: "Studied AWS cloud foundations, operations, and architecture, including compute, storage, databases, networking, security, monitoring, and cost management. Covered cloud-native development with microservices, Docker, Kubernetes, serverless APIs, and CI/CD automation.",
    },
    {
      degree: "Engineering Degree in Computer Science",
      institution: "Institute of Technology of Cambodia",
      period: "2019 - 2024",
      description: "",
    },
  ],
  km: [
    {
      degree: "វគ្គសិក្សាសម្រាប់អ្នកជំនាញ IT៖ Cloud Computing",
      institution: "សាកលវិទ្យាល័យអាមេរិកាំងភ្នំពេញ (AUPP)",
      period: "មករា 2026 - កក្កដា 2026",
      description: "សិក្សាមូលដ្ឋាន ប្រតិបត្តិការ និងស្ថាបត្យកម្ម AWS Cloud រួមមាន compute, storage, databases, networking សុវត្ថិភាព ការត្រួតពិនិត្យ និងការគ្រប់គ្រងចំណាយ។ សិក្សាការអភិវឌ្ឍ cloud-native ជាមួយ microservices, Docker, Kubernetes, serverless APIs និងស្វ័យប្រវត្តិកម្ម CI/CD។",
    },
    {
      degree: "សញ្ញាបត្រវិស្វករផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ",
      institution: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
      period: "2019 - 2024",
      description: "",
    },
  ],
};

