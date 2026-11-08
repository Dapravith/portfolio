"use client";

import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/config/app.config";
import { useLanguage } from "@/store/languageStore";

export default function Contact() {
  const { language, t } = useLanguage();
  const introduction = language === "km"
    ? "សម្រាប់ឱកាសការងារ ការសហការ ឬការពិភាក្សាអំពីវិស្វកម្មកម្មវិធី សូមទាក់ទងខ្ញុំតាមអ៊ីមែល។"
    : "For opportunities, collaboration, or a conversation about software engineering, send me an email.";

  return (
    <section id="contact" className="scroll-mt-16 border-t border-border bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-16 lg:px-8">
        <div>
          <p className="mb-4 font-mono text-xs font-semibold tracking-[0.2em] text-primary" aria-hidden="true">03 /</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.contact.title}</h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">{introduction}</p>
        </div>
        <div className="space-y-3">
          <a href={`mailto:${socialLinks.email}`} className="group flex items-center justify-between gap-4 rounded-lg border border-border p-5 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            <span className="flex min-w-0 items-center gap-3"><Mail className="h-5 w-5 shrink-0" aria-hidden="true" /><span className="break-all font-medium">{socialLinks.email}</span></span>
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
          <div className="flex flex-wrap gap-3">
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-accent"><Linkedin className="h-4 w-4" aria-hidden="true" />LinkedIn<ArrowUpRight className="h-3 w-3" aria-hidden="true" /></a>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-accent"><Github className="h-4 w-4" aria-hidden="true" />GitHub<ArrowUpRight className="h-3 w-3" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
