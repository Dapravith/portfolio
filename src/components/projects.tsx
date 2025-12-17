"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/store/languageStore";

export default function Projects() {
  const { t } = useLanguage();
  
  const projects = [
    {
      title: "Microservices Enterprise System",
      description: "A comprehensive enterprise-grade microservices architecture featuring service discovery, API gateway, distributed tracing, and centralized configuration. Built with Spring Boot and modern DevOps practices.",
      image: "/projects/microservices-enterprise.svg",
      technologies: ["Spring Boot", "Docker", "Kubernetes", "PostgreSQL", "Redis", "MongoDB"],
      githubUrl: "https://github.com/Dapravith/microservices-enterprise-system",
      demoUrl: "",
      featured: true,
    },
    {
      title: "Spring Boot Microservices Monitoring",
      description: "Production-ready microservices monitoring solution with Prometheus, Grafana, and distributed tracing using Zipkin. Features health checks, metrics collection, and real-time performance dashboards.",
      image: "/projects/microservices-monitoring.svg",
      technologies: ["Spring Boot", "Prometheus", "Grafana", "Docker", "Zipkin", "MySQL"],
      githubUrl: "https://github.com/Dapravith/Springboot-microservices-monitoring",
      demoUrl: "",
      featured: true,
    },
    {
      title: "Spring Boot SSO with Keycloak",
      description: "Secure Single Sign-On (SSO) implementation using Keycloak for enterprise authentication. Features OAuth2, OpenID Connect, role-based access control, and centralized user management.",
      image: "/projects/sso-keycloak.svg",
      technologies: ["Spring Boot", "Keycloak", "OAuth2", "Docker", "PostgreSQL", "React"],
      githubUrl: "https://github.com/Dapravith/springboot-sso-keycloak",
      demoUrl: "",
      featured: true,
    },
    {
      title: "End-to-End Kubernetes DevSecOps Tetris",
      description: "Complete DevSecOps pipeline for Tetris game deployment on Kubernetes. Features CI/CD with Jenkins, security scanning, monitoring, and automated deployment with GitOps practices.",
      image: "/projects/kubernetes-devsecops.svg",
      technologies: ["Kubernetes", "Jenkins", "Docker", "ArgoCD", "Prometheus", "Grafana"],
      githubUrl: "https://github.com/Dapravith/End-to-End-Kubernetes-DevSecOps-Tetris-Project",
      demoUrl: "",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.projects.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 border-primary/20 bg-card/90 backdrop-blur-sm hover:scale-105 hover:border-primary/40"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-purple-500/10">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                  unoptimized
                />
                {project.featured && (
                  <div className="absolute top-3 right-3 z-20">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription className="line-clamp-3">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="hover:bg-primary/20 transition-colors">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 flex-1 hover:bg-primary hover:text-primary-foreground transition-all" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    {t.projects.codeButton}
                  </a>
                </Button>
                {/* <Button size="sm" className="gap-2" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    {t.projects.demoButton}
                  </a>
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
