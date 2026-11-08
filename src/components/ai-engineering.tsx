import Image from 'next/image';
import { aiTools } from '@/content/ai-tools';
import type { Locale } from '@/i18n/config';

export function AiEngineering({ locale }: { locale: Locale }) {
  const km = locale === 'km';
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div>
        <h3 className="font-serif text-h3 font-semibold">{km ? 'ឧបករណ៍ជំនួយ AI' : 'AI Assisted Tools'}</h3>
        <p className="mt-3 text-small text-muted">{km ? 'ឧបករណ៍ដែលខ្ញុំប្រើសម្រាប់ការអភិវឌ្ឍ ស្រាវជ្រាវ និងស្វ័យប្រវត្តិកម្ម។' : 'Tools I use for development, research and automation.'}</p>
        <p className="mt-6 border-l-2 border-accent pl-4 text-small">{km ? 'AI ជួយពន្លឿនការងាររបស់ខ្ញុំ។ ខ្ញុំនៅតែទទួលខុសត្រូវលើស្ថាបត្យកម្ម ការសម្រេចចិត្ត សុវត្ថិភាព ការធ្វើតេស្ត និងការផ្ទៀងផ្ទាត់ចុងក្រោយ។' : 'AI accelerates my workflow. I remain responsible for architecture, engineering decisions, security, testing, and final validation.'}</p>
      </div>
      <ul className="border-b border-rule">
        {aiTools.map((tool) => (
          <li key={tool.name} className="flex items-start gap-3 border-t border-rule py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white p-1"><Image src={tool.icon} width={32} height={32} alt="" className="h-8 w-8 object-contain" /></span>
            <div><h4 className="font-semibold">{tool.name}</h4><p className="text-small text-muted">{tool[locale]}</p></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
