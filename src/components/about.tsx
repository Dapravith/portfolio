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

export default function About() {
  const experience = [
    {
      title: "Java Developer",
      company: "General Secretariat of the Digital Government Committee (DGC)",
      period: "Oct 2024 - Aug 2025",
      location: "Phnom Penh, Cambodia",
      description: "Developing enterprise applications using Java Spring Boot, React, and implementing DevOps practices with Docker, Kubernetes, and CI/CD pipelines.",
      responsibilities: [
        "Develop and maintain microservices using Java Spring Boot",
        "Implement containerization with Docker and Kubernetes",
        "Build and maintain CI/CD pipelines",
        "Create responsive front-end applications using React.js",
        "Collaborate with team members on project development",
      ],
      technologies: ["Java Spring Boot", "React", "Docker", "Kubernetes", "Jenkins", "PostgreSQL", "Redis"],
    },
    {
      title: "Software Developer",
      company: "Secretariat of Legal Council of the Ministry of Economy and Finance (MEF)",
      period: "Feb 2024 - July 2024",
      location: "Phnom Penh, Cambodia",
      description: "Developed RESTful APIs and web applications using Spring Boot, implemented authentication systems, and managed database operations.",
      responsibilities: [
        "Develop and maintain RESTful APIs using Spring Boot",
        "Implement authentication and authorization systems",
        "Design and optimize database schemas",
        "Integrate third-party services and APIs",
        "Write unit tests and maintain code quality",
      ],
      technologies: ["Spring Boot", "Keycloak", "PostgreSQL", "MongoDB", "Git", "Docker"],
    },
    {
      title: "Fullstack Developer",
      company: "Institute of Technology of Cambodia (ITC)",
      period: "July 2023 - Oct 2023",
      location: "Phnom Penh, Cambodia",
      description: "Developed full-stack web applications using React and Node.js with focus on creating responsive user interfaces and RESTful APIs.",
      responsibilities: [
        "Develop full-stack web applications using React and Node.js",
        "Create RESTful APIs with Express.js",
        "Design responsive UI components",
        "Manage database operations",
        "Participate in code reviews and team meetings",
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "Material-UI"],
    },
    {
      title: "Web Developer Internship",
      company: "Vectorasoft Company",
      period: "July 2022 - Oct 2022",
      location: "Phnom Penh, Cambodia",
      description: "Learned and applied web development skills, working on various projects using HTML, CSS, JavaScript, and React.",
      responsibilities: [
        "Develop responsive web pages using HTML5, CSS3, and JavaScript",
        "Create interactive UI components using React.js",
        "Collaborate with designers and developers",
        "Learn and apply web development best practices",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap", "Git"],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science Engineering",
      institution: "Institute of Technology of Cambodia",
      period: "2019 - 2024",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-accent/30 via-accent/50 to-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate developer with expertise in Full-Stack Development and DevOps
          </p>
        </div>

        {/* Tech Stack Highlight */}
        <div className="mb-12 text-center animate-fadeIn">
          <div className="inline-flex flex-wrap gap-3 justify-center p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-xl">
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
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-all hover:scale-110 cursor-default shadow-md hover:shadow-lg border border-primary/20"
              >
                <span className={tech.color}>{tech.icon}</span>
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-2xl transition-all duration-300 border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="text-muted-foreground mb-4">
                I&apos;m a full-stack developer and DevOps engineer with a passion for building
                scalable enterprise applications. With expertise in Java Spring Boot, React,
                and modern DevOps practices, I specialize in creating robust solutions that
                bridge development and operations.
              </p>
              <p className="text-muted-foreground">
                I believe in automation, continuous integration, and delivering high-quality
                software. When I&apos;m not coding, you can find me exploring new cloud technologies,
                contributing to open-source projects, or optimizing CI/CD pipelines.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">What I Do</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Badge variant="default" className="mt-1">✓</Badge>
                  <span>Full-stack development with Java Spring Boot & React</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="default" className="mt-1">✓</Badge>
                  <span>Microservices architecture & RESTful API design</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="default" className="mt-1">✓</Badge>
                  <span>DevOps automation with Docker, Kubernetes & CI/CD</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="default" className="mt-1">✓</Badge>
                  <span>Authentication & security with Keycloak & OAuth2</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              Professional Experience
            </h3>
            <div className="relative space-y-8">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-primary"></div>
              
              {experience.map((exp, index) => (
                <div key={index} className="relative md:pl-16">
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-0 top-8 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center shadow-lg ring-4 ring-background">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  
                  <Card className="hover:shadow-2xl transition-all duration-300 border-primary/20 bg-card/80 backdrop-blur-sm hover:scale-[1.02]">
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
                          Responsibilities
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
                        <h5 className="font-semibold mb-3 text-sm">Technologies Used</h5>
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
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 border-primary/20 bg-card/80 backdrop-blur-sm hover:scale-[1.02]">
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
