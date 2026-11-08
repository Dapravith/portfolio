'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, type ReactNode } from 'react';

type Item = { slug: string; categories: string[]; node: ReactNode };
type Option = { value: string; label: string };

/**
 * Category filter backed by the `?category=` search parameter, so a filtered
 * view can be shared. The server renders every project; without JavaScript
 * the full list stays visible.
 */
export function ProjectFilter({
  items,
  options,
  allLabel,
  groupLabel,
  showing,
}: {
  items: Item[];
  options: Option[];
  allLabel: string;
  groupLabel: string;
  showing: Record<number, string>;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const requested = params.get('category');
  const active = options.some((o) => o.value === requested) ? requested : null;
  const visible = active ? items.filter((i) => i.categories.includes(active)) : items;

  const filters: Array<{ value: string | null; label: string }> = [{ value: null, label: allLabel }, ...options];

  return (
    <>
      <nav aria-label={groupLabel} className="mb-8">
        <ul className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = f.value === active;
            const count = f.value ? items.filter((i) => i.categories.includes(f.value as string)).length : items.length;
            return (
              <li key={f.label}>
                <Link
                  href={f.value ? `${pathname}?category=${f.value}` : pathname}
                  scroll={false}
                  replace
                  aria-current={isActive ? 'true' : undefined}
                  className="inline-flex min-h-11 items-center gap-2 rounded border border-rule-strong px-3.5 text-small text-muted hover:border-ink hover:text-ink aria-[current=true]:border-ink aria-[current=true]:bg-ink aria-[current=true]:text-bg"
                >
                  {f.label}
                  <span className="font-mono text-meta opacity-80">{count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <p role="status" className="sr-only">
        {showing[visible.length]}
      </p>
      <div>
        {visible.map((item) => (
          <Fragment key={item.slug}>{item.node}</Fragment>
        ))}
      </div>
    </>
  );
}
