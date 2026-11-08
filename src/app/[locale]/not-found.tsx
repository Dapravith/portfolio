import Link from 'next/link';
import { getDictionary } from '@/i18n/dictionaries';

// not-found.tsx receives no route params, so the page is shown in both languages.
export default function NotFound() {
  const en = getDictionary('en').notFound;
  const km = getDictionary('km').notFound;
  return (
    <div className="page pt-10 pb-section md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 md:pt-16 lg:grid-cols-[13rem_minmax(0,1fr)]">
      <p className="label mb-4 md:pt-3">404</p>
      <div className="min-w-0">
        <h1 className="font-serif text-display font-semibold tracking-[-0.02em]">{en.title}</h1>
        <p className="mt-5 text-lead text-muted">{en.body}</p>
        <p className="mt-4">
          <Link href="/" className="link">
            {en.home}
          </Link>
        </p>
        <div lang="km" className="mt-12 border-t border-rule pt-8">
          <p className="font-serif text-h2 font-semibold">{km.title}</p>
          <p className="mt-3 text-muted">{km.body}</p>
          <p className="mt-4">
            <Link href="/km" className="link">
              {km.home}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
