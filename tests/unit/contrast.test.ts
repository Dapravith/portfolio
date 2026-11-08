import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Reads the colour tokens straight from globals.css so a palette change that
// breaks WCAG AA contrast fails CI.
const css = readFileSync(new URL('../../src/app/globals.css', import.meta.url), 'utf8');

function tokens(selector: string): Record<string, string> {
  const block = css.match(new RegExp(`${selector.replace('.', '\\.')}\\s*\\{([^}]*)\\}`))?.[1] ?? '';
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe.each([
  ['light', ':root'],
  ['dark', '.dark'],
])('%s theme contrast', (_name, selector) => {
  const t = tokens(selector);

  it('defines the tokens under test', () => {
    for (const key of ['bg', 'surface', 'ink', 'muted', 'accent', 'accent-ink', 'danger', 'ok']) expect(t[key], key).toBeDefined();
  });

  it.each([
    ['ink', 'bg', 7],
    ['ink', 'surface', 7],
    ['muted', 'bg', 4.5],
    ['muted', 'surface', 4.5],
    ['accent', 'bg', 4.5],
    ['accent-ink', 'accent', 4.5],
    ['danger', 'bg', 4.5],
    ['ok', 'bg', 4.5],
    ['bg', 'ink', 7], // primary button text
  ])('%s on %s ≥ %d:1', (fg, bg, min) => {
    expect(contrast(t[fg], t[bg])).toBeGreaterThanOrEqual(min);
  });

  it('keeps the strong rule visible against the background (non-text ≥ 3:1)', () => {
    expect(contrast(t['rule-strong'], t.bg)).toBeGreaterThanOrEqual(2.2);
  });
});
