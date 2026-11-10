import type { ReactNode } from 'react';

/**
 * Document-style section: a narrow margin column carries the section label,
 * the wide column carries the content. Stacks on small screens.
 */
export function Section({
  id,
  label,
  title,
  intro,
  children,
  aside,
}: {
  id: string;
  label: string;
  title?: string;
  intro?: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
}) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} aria-label={title ? undefined : label} className="scroll-mt-4 border-t border-rule py-section">
      <div className="page grid gap-y-5 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <div>
          <p className="label md:pt-2">{label}</p>
          {aside}
        </div>
        <div className="min-w-0">
          {title && (
            <h2 id={headingId} className="font-serif text-h2 font-semibold tracking-[-0.01em]">
              {title}
            </h2>
          )}
          {intro && <div className="mt-3 max-w-prose text-muted">{intro}</div>}
          <div className={title || intro ? 'mt-8' : ''}>{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Page-level header for inner pages. */
export function PageHeader({ label, title, children }: { label?: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div className="page pt-10 pb-12 md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 md:pt-16 md:pb-16 lg:grid-cols-[13rem_minmax(0,1fr)]">
      <div className="mb-4 md:mb-0">{label}</div>
      <div className="min-w-0">
        <h1 className="font-serif text-display font-semibold tracking-[-0.02em]">{title}</h1>
        {children && <div className="mt-5 max-w-[42rem] text-lead text-muted">{children}</div>}
      </div>
    </div>
  );
}
