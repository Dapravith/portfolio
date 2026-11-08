import { techIcons, type GenericIcon } from '@/lib/tech-icons';

// Decorative: the technology name always sits next to the icon.
const genericPaths: Record<GenericIcon, string> = {
  cloud: 'M4.5 12.5h7.25a2.75 2.75 0 0 0 .4-5.47A4 4 0 0 0 4.4 7.6 2.5 2.5 0 0 0 4.5 12.5Z',
  logs: 'M3 3.5h10M3 6.5h10M3 9.5h7M3 12.5h5',
  architecture: 'M2.5 2.5h4v4h-4zM9.5 2.5h4v4h-4zM6 9.5h4v4H6zM4.5 6.5v1.5h7V6.5M8 8v1.5',
  flow: 'M2.5 4h3.5M10 4h3.5M6 2.5h4v3H6zM8 5.5v3M6 8.5h4v3H6zM12 8v4.5H10',
  shield: 'M8 1.75 13 3.5v4c0 3.1-2.1 5.6-5 6.75C5.1 13.1 3 10.6 3 7.5v-4ZM5.75 8l1.6 1.6L10.5 6.5',
  refactor: 'M2.75 6A5.25 5.25 0 0 1 12.5 4M13.25 10A5.25 5.25 0 0 1 3.5 12M12.5 1.5V4H10M3.5 14.5V12H6',
  java: 'M3 7h8v3.25A3.75 3.75 0 0 1 7.25 14h-.5A3.75 3.75 0 0 1 3 10.25ZM11 8.25h.75a1.75 1.75 0 0 1 0 3.5H11M5.5 2c-.75.9.75 1.85 0 2.75M8.5 2c-.75.9.75 1.85 0 2.75',
  key: 'M10 2.5a3.5 3.5 0 1 1-2.6 5.85L2.5 13.25v1.25h2.25v-1.5h1.5v-1.5h1.5l.4-.4A3.5 3.5 0 0 1 10 2.5ZM11 5h.01',
};

export function TechIcon({ name, className = 'h-4 w-4' }: { name: string; className?: string }) {
  const icon = techIcons[name];
  if (!icon) return null;
  if (icon.kind === 'brand') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={`${className} shrink-0`}>
        <path d={icon.icon.path} />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`${className} shrink-0`}
    >
      <path d={genericPaths[icon.name]} />
    </svg>
  );
}
