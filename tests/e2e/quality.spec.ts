import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { khmerPages, pages, viewportWidths } from './pages';

test.describe('accessibility (axe, WCAG 2.2 AA)', () => {
  for (const scheme of ['light', 'dark'] as const) {
    for (const path of [...pages, ...khmerPages]) {
      test(`${path} — ${scheme}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(path);
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
      });
    }
  }
});

test.describe('responsive layout', () => {
  for (const width of viewportWidths) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of [...pages, '/km', '/km/about']) {
        await page.goto(path);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(0);
      }
    });
  }

  test('interactive controls meet the 44px touch target on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    const controls = page.locator('header a, header button');
    const count = await controls.count();
    for (let i = 0; i < count; i++) {
      const box = await controls.nth(i).boundingBox();
      expect(box?.height ?? 0, await controls.nth(i).innerText()).toBeGreaterThanOrEqual(44);
    }
  });
});

test.describe('SEO basics', () => {
  test('every page has a unique title, description, canonical URL and one h1', async ({ page }) => {
    const titles = new Set<string>();
    for (const path of [...pages, ...khmerPages]) {
      await page.goto(path);
      const title = await page.title();
      expect(titles.has(title), `duplicate title "${title}" on ${path}`).toBe(false);
      titles.add(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      // Next.js serialises the root URL without a trailing slash; both forms are the same URL.
      expect(canonical).toBe(`https://dapravith.vercel.app${path === '/' ? '' : path}`);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('link[rel="alternate"][hreflang="km"]')).toHaveCount(1);
    }
  });

  test('sitemap lists every page and robots points to it', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text();
    for (const path of pages) expect(sitemap).toContain(`https://dapravith.vercel.app${path === '/' ? '/' : path}<`);
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Sitemap: https://dapravith.vercel.app/sitemap.xml');
  });

  test('responses carry security headers', async ({ request }) => {
    const headers = (await request.get('/')).headers();
    expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-powered-by']).toBeUndefined();
  });
});

test('internal links resolve (no broken links)', async ({ page, request }) => {
  const seen = new Set<string>();
  for (const path of [...pages, ...khmerPages]) {
    await page.goto(path);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!));
    for (const href of hrefs) seen.add(href.split('#')[0].split('?')[0] || '/');
  }
  const broken: string[] = [];
  for (const href of seen) {
    const res = await request.get(href);
    if (res.status() >= 400) broken.push(`${href} → ${res.status()}`);
  }
  expect(broken).toEqual([]);
});

test('assistant and AI tools are accessible when opened', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open portfolio assistant' }).click();
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
});
