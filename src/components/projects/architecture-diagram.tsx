import type { Project } from '@/content';

type Diagram = Project['caseStudy']['architecture']['diagram'];

/**
 * A tiered system diagram built from content data. It is real HTML (lists,
 * text), so it reflows on narrow screens, follows the theme and is read
 * correctly by screen readers — unlike an exported image.
 */
export function ArchitectureDiagram({
  diagram,
  caption,
  flowsHeading,
}: {
  diagram: Diagram;
  caption: string;
  flowsHeading: string;
}) {
  return (
    <div lang="en">
      <figure className="rounded border border-rule bg-surface p-4 sm:p-6">
        <ol className="space-y-0">
          {diagram.tiers.map((tier, i) => (
            <li key={tier.label}>
              {i > 0 && (
                <div aria-hidden className="flex h-6 justify-start pl-4 sm:pl-[calc(8rem+1.5rem+1rem)]">
                  <span className="w-px bg-rule-strong" />
                </div>
              )}
              <div className="grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-center sm:gap-x-6">
                <span className="font-mono text-meta tracking-[0.04em] text-muted uppercase">{tier.label}</span>
                <ul className="flex flex-wrap gap-2">
                  {tier.nodes.map((node) => (
                    <li key={node.name} className="min-w-0 rounded-sm border border-rule-strong bg-bg px-3 py-2">
                      <span className="block font-mono text-small font-medium break-words">{node.name}</span>
                      {node.note && <span className="block text-meta text-muted">{node.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <figcaption className="mt-5 border-t border-rule pt-3 text-meta text-muted">{caption}</figcaption>
      </figure>

      <h3 className="mt-8 font-semibold">{flowsHeading}</h3>
      <ol className="mt-3 space-y-2 text-small [counter-reset:flow]">
        {diagram.flows.map((flow) => (
          <li
            key={flow}
            className="relative pl-9 [counter-increment:flow] before:absolute before:left-0 before:font-mono before:text-meta before:text-accent before:content-[counter(flow,decimal-leading-zero)] before:leading-[1.7]"
          >
            {flow}
          </li>
        ))}
      </ol>
    </div>
  );
}
