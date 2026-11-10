import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const path = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path('./src'),
      // Marker package that throws outside a React Server build; unit tests call server code directly.
      'server-only': path('./tests/unit/stubs/server-only.ts'),
    },
  },
  test: { include: ['tests/unit/**/*.test.ts'], environment: 'node' },
});
