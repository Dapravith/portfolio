"use client";

import Image from "next/image";
import { SiClaudecode, SiCursor, SiGooglegemini, SiModelcontextprotocol } from "react-icons/si";
import { useLanguage } from "@/store/languageStore";

const tools = [
  { id: "claude", name: "Claude Code", Icon: SiClaudecode },
  { id: "cursor", name: "Cursor", Icon: SiCursor },
  { id: "chatgpt", name: "ChatGPT", image: "/ai-tools/openai.svg" },
  { id: "codex", name: "OpenAI Codex", image: "/ai-tools/openai.svg" },
  { id: "hermes", name: "Hermes AI Agent", image: "/ai-tools/hermes.svg" },
  { id: "gemini", name: "Google Gemini", Icon: SiGooglegemini },
  { id: "antigravity", name: "Google Antigravity", image: "/ai-tools/antigravity.svg" },
  { id: "mcp", name: "MCP Servers", Icon: SiModelcontextprotocol },
] as const;

const content = {
  en: {
    title: "AI Assisted Tools",
    subtitle: "Integrating AI tools into my daily engineering workflow to improve development efficiency, code quality, research, and automation.",
    philosophyLabel: "Engineering philosophy",
    philosophy: "AI accelerates my workflow. I remain responsible for architecture, engineering decisions, security, testing, and final validation.",
    descriptions: {
      claude: "Agentic coding, debugging, refactoring, and testing.",
      cursor: "AI-assisted code editing and development.",
      chatgpt: "Research, requirements analysis, architecture, and problem-solving.",
      codex: "Code implementation, review, and engineering automation.",
      hermes: "Agent orchestration, workflow automation, and experimentation.",
      gemini: "Research, problem-solving, and development assistance.",
      antigravity: "Agent-assisted development, coding, and experimentation.",
      mcp: "Connecting AI assistants to tools, data, and services.",
    },
  },
  km: {
    title: "ឧបករណ៍ជំនួយ AI",
    subtitle: "ប្រើឧបករណ៍ AI ក្នុងការងារវិស្វកម្មប្រចាំថ្ងៃ ដើម្បីជួយបង្កើនប្រសិទ្ធភាពអភិវឌ្ឍន៍ គុណភាពកូដ ការស្រាវជ្រាវ និងស្វ័យប្រវត្តិកម្ម។",
    philosophyLabel: "គោលការណ៍វិស្វកម្ម",
    philosophy: "AI ជួយពន្លឿនការងាររបស់ខ្ញុំ។ ខ្ញុំនៅតែទទួលខុសត្រូវលើស្ថាបត្យកម្ម ការសម្រេចចិត្តផ្នែកវិស្វកម្ម សុវត្ថិភាព ការធ្វើតេស្ត និងការផ្ទៀងផ្ទាត់ចុងក្រោយ។",
    descriptions: {
      claude: "ប្រើ AI agent សម្រាប់សរសេរកូដ កែបញ្ហា កែលម្អរចនាសម្ព័ន្ធកូដ និងធ្វើតេស្ត។",
      cursor: "កែសម្រួលកូដ និងអភិវឌ្ឍកម្មវិធីដោយមានជំនួយពី AI។",
      chatgpt: "ស្រាវជ្រាវ វិភាគតម្រូវការ រៀបចំស្ថាបត្យកម្ម និងដោះស្រាយបញ្ហា។",
      codex: "អនុវត្ត និងពិនិត្យកូដ ព្រមទាំងធ្វើស្វ័យប្រវត្តិកម្មការងារវិស្វកម្ម។",
      hermes: "រៀបចំការងារ AI agents ធ្វើស្វ័យប្រវត្តិកម្ម និងពិសោធន៍។",
      gemini: "ជួយស្រាវជ្រាវ ដោះស្រាយបញ្ហា និងអភិវឌ្ឍកម្មវិធី។",
      antigravity: "អភិវឌ្ឍកម្មវិធី សរសេរកូដ និងពិសោធន៍ដោយមានជំនួយពី AI agents។",
      mcp: "ភ្ជាប់ជំនួយការ AI ទៅឧបករណ៍ ទិន្នន័យ និងសេវាកម្មផ្សេងៗ។",
    },
  },
} as const;

function ToolMark({ tool }: { tool: (typeof tools)[number] }) {
  if ("Icon" in tool) {
    const Icon = tool.Icon;
    return <Icon aria-hidden="true" className="h-6 w-6" />;
  }

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white">
      <Image src={tool.image} alt="" aria-hidden="true" width={32} height={32} className={tool.id === "chatgpt" || tool.id === "codex" ? "h-10 w-10 object-contain" : "h-7 w-7 object-contain"} />
    </span>
  );
}

export default function AiEngineering() {
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <section id="ai-engineering" aria-labelledby="ai-engineering-title" className="rounded-lg border bg-card/80 p-6 sm:p-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="max-w-xl">
            <h3 id="ai-engineering-title" className="text-2xl font-bold tracking-tight sm:text-3xl">{copy.title}</h3>
            <p className="mt-5 text-base leading-7 text-muted-foreground">{copy.subtitle}</p>
            <div className="mt-10 border-l-2 border-foreground/30 pl-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{copy.philosophyLabel}</p>
              <p className="mt-3 text-sm leading-7 text-foreground">{copy.philosophy}</p>
            </div>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {tools.map((tool) => (
              <li key={tool.id} className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-4 py-5 sm:grid-cols-[40px_160px_minmax(0,1fr)] sm:gap-5">
                <span className="flex h-10 w-10 items-center justify-center text-foreground"><ToolMark tool={tool} /></span>
                <div className="min-w-0 sm:contents">
                  <h4 className="text-sm font-semibold text-foreground">{tool.name}</h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground sm:mt-0">{copy.descriptions[tool.id]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
    </section>
  );
}
