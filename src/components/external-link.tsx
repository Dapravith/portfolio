import type { ReactNode } from 'react';
import { ArrowUpRight } from './icons';

/** Link to another site: new tab, safe rel, and an announced hint for screen readers. */
export function ExternalLink({
  href,
  children,
  className = 'link',
  newTabLabel,
  icon = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  newTabLabel: string;
  icon?: boolean;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
      {icon && <ArrowUpRight className="ml-0.5 inline-block align-[-0.125em]" />}
    </a>
  );
}
