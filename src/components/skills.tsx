"use client";

import { FaAws } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaKey, FaServer } from "react-icons/fa";
import { useLanguage } from "@/store/languageStore";
import AiEngineering from "@/components/ai-engineering";
import {
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
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Angular", icon: SiAngular },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Redux", icon: SiRedux },
      { name: "Material-UI", icon: SiMui },
    ],
    backend: [
      { name: "Java Spring Boot", icon: SiSpringboot },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "NestJS", icon: SiNestjs },
      { name: "Microservices", icon: FaServer },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "REST APIs", icon: FaServer },
      { name: "Keycloak", icon: FaKey },
    ],
    tools: [
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "Git & GitHub", icon: SiGit },
      { name: "Jenkins", icon: SiJenkins },
      { name: "GitLab CI/CD", icon: SiGitlab },
      { name: "AWS", icon: FaAws },
      { name: "Terraform", icon: SiTerraform },
      { name: "Ansible", icon: SiAnsible },
      { name: "Linux", icon: SiLinux },
    ],
  };

  return (
    <section id="skills" className="skills-surface relative scroll-mt-16 border-t border-border py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-10 space-y-3">
          <p className="font-mono text-xs font-semibold tracking-[0.2em] text-primary" aria-hidden="true">02 /</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.skills.title}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {t.skills.subtitle}
          </p>
          <p className="max-w-3xl text-sm text-muted-foreground">
            {t.skills.description}
          </p>
        </div>

        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="mb-6 grid h-auto w-full max-w-2xl grid-cols-2 gap-1 sm:grid-cols-4">
            <TabsTrigger value="frontend">{t.skills.categories.frontend}</TabsTrigger>
            <TabsTrigger value="backend">{t.skills.categories.backend}</TabsTrigger>
            <TabsTrigger value="tools">{t.skills.categories.tools}</TabsTrigger>
            <TabsTrigger value="ai">{t.skills.categories.ai}</TabsTrigger>
          </TabsList>

          <TabsContent value="frontend">
            <Card className="border-border bg-card shadow-none">
              <CardContent>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {skillCategories.frontend.map(({ name, icon: Icon }) => (
                    <li key={name} className="flex min-h-12 items-center gap-3 rounded-md border border-border px-3 py-3 text-sm font-medium">
                      <Icon className="h-5 w-5 shrink-0 text-foreground/75" aria-hidden="true" />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backend">
            <Card className="border-border bg-card shadow-none">
              <CardContent>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {skillCategories.backend.map(({ name, icon: Icon }) => (
                    <li key={name} className="flex min-h-12 items-center gap-3 rounded-md border border-border px-3 py-3 text-sm font-medium">
                      <Icon className="h-5 w-5 shrink-0 text-foreground/75" aria-hidden="true" />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools">
            <Card className="border-border bg-card shadow-none">
              <CardContent>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {skillCategories.tools.map(({ name, icon: Icon }) => (
                    <li key={name} className="flex min-h-12 items-center gap-3 rounded-md border border-border px-3 py-3 text-sm font-medium">
                      <Icon className="h-5 w-5 shrink-0 text-foreground/75" aria-hidden="true" />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ai">
            <AiEngineering />
          </TabsContent>
        </Tabs>


      </div>
    </section>
  );
}
