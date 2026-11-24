import { content } from '@/content';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { T } from '@/components/ui/localized-text';

/** The stack from the browser down to operations, split into work and project use. */
export function StackLayers({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <div>
      <div aria-hidden="true" className="hidden grid-cols-[12rem_minmax(0,1fr)_minmax(0,1fr)] gap-x-8 pb-3 lg:grid">
        <span />
        <span className="label">{t.home.stackWork}</span>
        <span className="label">{t.home.stackProjects}</span>
      </div>
      <ol className="border-b border-rule">
        {content.stackLayers.map((layer, i) => (
          <li key={layer.id} className="grid gap-x-8 gap-y-3 border-t border-rule py-5 lg:grid-cols-[12rem_minmax(0,1fr)_minmax(0,1fr)]">
            <h3 className="flex items-baseline gap-3 font-semibold">
              <span className="font-mono text-meta font-normal text-muted">{String(i + 1).padStart(2, '0')}</span>
              <T value={layer.title} locale={locale} />
            </h3>
            <div>
              <p className="label lg:sr-only">{t.home.stackWork}</p>
              <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-small text-ink lg:mt-0">
                {layer.atWork.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {layer.inProjects.length > 0 && (
              <div>
                <p className="label lg:sr-only">{t.home.stackProjects}</p>
                <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-small text-muted lg:mt-0">
                  {layer.inProjects.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
