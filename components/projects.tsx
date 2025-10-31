"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Microservices E-Commerce Platform",
      description: "Enterprise e-commerce platform built with microservices architecture, featuring Spring Boot backend, React frontend, and complete DevOps pipeline.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      technologies: ["Spring Boot", "React", "Docker", "Kubernetes", "PostgreSQL", "Keycloak"],
      github: "https://github.com/rothadapravith",
      demo: "https://demo.com",
    },
    {
      title: "CI/CD Pipeline Automation",
      description: "Automated CI/CD pipeline with Jenkins, Docker, and Kubernetes for containerized application deployment with zero downtime.",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
      technologies: ["Jenkins", "Docker", "Kubernetes", "GitLab", "Terraform", "Ansible"],
      github: "https://github.com/rothadapravith",
      demo: "https://demo.com",
    },
    {
      title: "Cloud Infrastructure as Code",
      description: "Infrastructure automation using Terraform and Ansible to provision and manage cloud resources on AWS with best practices.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      technologies: ["Terraform", "Ansible", "AWS", "Docker", "Nginx"],
      github: "https://github.com/rothadapravith",
      demo: "https://demo.com",
    },
    {
      title: "Authentication Microservice",
      description: "Centralized authentication and authorization service using Keycloak with Spring Boot integration and JWT token management.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
      technologies: ["Keycloak", "Spring Boot", "OAuth2", "JWT", "PostgreSQL", "Docker"],
      github: "https://github.com/rothadapravith",
      demo: "https://demo.com",
    },
    {
      title: "Real-Time Monitoring Dashboard",
      description: "Comprehensive monitoring solution with Prometheus, Grafana, and ELK stack for application and infrastructure metrics.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      technologies: ["Prometheus", "Grafana", "ELK Stack", "Docker", "Kubernetes"],
      github: "https://github.com/rothadapravith",
      demo: "https://demo.com",
    },
    {
      title: "Containerized Full-Stack App",
      description: "Modern full-stack application with React frontend, Spring Boot backend, all containerized with Docker Compose for easy deployment.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      technologies: ["React", "Spring Boot", "Docker", "PostgreSQL", "Redis", "Nginx"],
      github: "https://github.com/rothadapravith",
      demo: "https://demo.com",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" className="gap-2" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
