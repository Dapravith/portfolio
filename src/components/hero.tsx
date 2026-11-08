"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/store/languageStore";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { FaAws } from "react-icons/fa";
import { SiDocker, SiJenkins, SiKubernetes, SiReact, SiSpring } from "react-icons/si";

const technologies = [
  { icon: SiReact, name: "React", color: "text-[#1686a0] dark:text-[#61DAFB]" },
  { icon: SiSpring, name: "Spring Boot", color: "text-[#4f8f2c] dark:text-[#8ecb68]" },
  { icon: SiDocker, name: "Docker", color: "text-[#1672b6] dark:text-[#55b7f2]" },
  { icon: SiKubernetes, name: "Kubernetes", color: "text-[#326CE5] dark:text-[#82a8ff]" },
  { icon: FaAws, name: "AWS", color: "text-[#a96000] dark:text-[#ffb84d]" },
  { icon: SiJenkins, name: "Jenkins", color: "text-[#a63832] dark:text-[#f08e84]" },
];

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section id="home" className="hero-surface relative overflow-hidden pt-16">
      <div className="relative mx-auto grid min-h-[min(840px,100svh)] max-w-7xl items-center gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16 lg:px-8">
        <div className="order-2 mx-auto w-full max-w-2xl text-center lg:order-1 lg:mx-0 lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-800 dark:text-blue-200 sm:text-base">
            {t.hero.greeting} <span className="text-foreground">{t.hero.name}</span>
          </p>
          <h1 className={`mt-5 text-balance font-bold text-slate-950 dark:text-white ${language === "km" ? "text-3xl leading-[1.5] tracking-normal sm:text-4xl sm:leading-[1.5] lg:text-5xl lg:leading-[1.5]" : "text-4xl leading-[1.16] tracking-[-0.035em] sm:text-5xl lg:text-[3.7rem] lg:leading-[1.12]"}`}>
            {t.hero.hook}
          </h1>
          <p className="mt-5 text-lg font-semibold leading-relaxed text-blue-900 dark:text-blue-200 sm:text-xl">
            {t.hero.title}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-700 dark:text-slate-300 sm:text-lg sm:leading-8 lg:mx-0">
            {t.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button size="lg" className="h-12 px-5" asChild>
              <a href="#experience">{t.hero.viewWork}<ArrowDown aria-hidden="true" /></a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 bg-background/75 px-5" asChild>
              <a href="/Dapravith_Rotha_flow_cv.pdf" download="Dapravith_Rotha_flow_cv.pdf"><Download aria-hidden="true" />{t.hero.downloadResume}</a>
            </Button>
            <Button size="lg" variant="ghost" className="h-12 px-5" asChild>
              <a href="#contact"><Mail aria-hidden="true" />{t.hero.getInTouch}</a>
            </Button>
          </div>

          <div className="mt-9 border-t border-slate-900/10 pt-6 dark:border-white/15">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">{t.hero.technologiesLabel}</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-3 lg:justify-start">
              {technologies.map(({ icon: Icon, name, color }) => (
                <li key={name} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <Icon className={`h-4 w-4 ${color}`} aria-hidden="true" />{name}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex justify-center gap-2 lg:justify-start">
            <a href="https://github.com/Dapravith" target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-slate-600 hover:bg-foreground/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-slate-300" aria-label="GitHub"><Github className="h-5 w-5" /></a>
            <a href="https://linkedin.com/in/rotha-dapravith" target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-slate-600 hover:bg-foreground/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-slate-300" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
            <a href="mailto:dapravithrotha@gmail.com" className="rounded-md p-2 text-slate-600 hover:bg-foreground/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-slate-300" aria-label="Email"><Mail className="h-5 w-5" /></a>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative w-40 sm:w-60 lg:w-full lg:max-w-[350px]">
            <div className="absolute -inset-3 rounded-[1.75rem] border border-blue-800/15 dark:border-blue-200/20" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl shadow-blue-950/10 dark:border-slate-700 dark:shadow-black/20">
              <div className="relative aspect-[4/4.3]">
                <Image src="/profile.jpg" alt="Rotha Dapravith" fill sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 350px" className="object-cover object-top" priority />
              </div>
              <div className="flex items-center justify-between gap-2 bg-white px-4 py-3 dark:bg-slate-900" aria-hidden="true">
                <span className="whitespace-nowrap font-mono text-[9px] font-semibold tracking-[0.04em] text-slate-600 sm:text-[10px] sm:tracking-[0.12em] dark:text-slate-300">FULL STACK / DEVOPS</span>
                <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
