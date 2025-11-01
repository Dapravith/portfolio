"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  SiReact, 
  SiSpring, 
  SiDocker, 
  SiKubernetes, 
  SiAmazonwebservices, 
  SiJenkins,
  SiTypescript,
  SiNodedotjs
} from "react-icons/si";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export default function About() {
  // TODO: Replace with your actual work experience from resume
  // Copy the exact details from your resume PDF
  
  const experience = [
    {
      title: "YOUR JOB TITLE - Replace This", // ⚠️ UPDATE FROM RESUME
      company: "COMPANY NAME", // ⚠️ UPDATE FROM RESUME
      period: "Month Year - Present", // ⚠️ UPDATE FROM RESUME (e.g., "Jan 2022 - Present")
      location: "City, Country", // ⚠️ OPTIONAL: Add if in resume
      description: "Replace with your actual job description from resume. Include key responsibilities and achievements.", // ⚠️ UPDATE FROM RESUME
      technologies: ["Spring Boot", "React", "Docker", "Kubernetes"], // ⚠️ OPTIONAL: Add if relevant
    },
    {
      title: "PREVIOUS JOB TITLE", // ⚠️ UPDATE FROM RESUME
      company: "PREVIOUS COMPANY", // ⚠️ UPDATE FROM RESUME
      period: "Month Year - Month Year", // ⚠️ UPDATE FROM RESUME
      location: "City, Country", // ⚠️ OPTIONAL
      description: "Replace with your actual job description from resume.", // ⚠️ UPDATE FROM RESUME
      technologies: ["Node.js", "MongoDB", "AWS"], // ⚠️ OPTIONAL
    },
    {
      title: "FIRST JOB TITLE", // ⚠️ UPDATE FROM RESUME
      company: "FIRST COMPANY", // ⚠️ UPDATE FROM RESUME
      period: "Month Year - Month Year", // ⚠️ UPDATE FROM RESUME
      location: "City, Country", // ⚠️ OPTIONAL
      description: "Replace with your actual job description from resume.", // ⚠️ UPDATE FROM RESUME
      technologies: ["JavaScript", "React"], // ⚠️ OPTIONAL
    },
  ];

  const education = [
    {
      degree: "YOUR DEGREE - Replace This", // ⚠️ UPDATE FROM RESUME
      institution: "UNIVERSITY NAME", // ⚠️ UPDATE FROM RESUME
      period: "Year - Year", // ⚠️ UPDATE FROM RESUME (e.g., "2014 - 2018")
      location: "City, Country", // ⚠️ OPTIONAL
    },
  ];

  return (
    <section id="about" className="py-20 bg-accent/50">
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
          {/* Professional Summary */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Professional Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                {/* ⚠️ UPDATE: Replace with your professional summary from resume */}
                Replace this with your professional summary from your resume. 
                This should be a brief overview of your career, highlighting your key 
                skills, years of experience, and what makes you unique as a developer.
              </p>
            </CardContent>
          </Card>

          {/* Quick Facts */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span>
                    {/* ⚠️ UPDATE: Add your total years of experience */}
                    <strong>X+ years</strong> of professional experience
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>
                    {/* ⚠️ UPDATE: Add your location */}
                    Based in <strong>City, Country</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>
                    {/* ⚠️ UPDATE: Add your availability status */}
                    <strong>Available</strong> for new opportunities
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Work Experience */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold mb-8 text-center">Work Experience</h3>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-1">{job.title}</h4>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Briefcase className="h-4 w-4" />
                        <span className="font-semibold text-foreground">{job.company}</span>
                        {job.location && (
                          <>
                            <span>•</span>
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 md:mt-0">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">{job.period}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {job.description}
                  </p>
                  {job.technologies && job.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold mb-8 text-center">Education</h3>
          <div className="max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-2">{edu.degree}</h4>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="font-semibold text-foreground">{edu.institution}</span>
                        {edu.location && (
                          <>
                            <span>•</span>
                            <MapPin className="h-4 w-4" />
                            <span>{edu.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 md:mt-0">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">{edu.period}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notice to update content */}
        <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-yellow-900 dark:text-yellow-100">
            ⚠️ Update Required: Work Experience & Education
          </h3>
          <p className="text-yellow-800 dark:text-yellow-200 mb-2">
            Replace the placeholder content with your actual work experience and education from your resume.
          </p>
          <ol className="list-decimal list-inside text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>Open your resume PDF: <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">public/resume.pdf</code></li>
            <li>Copy work experience details exactly as they appear</li>
            <li>Update: <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">components/about.tsx</code></li>
            <li>Add professional summary and quick facts</li>
            <li>Update education section</li>
          </ol>
          <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-3">
            See <code>CONTENT_UPDATE_TEMPLATE.md</code> for the update template.
          </p>
        </div>
      </div>
    </section>
  );
}
