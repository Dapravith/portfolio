import Image from 'next/image';
import { content } from '@/content';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { ExternalLink } from './external-link';
import { T } from './localized-text';

/**
 * AI in the workflow: what it helps with at each stage, what stays with me,
 * and the tools. Server-rendered; no client JavaScript.
 */
export function AiEngineering({ locale, t }: { locale: Locale; t: Dictionary }) {
  const { aiPractice, aiTools } = content;
  return (
    <div className="space-y-12">
      <table className="w-full border-collapse text-left text-small">
        <caption className="sr-only">{t.home.aiLabel}</caption>
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-rule-strong">
            <th scope="col" className="label w-40 py-2 pr-6 font-normal">{t.home.aiStage}</th>
            <th scope="col" className="label py-2 pr-6 font-normal">{t.home.aiHelps}</th>
            <th scope="col" className="label py-2 font-normal">{t.home.aiMine}</th>
          </tr>
        </thead>
        <tbody>
          {aiPractice.map((row) => (
            <tr key={row.use} className="grid gap-1 border-b border-rule py-4 md:table-row md:py-0">
              <th scope="row" className="font-semibold md:py-4 md:pr-6 md:align-top">
                {t.home.aiUses[row.use]}
              </th>
              <td className="text-muted md:py-4 md:pr-6 md:align-top">
                <span className="label mt-1 block md:hidden">{t.home.aiHelps}</span>
                <T value={row.ai} locale={locale} />
              </td>
              <td className="md:py-4 md:align-top">
                <span className="label mt-2 block md:hidden">{t.home.aiMine}</span>
                <T value={row.me} locale={locale} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3 className="font-semibold">{t.home.aiTools}</h3>
        <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {aiTools.map((tool) => (
            <li key={tool.name} className="flex items-start gap-3 border-t border-rule py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-rule bg-white p-1">
                <Image src={tool.icon} width={28} height={28} alt="" className="h-7 w-7 object-contain" />
              </span>
              <div className="min-w-0">
                <p className="font-medium">{tool.name}</p>
                <T as="p" value={tool.description} locale={locale} className="text-small text-muted" />
                <p className="tags mt-1">
                  {tool.uses.map((u) => (
                    <span key={u}>{t.home.aiUses[u]}</span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-l-2 border-accent pl-4 text-small">
        {t.home.aiProof}{' '}
        <ExternalLink href="https://github.com/Dapravith/portfolio/commits/main" newTabLabel={t.a11y.opensNewTab}>
          {t.home.aiProofLink}
        </ExternalLink>
      </p>
    </div>
  );
}
