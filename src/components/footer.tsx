"use client";

import { ArrowUpRight, Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/config/app.config";
import { useLanguage } from "@/store/languageStore";
import { PhnomPenhTime } from "@/components/phnom-penh-time";
import { ViewCounter } from "@/components/ViewCounter";

const socialAccounts = [
  { name: "GitHub", href: socialLinks.github, Icon: Github },
  { name: "LinkedIn", href: socialLinks.linkedin, Icon: Linkedin },
  { name: "Facebook", href: socialLinks.facebook, Icon: Facebook },
  { name: "Instagram", href: socialLinks.instagram, Icon: Instagram },
];

const copyByLanguage = {
  en: {
    description: "Full-stack development and reliable systems, from idea to delivery.",
    navigation: "Navigation",
    connect: "Connect",
    contact: "Contact",
    contactNote: "For opportunities and collaboration",
    email: "Send an email",
    backToTop: "Back to top",
    rights: "All rights reserved.",
  },
  km: {
    description: "អភិវឌ្ឍកម្មវិធី Full-stack និងប្រព័ន្ធដែលអាចទុកចិត្តបាន ចាប់ពីគំនិតរហូតដល់ការដាក់ឱ្យប្រើប្រាស់។",
    navigation: "ទំព័រ",
    connect: "បណ្ដាញសង្គម",
    contact: "ទំនាក់ទំនង",
    contactNote: "សម្រាប់ឱកាសការងារ និងកិច្ចសហការ",
    email: "ផ្ញើអ៊ីមែល",
    backToTop: "ត្រឡប់ទៅខាងលើ",
    rights: "រក្សាសិទ្ធិគ្រប់យ៉ាង។",
  },
} as const;

export default function Footer() {
  const { language, t } = useLanguage();
  const copy = copyByLanguage[language];
  const navigation = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-[1.5fr_0.8fr_0.9fr_1.2fr] lg:gap-12 lg:py-20">
          <div className="max-w-sm">
            <a href="#home" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-950" aria-hidden="true">RD</span>
              <span className="text-base font-semibold tracking-tight">Rotha Dapravith</span>
            </a>
            <p className="mt-5 text-sm leading-7 text-slate-300">{copy.description}</p>
          </div>

          <nav aria-label={copy.navigation}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{copy.navigation}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}><a href={item.href} className="text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">{item.label}</a></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{copy.connect}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {socialAccounts.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">
                    <Icon className="h-4 w-4" aria-hidden="true" />{name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{copy.contact}</h2>
            <p className="mt-5 text-sm leading-6 text-slate-300">{copy.contactNote}</p>
            <a href={`mailto:${socialLinks.email}`} className="mt-3 inline-flex max-w-full items-start gap-2 text-sm font-medium text-white underline decoration-slate-500 underline-offset-4 hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span className="break-all">{socialLinks.email}</span>
            </a>
            <a href={`mailto:${socialLinks.email}`} className="mt-5 flex w-fit items-center gap-1.5 text-sm font-medium text-sky-300 hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">{copy.email}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 pt-6 pb-24 text-xs leading-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p>© {new Date().getFullYear()} Rotha Dapravith. {copy.rights}</p>
            <PhnomPenhTime />
            <ViewCounter />
          </div>
          <a href="#home" className="w-fit text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">{copy.backToTop} ↑</a>
        </div>
      </div>
    </footer>
  );
}
