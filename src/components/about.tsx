"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  SiAmazonwebservices,
  SiDocker,
  SiJenkins,
  SiKubernetes,
  SiNodedotjs,
  SiReact,
  SiSpring,
  SiTypescript
} from "react-icons/si";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/store/languageStore";

const aboutContent = {
  en: {
    sectionTitle: "About Me",
    subtitle: "Senior engineer blending full-stack delivery with DevOps reliability",
    whoIAmTitle: "Who I Am",
    whoIAmParagraphs: [
      "I'm a senior full-stack developer and DevOps engineer focused on building scalable enterprise systems. I lead end-to-end delivery from architecture to deployment across Java Spring Boot, React, and cloud-native stacks.",
      "I champion automation, observability, and secure delivery. Outside coding, I refine CI/CD pipelines, explore cloud platforms, and mentor teams on resilient engineering practices.",
    ],
    whatIDoTitle: "What I Do",
    whatIDo: [
      "Architect and deliver full-stack platforms with Java Spring Boot & React",
      "Design microservices and API contracts with reliability and security in mind",
      "Automate delivery with Docker, Kubernetes, and CI/CD pipelines",
      "Implement identity, observability, and performance tuning for production",
    ],
    experienceTitle: "Professional Experience",
    responsibilitiesLabel: "Key Outcomes",
    technologiesLabel: "Technologies Used",
    educationTitle: "Education",
  },
  km: {
    sectionTitle: "អំពីខ្ញុំ",
    subtitle: "វិស្វករជាន់ខ្ពស់ផ្នែក Full-Stack និង DevOps ដែលរចនាវេទិកាសហគ្រាសទំនើប",
    whoIAmTitle: "ខ្លួនខ្ញុំគឺ",
    whoIAmParagraphs: [
      "ខ្ញុំជាវិស្វករអភិវឌ្ឍ Full-Stack និង DevOps ជាន់ខ្ពស់ ដែលគ្រប់គ្រងការរចនាស្ថាបត្យកម្មអាចពង្រីកបាន សុវត្ថិភាព និងអាចពឹងផ្អែកបានសម្រាប់អង្គភាពធំៗ។ ការងាររបស់ខ្ញុំបម្រើចាប់ពីការរចនារហូតដល់ការចែកចាយជាមួយ Java Spring Boot, React/Next.js និងស្ថាបត្យកម្ម cloud-native។",
      "ខ្ញុំដឹកនាំបណ្តាញ CI/CD មានសុវត្ថិភាព ស្វ័យប្រវត្តិកម្ម infra ជាមួយ Docker/Kubernetes និងធ្វើ DevSecOps ដោយផ្តោតលើ observability និងភាពជឿជាក់។ ខាងក្រៅការសរសេរកូដ ខ្ញុំនាំទិសក្រុម និងចែករំលែកល្អប្រសើររបស់ស្ថាបត្យកម្មទំនើប។",
    ],
    whatIDoTitle: "អ្វីដែលខ្ញុំធ្វើ",
    whatIDo: [
      "រចនា និងដឹកនាំស្ថាបត្យកម្ម microservices និង API ដែលមានសុវត្ថិភាព និងអាចពង្រីកបាន",
      "បង្កើត វាស់វែង និងធ្វើ harden CI/CD pipelines ជាមួយ Docker, Kubernetes និង Jenkins/GitHub Actions",
      "ដំណើរការបច្ចេកទេសអត្តសញ្ញាណ ការផ្តល់សិទ្ធិ សុវត្ថិភាព និងការត្រួតពិនិត្យសម្រាប់ផលិតកម្ម",
      "ធ្វើ performance tuning និង observability (logging/metrics/tracing) សម្រាប់បំពេញ SLA/SLO",
    ],
    experienceTitle: "បទពិសោធន៍ការងារ",
    responsibilitiesLabel: "លទ្ធផលសំខាន់",
    technologiesLabel: "បច្ចេកវិទ្យាប្រើប្រាស់",
    educationTitle: "ការសិក្សា",
  },
};

const experienceByLanguage = {
  en: [
    {
      title: "Senior Java Developer & DevOps Lead",
      company: "General Secretariat of the Digital Government Committee (DGC)",
      period: "Oct 2024 - Aug 2025",
      location: "Phnom Penh, Cambodia",
      description:
        "Leading digital government platforms with Spring Boot and React while hardening CI/CD for secure, observable releases across Kubernetes.",
      responsibilities: [
        "Architect and deliver microservices for national digital services using Java Spring Boot",
        "Lead DevOps enablement with Docker, Kubernetes, and Jenkins pipelines",
        "Implement SSO, monitoring, and performance guardrails for production workloads",
        "Mentor developers on code quality, platform standards, and delivery best practices",
      ],
      technologies: ["Java Spring Boot", "React", "Docker", "Kubernetes", "Jenkins", "PostgreSQL", "Redis"],
    },
    {
      title: "Software Developer",
      company: "Secretariat of Legal Council of the Ministry of Economy and Finance (MEF)",
      period: "Feb 2024 - July 2024",
      location: "Phnom Penh, Cambodia",
      description:
        "Delivered secure RESTful services and identity flows for finance solutions using Spring Boot and Keycloak.",
      responsibilities: [
        "Develop and maintain RESTful APIs with Spring Boot and PostgreSQL",
        "Implement authentication and authorization with Keycloak and OAuth2",
        "Design and optimize database schemas and query performance",
        "Integrate external services and strengthen automated testing practices",
      ],
      technologies: ["Spring Boot", "Keycloak", "PostgreSQL", "MongoDB", "Git", "Docker"],
    },
    {
      title: "Fullstack Developer",
      company: "Institute of Technology of Cambodia (ITC)",
      period: "July 2023 - Oct 2023",
      location: "Phnom Penh, Cambodia",
      description:
        "Built responsive user interfaces and APIs with React and Node.js, focusing on reliable delivery for campus projects.",
      responsibilities: [
        "Develop full-stack web applications using React and Node.js",
        "Create RESTful APIs with Express.js and secure data flows",
        "Design responsive UI components with accessibility in mind",
        "Collaborate through code reviews and iterative delivery",
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "Material-UI"],
    },
    {
      title: "Web Developer Internship",
      company: "Vectorasoft Company",
      period: "July 2022 - Oct 2022",
      location: "Phnom Penh, Cambodia",
      description:
        "Learned modern web fundamentals and contributed to UI components with HTML, CSS, JavaScript, and React.",
      responsibilities: [
        "Develop responsive web pages using HTML5, CSS3, and JavaScript",
        "Create interactive UI components using React.js",
        "Collaborate with designers and developers to refine requirements",
        "Adopt web development best practices for maintainable code",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap", "Git"],
    },
  ],
  km: [
    {
      title: "អ្នកអភិវឌ្ឍ Java ជាន់ខ្ពស់ និងអ្នកដឹកនាំ DevOps",
      company: "អគ្គលេខាធិការដ្ឋាន គណៈកម្មាធិការរដ្ឋាភិបាលឌីជីថល (DGC)",
      period: "តុលា 2024 - សីហា 2025",
      location: "ភ្នំពេញ កម្ពុជា",
      description:
        "ដឹកនាំស្ថាបត្យកម្ម និងការចែកចាយវេទិការដ្ឋាភិបាលឌីជីថលលើ Kubernetes ជាមួយ Spring Boot/React ព្រមទាំងសម្រួល DevSecOps pipeline ឲ្យមានភាពឆាប់រហ័ស និងអាចមើលឃើញបាន។",
      responsibilities: [
        "រៀបចំស្ថាបត្យកម្ម microservices សម្រាប់សេវារដ្ឋាភិបាលឌីជីថលលើ Spring Boot",
        "ដឹកនាំ DevOps enablement ជាមួយ Docker/Kubernetes និង Jenkins pipelines ដែលមានសុវត្ថិភាព",
        "អនុវត្ត SSO observability និង guardrails ប្រសិទ្ធភាព/សុវត្ថិភាពសម្រាប់ភារៈការផលិតកម្ម",
        "ណែនាំក្រុមអភិវឌ្ឍន៍អំពីស្តង់ដារកូដ ស្តង់ដារ platform និងការចែកចាយចប់ចុង",
      ],
      technologies: ["Java Spring Boot", "React", "Docker", "Kubernetes", "Jenkins", "PostgreSQL", "Redis"],
    },
    {
      title: "អ្នកអភិវឌ្ឍកម្មវិធី",
      company: "អគ្គលេខាធិការដ្ឋាន សភារដ្ឋប្បវេណី គណៈកម្មាធិការហិរញ្ញវត្ថុ និងសេដ្ឋកិច្ច (MEF)",
      period: "កុម្ភៈ 2024 - កក្កដា 2024",
      location: "ភ្នំពេញ កម្ពុជា",
      description:
        "អភិវឌ្ឍ RESTful services មានសុវត្ថិភាព និងលំហូរ Identity សម្រាប់ដំណោះស្រាយហិរញ្ញវត្ថុដោយប្រើ Spring Boot និង Keycloak។",
      responsibilities: [
        "អភិវឌ្ឍ និងថែទាំ REST APIs ជាមួយ Spring Boot/PostgreSQL",
        "ប្រើ Keycloak និង OAuth2 សម្រាប់ authentication/authorization មានសុវត្ថិភាព",
        "រចនាសមាសភាពទិន្នន័យ និងបង្កើនប្រសិទ្ធភាពសំណួរ",
        "បញ្ចូលសេវាភាគីទីបី និងពង្រឹងការធ្វើតេស្តស្វ័យប្រវត្តិ",
      ],
      technologies: ["Spring Boot", "Keycloak", "PostgreSQL", "MongoDB", "Git", "Docker"],
    },
    {
      title: "អ្នកអភិវឌ្ឍ Fullstack",
      company: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា (ITC)",
      period: "កក្កដា 2023 - តុលា 2023",
      location: "ភ្នំពេញ កម្ពុជា",
      description:
        "បង្កើត UI ឆ្លាតវៃ និង API ជាមួយ React និង Node.js ផ្តោតលើការចែកចាយដែលអាចទុកចិត្តបានសម្រាប់គម្រោងសាកលវិទ្យាល័យ។",
      responsibilities: [
        "អភិវឌ្ឍកម្មវិធី web full-stack ដោយប្រើ React និង Node.js",
        "បង្កើត RESTful APIs ជាមួយ Express.js និងថែទាំសុវត្ថិភាពទិន្នន័យ",
        "រចនាគ្រឿង UI ឆ្លាតវៃ និងអាចចូលដំណើរការ (accessible) តាមឧបករណ៍ផ្សេងៗ",
        "សហការតាម code review និងការចែកចាយជាបន្ត",
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "Material-UI"],
    },
    {
      title: "អ្នកហាត់ការអភិវឌ្ឍគេហទំព័រ",
      company: "ក្រុមហ៊ុន Vectorasoft",
      period: "កក្កដា 2022 - តុលា 2022",
      location: "ភ្នំពេញ កម្ពុជា",
      description:
        "រៀនមូលដ្ឋានគេហទំព័រទំនើប និងចូលរួមបង្កើតគ្រឿង UI ជាមួយ HTML, CSS, JavaScript និង React។",
      responsibilities: [
        "អភិវឌ្ឍគេហទំព័រឆ្លាតវៃដោយប្រើ HTML5, CSS3 និង JavaScript",
        "បង្កើតគ្រឿង UI អន្តរកម្មដោយប្រើ React.js",
        "សហការជាមួយអ្នករចនា និងអ្នកអភិវឌ្ឍ ដើម្បីកែក្នុងតម្រូវការ",
        "អនុវត្តអត្រាស្តង់ដារអភិវឌ្ឍវេបសាយសម្រាប់កូដងាយថែទាំ",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap", "Git"],
    },
  ],
};

const educationByLanguage = {
  en: [
    {
      degree: "Bachelor of Computer Science Engineering",
      institution: "Institute of Technology of Cambodia",
      period: "2019 - 2024",
    },
  ],
  km: [
    {
      degree: "បរិញ្ញាបត្រវិស្វកម្មវិទ្យាកុំព្យូទ័រ",
      institution: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
      period: "2019 - 2024",
    },
  ],
};

export default function About() {
  const { language } = useLanguage();
  const copy = aboutContent[language];
  const experience = experienceByLanguage[language];
  const education = educationByLanguage[language];

  return (
    <section id="about" className="py-20 bg-accent/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {copy.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {copy.subtitle}
          </p>
        </div>

        {/* Tech Stack Highlight */}
        <div className="mb-12 text-center">
          <div className="inline-flex flex-wrap gap-3 justify-center p-6 bg-card rounded-lg border shadow-sm">
            {[
              { icon: <SiReact className="h-6 w-6" />, name: "React", color: "text-[#61DAFB]" },
              { icon: <SiSpring className="h-6 w-6" />, name: "Spring Boot", color: "text-[#6DB33F]" },
              { icon: <SiDocker className="h-6 w-6" />, name: "Docker", color: "text-[#2496ED]" },
              { icon: <SiKubernetes className="h-6 w-6" />, name: "Kubernetes", color: "text-[#326CE5]" },
              { icon: <SiAmazonwebservices className="h-6 w-6" />, name: "AWS", color: "text-[#FF9900]" },
              { icon: <SiJenkins className="h-6 w-6" />, name: "Jenkins", color: "text-[#D24939]" },
              { icon: <SiTypescript className="h-6 w-6" />, name: "TypeScript", color: "text-[#3178C6]" },
              { icon: <SiNodedotjs className="h-6 w-6" />, name: "Node.js", color: "text-[#339933]" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-all hover:scale-105 cursor-default"
              >
                <span className={tech.color}>{tech.icon}</span>
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">{copy.whoIAmTitle}</h3>
              {copy.whoIAmParagraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground first:mb-4">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">{copy.whatIDoTitle}</h3>
              <ul className="space-y-3 text-muted-foreground">
                {copy.whatIDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Badge variant="default" className="mt-1 px-2 py-1" aria-label="Completed item">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                    </Badge>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              {copy.experienceTitle}
            </h3>
            <div className="relative space-y-8">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-[19px] top-0 bottom-0 w-0.5 bg-border"></div>
              
              {experience.map((exp, index) => (
                <div key={index} className="relative md:pl-16">
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-0 top-8 w-10 h-10 rounded-full bg-primary items-center justify-center shadow-lg">
                    <Calendar className="h-5 w-5 text-primary-foreground" />
                  </div>
                  
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-primary mb-1">{exp.title}</h4>
                          <p className="text-base font-medium text-foreground mb-1">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.location}</p>
                        </div>
                        <Badge variant="secondary" className="mt-2 md:mt-0 flex items-center gap-1.5 w-fit px-3 py-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {exp.period}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-5">{exp.description}</p>
                      
                      {/* Responsibilities */}
                      <div className="mb-5">
                        <h5 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          {copy.responsibilitiesLabel}
                        </h5>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-3 pl-7">
                              <span className="text-primary text-lg leading-none flex-shrink-0">•</span>
                              <span className="leading-relaxed">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Technologies */}
                      <div>
                        <h5 className="font-semibold mb-3 text-sm">{copy.technologiesLabel}</h5>
                        <div className="flex flex-wrap gap-2 pl-7">
                          {exp.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs px-2.5 py-1">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              {copy.educationTitle}
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div className="flex gap-4">
                        <div className="hidden md:flex w-12 h-12 rounded-full bg-primary/10 items-center justify-center flex-shrink-0">
                          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-primary mb-1">{edu.degree}</h4>
                          <p className="text-base font-medium text-foreground">{edu.institution}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="mt-2 md:mt-0 flex items-center gap-1.5 w-fit px-3 py-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {edu.period}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
