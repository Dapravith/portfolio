"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import {
  SiAmazonwebservices,
  SiDocker,
  SiJenkins,
  SiKubernetes,
  SiReact,
  SiSpring
} from "react-icons/si";
import TechParticles from "./tech-particles";
import { useLanguage } from "@/store/languageStore";

export default function Hero() {
  const { t } = useLanguage();
  
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Dapravith_Rotha_flow_cv.pdf';
    link.download = 'Dapravith_Rotha_flow_cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Animated Tech Background */}
      <TechParticles />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background -z-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                <Image
                  src="/profile.jpg"
                  alt="Rotha Dapravith"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/public/04_4x6_White_background_photo.jpg';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="space-y-3">
              <p className="text-lg sm:text-xl text-muted-foreground">{t.hero.greeting}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  {t.hero.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-semibold">
                {t.hero.title}
              </p>
            </div>

            <p className="max-w-2xl text-lg text-muted-foreground mx-auto lg:mx-0">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center flex-wrap">
              <Button size="lg" className="gap-2 group" asChild>
                <a href="#projects">
                  {t.hero.viewWork}
                  <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 group"
                onClick={handleDownloadResume}
              >
                <Download className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
                {t.hero.downloadResume}
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="#contact">
                  <Mail className="h-4 w-4" />
                  {t.hero.getInTouch}
                </a>
              </Button>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              <a
                href="https://github.com/Dapravith"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full hover:bg-accent transition-all hover:scale-110 duration-300"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/rotha-dapravith"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full hover:bg-accent transition-all hover:scale-110 duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:dapravithrotha@gmail.com"
                className="p-3 rounded-full hover:bg-accent transition-all hover:scale-110 duration-300"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>

            {/* Tech Stack Icons */}
            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">{t.hero.technologiesLabel}</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  { icon: <SiReact className="h-5 w-5" />, name: "React", color: "text-[#61DAFB]" },
                  { icon: <SiSpring className="h-5 w-5" />, name: "Spring", color: "text-[#6DB33F]" },
                  { icon: <SiDocker className="h-5 w-5" />, name: "Docker", color: "text-[#2496ED]" },
                  { icon: <SiKubernetes className="h-5 w-5" />, name: "Kubernetes", color: "text-[#326CE5]" },
                  { icon: <SiAmazonwebservices className="h-5 w-5" />, name: "AWS", color: "text-[#FF9900]" },
                  { icon: <SiJenkins className="h-5 w-5" />, name: "Jenkins", color: "text-[#D24939]" },
                ].map((tech) => (
                  <span 
                    key={tech.name}
                    className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-full text-sm font-medium hover:bg-primary/20 transition-all hover:scale-105"
                  >
                    <span className={tech.color}>{tech.icon}</span>
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
