'use client';

import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="system">
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
