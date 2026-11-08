'use client';
import { useState, type FormEvent } from 'react';
import { AssistantMark } from '@/components/assistant-mark';
import type { Locale } from '@/i18n/config';

type Message = { role: 'user' | 'assistant'; content: string };
export function ChatAssistant({ locale }: { locale: Locale }) {
  const km = locale === 'km';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function ask(question: string) {
    if (!question.trim() || busy) return;
    const next: Message[] = [...messages, { role: 'user', content: question.trim() }];
    setMessages(next); setInput(''); setBusy(true); setError('');
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next.slice(-12), language: locale }) });
      const data = await response.json();
      if (!response.ok || typeof data.answer !== 'string') throw new Error('Chat unavailable');
      setMessages((previous) => [...previous, { role: 'assistant', content: data.answer }]);
    } catch { setError(km ? 'សូមព្យាយាមម្តងទៀត។' : 'Unable to answer right now. Please try again.'); }
    finally { setBusy(false); }
  }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void ask(input); }
  return <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3">
    {open && <section aria-label={km ? 'ជំនួយការ AI' : 'Portfolio AI assistant'} className="flex max-h-[min(38rem,calc(100dvh-6rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-rule bg-surface text-ink shadow-xl">
      <header className="flex items-center gap-3 border-b border-rule p-4"><AssistantMark animate /><div className="flex-1"><strong className="block">{km ? 'សួរអំពី Dapravith' : 'Ask about Dapravith'}</strong><span className="text-small text-muted">{km ? 'ជំនួយការគេហទំព័រ' : 'Portfolio assistant'}</span></div><button type="button" onClick={() => setOpen(false)} aria-label={km ? 'បិទការជជែក' : 'Close chat'} className="min-h-11 min-w-11 text-xl">×</button></header>
      <div className="min-h-32 flex-1 space-y-3 overflow-y-auto p-4 text-small" aria-live="polite"><p>{km ? 'សួរខ្ញុំអំពីបទពិសោធន៍ គម្រោង ឬជំនាញរបស់ Dapravith។' : 'Ask me about Dapravith’s experience, projects, or skills.'}</p>{messages.length === 0 && <div className="flex flex-wrap gap-2">{(km ? ['បទពិសោធន៍ការងារ', 'គម្រោង'] : ['Work experience', 'Projects']).map((q) => <button key={q} type="button" onClick={() => void ask(q)} className="min-h-11 rounded border border-rule px-3 text-left text-accent">{q}</button>)}</div>}{messages.map((message, i) => <p key={i} className={`whitespace-pre-wrap rounded-lg p-3 ${message.role === 'user' ? 'ml-6 bg-accent text-accent-ink' : 'mr-6 border border-rule'}`}>{message.content}</p>)}{busy && <p>{km ? 'កំពុងគិត…' : 'Thinking…'}</p>}{error && <p role="alert">{error}</p>}</div>
      <form onSubmit={submit} className="flex gap-2 border-t border-rule p-3"><input aria-label={km ? 'សំណួររបស់អ្នក' : 'Your question'} value={input} onChange={(e) => setInput(e.target.value)} maxLength={1000} placeholder={km ? 'សួរសំណួរ…' : 'Ask a question…'} className="min-w-0 flex-1 rounded border border-rule bg-bg px-3 py-2" /><button disabled={busy || !input.trim()} className="min-h-11 rounded bg-accent px-4 text-accent-ink disabled:opacity-50" type="submit">{km ? 'ផ្ញើ' : 'Send'}</button></form><p className="px-4 pb-3 text-meta text-muted">{km ? 'AI អាចមានកំហុស។ សូមកុំចែករំលែកព័ត៌មានសម្ងាត់។' : 'AI can make mistakes. Please do not share sensitive information.'}</p>
    </section>}
    <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? (km ? 'សួរខ្ញុំ៖ បិទការជជែក' : 'Ask me: Close chat') : (km ? 'សួរខ្ញុំ៖ បើកជំនួយការ AI' : 'Ask me: Open portfolio assistant')} className="flex min-h-12 items-center gap-2 rounded-full border border-rule bg-surface p-2 pr-4 text-small text-ink shadow-lg"><AssistantMark className="h-9 w-9" animate /><span>{km ? 'សួរខ្ញុំ' : 'Ask me'}</span></button>
  </div>;
}
