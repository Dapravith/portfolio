import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';

// Element mapping for journal articles (src/content/journal/*.mdx). Styling
// lives in the `.article` rules in globals.css; this file only adds behaviour.
const components: MDXComponents = {
  // Code blocks scroll horizontally; tabIndex makes them keyboard-scrollable (WCAG 2.1.1).
  pre: (props: ComponentPropsWithoutRef<'pre'>) => <pre tabIndex={0} {...props} />,
  a: ({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) =>
    href.startsWith('http') ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
