"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Send, X } from "lucide-react";
import { AssistantMark } from "@/components/assistant-mark";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/store/languageStore";

type ChatMessage = { role: "assistant" | "user"; content: string };
type ChatMode = "loading" | "ai" | "local";

const copy = {
  en: {
    open: "Ask about my work", close: "Close assistant", title: "Portfolio assistant",
    intro: "Ask about my experience, skills, projects, or education.",
    ai: "Questions are sent to an AI provider. Avoid sharing private information; verify important answers.",
    local: "Quick answers are available for portfolio questions. General AI answers are unavailable right now.",
    loading: "Checking availability…", placeholder: "Ask a question…", send: "Send message", thinking: "Preparing an answer…",
    error: "I couldn't answer just now. Please try again or email dapravithrotha@gmail.com.",
    rateLimit: "Please wait a moment before sending another question.",
    prompts: ["What is Dapravith's experience?", "What projects has Dapravith worked on?", "What technologies does Dapravith use?"],
  },
  km: {
    open: "សួរអំពីការងាររបស់ខ្ញុំ", close: "បិទជំនួយការ", title: "ជំនួយការគេហទំព័រ",
    intro: "សួរអំពីបទពិសោធន៍ ជំនាញ គម្រោង ឬការសិក្សារបស់ខ្ញុំ។",
    ai: "សំណួរត្រូវបានផ្ញើទៅអ្នកផ្តល់សេវា AI។ សូមកុំចែករំលែកព័ត៌មានឯកជន និងផ្ទៀងផ្ទាត់ចម្លើយសំខាន់ៗ។",
    local: "មានចម្លើយរហ័សសម្រាប់សំណួរអំពីគេហទំព័រនេះ។ ចម្លើយ AI ទូទៅមិនទាន់មាននៅពេលនេះទេ។",
    loading: "កំពុងពិនិត្យលទ្ធភាពប្រើប្រាស់…", placeholder: "សរសេរសំណួរ…", send: "ផ្ញើសារ", thinking: "កំពុងរៀបចំចម្លើយ…",
    error: "មិនអាចឆ្លើយបាននៅពេលនេះទេ។ សូមព្យាយាមម្ដងទៀត ឬផ្ញើអ៊ីមែលទៅ dapravithrotha@gmail.com។",
    rateLimit: "សូមរង់ចាំបន្តិច មុនពេលផ្ញើសំណួរបន្ទាប់។",
    prompts: ["តើ Dapravith មានបទពិសោធន៍អ្វីខ្លះ?", "តើ Dapravith ធ្លាប់ធ្វើគម្រោងអ្វីខ្លះ?", "តើ Dapravith ប្រើបច្ចេកវិទ្យាអ្វីខ្លះ?"],
  },
} as const;

export default function ChatAssistant() {
  const { language } = useLanguage();
  const text = copy[language];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mode, setMode] = useState<ChatMode>("loading");
  const historyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();
    fetch("/api/chat", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => setMode(data.mode === "ai" ? "ai" : "local"))
      .catch(() => { if (!controller.signal.aborted) setMode("local"); });
    return () => controller.abort();
  }, [isOpen]);

  useEffect(() => {
    if (historyRef.current) historyRef.current.scrollTop = historyRef.current.scrollHeight;
  }, [messages, isThinking]);

  async function sendMessage(value: string) {
    const question = value.trim();
    if (!question || isThinking || question.length > 1000) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setIsThinking(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12), language }),
      });
      if (response.status === 429) {
        setMessages((previous) => [...previous, { role: "assistant", content: text.rateLimit }]);
        return;
      }
      if (!response.ok) throw new Error("Chat unavailable");
      const result = await response.json();
      if (typeof result.answer !== "string" || !result.answer.trim()) throw new Error("Empty answer");
      setMode(result.source === "ai" ? "ai" : "local");
      setMessages((previous) => [...previous, { role: "assistant", content: result.answer }]);
    } catch {
      setMessages((previous) => [...previous, { role: "assistant", content: text.error }]);
    } finally {
      setIsThinking(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void sendMessage(input);
    }
    if (event.key === "Escape") setIsOpen(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section id="portfolio-assistant" aria-labelledby="portfolio-assistant-title" className="flex max-h-[min(640px,calc(100dvh-110px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl">
          <header className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex min-w-0 items-start gap-3">
              <AssistantMark animate className="h-10 w-10" />
              <div><h2 id="portfolio-assistant-title" className="text-base font-semibold">{text.title}</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">{text.intro}</p></div>
            </div>
            <Button variant="ghost" size="icon" className="size-8 shrink-0" aria-label={text.close} onClick={() => setIsOpen(false)}><X className="h-4 w-4" /></Button>
          </header>
          <p className="border-b border-border bg-muted/40 px-5 py-3 text-xs leading-5 text-muted-foreground" role="status">{mode === "loading" ? text.loading : mode === "ai" ? text.ai : text.local}</p>
          <div ref={historyRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-4" aria-live="polite" aria-relevant="additions" aria-busy={isThinking}>
            {messages.length === 0 && <div className="space-y-2">{text.prompts.map((prompt) => <button key={prompt} type="button" onClick={() => void sendMessage(prompt)} className="block w-full rounded-lg border border-border px-3 py-2 text-left text-sm leading-6 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{prompt}</button>)}</div>}
            {messages.map((message, index) => (
              <div key={index} className={message.role === "user" ? "flex justify-end" : "flex items-start gap-2"}>
                {message.role === "assistant" && <AssistantMark className="mt-1 h-7 w-7" />}
                <div className={message.role === "user" ? "max-w-[90%] break-words rounded-xl bg-primary px-3 py-2 text-sm leading-6 text-primary-foreground" : "min-w-0 whitespace-pre-wrap break-words rounded-xl bg-muted px-3 py-2 text-sm leading-6 text-foreground"}>{message.content}</div>
              </div>
            ))}
            {isThinking && <div className="flex items-center gap-2 text-sm text-muted-foreground"><AssistantMark animate className="h-7 w-7" /><p>{text.thinking}</p></div>}
          </div>
          <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-border p-4">
            <Textarea ref={inputRef} aria-label={text.placeholder} placeholder={text.placeholder} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} maxLength={1000} rows={2} className="min-h-12 resize-none" />
            <Button type="submit" size="icon" className="size-12 shrink-0" disabled={!input.trim() || isThinking} aria-label={text.send}><Send className="h-4 w-4" /></Button>
          </form>
        </section>
      )}
      <Button onClick={() => { setIsOpen((open) => !open); if (!isOpen) requestAnimationFrame(() => inputRef.current?.focus()); }} aria-label={isOpen ? text.close : text.open} aria-expanded={isOpen} aria-controls="portfolio-assistant" className="h-12 w-12 gap-2 rounded-full p-1.5 shadow-lg sm:w-auto sm:pr-4"><AssistantMark animate={!isOpen} className="size-9" /><span className="hidden sm:inline">{isOpen ? text.close : text.open}</span></Button>
    </div>
  );
}
