"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaKey, FaServer } from "react-icons/fa";
import { useLanguage } from "@/store/languageStore";
import {
  SiAmazonwebservices,
  SiAngular,
  SiAnsible,
  SiDocker,
  SiExpress,
  SiGit,
  SiGitlab,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMui,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiSpringboot,
  SiTailwindcss,
  SiTerraform,
  SiTypescript
} from "react-icons/si";

export default function Skills() {
  const { t } = useLanguage();

  const skillCategories = {
    frontend: [
      { name: "React", level: 90, icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", level: 85, icon: SiNextdotjs, color: "#000000" },
      { name: "TypeScript", level: 88, icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", level: 92, icon: SiJavascript, color: "#F7DF1E" },
      { name: "Angular", level: 85, icon: SiAngular, color: "#DD0031" },
      { name: "Tailwind CSS", level: 87, icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Redux", level: 85, icon: SiRedux, color: "#764ABC" },
      { name: "Material-UI", level: 82, icon: SiMui, color: "#007FFF" },
    ],
    backend: [
      { name: "Java Spring Boot", level: 95, icon: SiSpringboot, color: "#6DB33F" },
      { name: "Node.js", level: 85, icon: SiNodedotjs, color: "#339933" },
      { name: "Express", level: 83, icon: SiExpress, color: "#000000" },
      { name: "NestJS", level: 80, icon: SiNestjs, color: "#E0234E" },
      { name: "Microservices", level: 90, icon: FaServer, color: "#FF6C37" },
      { name: "PostgreSQL", level: 88, icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", level: 85, icon: SiMongodb, color: "#47A248" },
      { name: "REST APIs", level: 95, icon: FaServer, color: "#009688" },
      { name: "Keycloak", level: 87, icon: FaKey, color: "#4D4D4D" },
    ],
    tools: [
      { name: "Docker", level: 97, icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", level: 88, icon: SiKubernetes, color: "#326CE5" },
      { name: "Git & GitHub", level: 95, icon: SiGit, color: "#F05032" },
      { name: "Jenkins", level: 90, icon: SiJenkins, color: "#D24939" },
      { name: "GitLab CI/CD", level: 88, icon: SiGitlab, color: "#FC6D26" },
      { name: "AWS", level: 80, icon: SiAmazonwebservices, color: "#FF9900" },
      { name: "Terraform", level: 82, icon: SiTerraform, color: "#7B42BC" },
      { name: "Ansible", level: 85, icon: SiAnsible, color: "#EE0000" },
      { name: "Linux", level: 85, icon: SiLinux, color: "#FCC624" },
    ],
  };

  /* const certifications = [
    "AWS Certified Solutions Architect",
    "Kubernetes Administrator (CKA)",
    "Docker Certified Associate",
    "Spring Professional Certification",
  ]; */

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            {t.skills.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            {t.skills.description}
          </p>
        </div>

        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg p-1">
            <TabsTrigger value="frontend" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">{t.skills.categories.frontend}</TabsTrigger>
            <TabsTrigger value="backend" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">{t.skills.categories.backend}</TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">{t.skills.categories.tools}</TabsTrigger>
          </TabsList>

          <TabsContent value="frontend">
            <Card className="bg-card/90 backdrop-blur-sm border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {skillCategories.frontend.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <div key={index} className="space-y-2 group">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: skill.color }} />
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground font-semibold">{skill.level}%</span>
                        </div>
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 hover:scale-105"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backend">
            <Card className="bg-card/90 backdrop-blur-sm border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {skillCategories.backend.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <div key={index} className="space-y-2 group">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: skill.color }} />
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground font-semibold">{skill.level}%</span>
                        </div>
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 hover:scale-105"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools">
            <Card className="bg-card/90 backdrop-blur-sm border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {skillCategories.tools.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <div key={index} className="space-y-2 group">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: skill.color }} />
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground font-semibold">{skill.level}%</span>
                        </div>
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 hover:scale-105"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-6">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className="text-base py-2 px-4">
                <FaAward className="w-4 h-4 mr-2 inline-block" />
                {cert}
              </Badge>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
