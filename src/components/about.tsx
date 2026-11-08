"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";
import { useLanguage } from "@/store/languageStore";
import { educationByLanguage, experienceByLanguage, workPeriods } from "@/config/portfolio-experience";

const aboutContent = {
  en: {
    sectionTitle: "About Me",
    subtitle: "Full-stack development, reliable systems, and thoughtful delivery",
    whoIAmTitle: "Who I Am",
    whoIAmParagraphs: [
      "I build full-stack applications and services with Java Spring Boot, React, and modern web technologies. My experience spans digital government, finance, and digital economy initiatives.",
      "I care about clear APIs, secure access, and reliable delivery, and work with containers, CI/CD, and monitoring to support maintainable systems.",
    ],
    whatIDoTitle: "What I Do",
    whatIDo: [
      "Architect and deliver full-stack platforms with Java Spring Boot & React",
      "Design microservices and API contracts with reliability and security in mind",
      "Automate delivery with Docker, Kubernetes, and CI/CD pipelines",
      "Implement identity, observability, and performance tuning for production",
    ],
    experienceTitle: "Professional Experience",
    experienceSpan: "3 years of experience",
    present: "Present",
    educationTitle: "Education",
  },
  km: {
    sectionTitle: "អំពីខ្ញុំ",
    subtitle: "ការអភិវឌ្ឍ Full-stack ប្រព័ន្ធដែលអាចទុកចិត្តបាន និងការដាក់ឱ្យប្រើប្រាស់",
    whoIAmTitle: "ខ្លួនខ្ញុំគឺ",
    whoIAmParagraphs: [
      "ខ្ញុំបង្កើតកម្មវិធី Full-stack និងសេវាកម្មដោយប្រើ Java Spring Boot, React និងបច្ចេកវិទ្យាវេបទំនើប។ ខ្ញុំមានបទពិសោធន៍ក្នុងវិស័យរដ្ឋាភិបាលឌីជីថល ហិរញ្ញវត្ថុ និងសេដ្ឋកិច្ចឌីជីថល។",
      "ខ្ញុំផ្តោតលើ APIs ច្បាស់លាស់ ការចូលប្រើប្រកបដោយសុវត្ថិភាព និងការដាក់ឱ្យប្រើប្រាស់ដែលអាចទុកចិត្តបាន ដោយប្រើ containers, CI/CD និងការត្រួតពិនិត្យប្រព័ន្ធ។",
    ],
    whatIDoTitle: "អ្វីដែលខ្ញុំធ្វើ",
    whatIDo: [
      "រចនា និងដឹកនាំស្ថាបត្យកម្ម microservices និង API ដែលមានសុវត្ថិភាព និងអាចពង្រីកបាន",
      "បង្កើត វាស់វែង និងធ្វើ harden CI/CD pipelines ជាមួយ Docker, Kubernetes និង Jenkins/GitHub Actions",
      "ដំណើរការបច្ចេកទេសអត្តសញ្ញាណ ការផ្តល់សិទ្ធិ សុវត្ថិភាព និងការត្រួតពិនិត្យសម្រាប់ផលិតកម្ម",
      "ធ្វើ performance tuning និង observability (logging/metrics/tracing) សម្រាប់បំពេញ SLA/SLO",
    ],
    experienceTitle: "បទពិសោធន៍ការងារ",
    experienceSpan: "បទពិសោធន៍ ៣ ឆ្នាំ",
    present: "បច្ចុប្បន្ន",
    educationTitle: "ការសិក្សា",
  },
};

type WorkRole = keyof typeof workPeriods;

function formatWorkPeriod(role: WorkRole, present: string) {
  const { start, end } = workPeriods[role];
  if (!end) return `${start[0]} - ${present}`;
  return start[0] === end[0] ? `${start[0]}` : `${start[0]} - ${end[0]}`;
}

export default function About() {
  const { language } = useLanguage();
  const copy = aboutContent[language];
  const experience = experienceByLanguage[language];
  const education = educationByLanguage[language];
  return (
    <section id="about" className="profile-surface scroll-mt-16 border-t border-border bg-muted/20 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="mb-4 font-mono text-xs font-semibold tracking-[0.2em] text-primary" aria-hidden="true">01 /</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {copy.sectionTitle}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {copy.subtitle}
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <Card className="border-border shadow-none">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">{copy.whoIAmTitle}</h3>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-900 dark:bg-blue-950/60 dark:text-blue-200">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" aria-hidden="true" />
                {copy.experienceSpan}
              </p>
              {copy.whoIAmParagraphs.map((paragraph, index) => (
                <p key={index} className="mb-3 leading-7 text-muted-foreground last:mb-0">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border shadow-none">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">{copy.whatIDoTitle}</h3>
              <ul className="space-y-3 text-muted-foreground">
                {copy.whatIDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <div>
            <h3 id="experience" className="text-2xl font-bold mb-6 flex items-center gap-2 scroll-mt-24">
              <Briefcase className="h-6 w-6" />
              {copy.experienceTitle}
            </h3>
            <div className="divide-y divide-border border-y border-border">
              {experience.map((exp) => (
                <article key={exp.role} className="grid gap-3 py-7 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8 sm:py-8">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {formatWorkPeriod(exp.role, copy.present)}
                  </p>
                  <div className="min-w-0">
                    <h4 className="text-xl font-bold text-foreground">{exp.title}</h4>
                    <p className="mt-1 text-base font-medium text-foreground/80">{exp.company}</p>
                    {exp.location && <p className="mt-1 text-sm text-muted-foreground">{exp.location}</p>}
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{exp.description}</p>
                    <p className="mt-4 text-sm font-medium leading-7 text-foreground/80">{exp.technologies.join(" · ")}</p>
                  </div>
                </article>
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
                <Card key={index} className="border-border shadow-none">
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
                          {edu.description && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{edu.description}</p>}
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
