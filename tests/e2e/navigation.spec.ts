import { expect, test } from '@playwright/test';

test('home shows who, what and how to make contact above the fold content', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Rotha Dapravith' })).toBeVisible();
  await expect(page.getByText('Full-stack Developer, Digital Economy and Business Committee')).toBeVisible();
  await expect(page.getByRole('link', { name: /Download résumé/ }).first()).toHaveAttribute('href', '/rotha-dapravith-resume.pdf');
  await expect(page.getByText(/senior/i)).toHaveCount(0);
});

test('primary navigation reaches every section and marks the current page', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main' });
  for (const [name, path, heading] of [
    ['Projects', '/projects', 'Projects'],
    ['About', '/about', 'About'],
    ['Contact', '/contact', 'Contact'],
  ] as const) {
    await nav.getByRole('link', { name }).click();
    await expect(page).toHaveURL(path);
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    await expect(nav.getByRole('link', { name })).toHaveAttribute('aria-current', 'page');
  }
});

test('language switch keeps the page, sets lang, and is remembered', async ({ page, context }) => {
  await page.goto('/about');
  await page.getByRole('link', { name: /ភាសាខ្មែរ/ }).click();
  await expect(page).toHaveURL('/km/about');
  await expect(page.locator('html')).toHaveAttribute('lang', 'km');
  await expect(page.getByRole('heading', { level: 1, name: 'អំពីខ្ញុំ' })).toBeVisible();

  // A later visit to an English URL goes to the Khmer page.
  await page.goto('/projects');
  await expect(page).toHaveURL('/km/projects');

  await page.getByRole('link', { name: /English/ }).click();
  await expect(page).toHaveURL('/projects');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const cookies = await context.cookies();
  expect(cookies.find((c) => c.name === 'NEXT_LOCALE')?.value).toBe('en');
});

test('theme toggle switches and persists', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const initiallyDark = (await html.getAttribute('class'))?.includes('dark') ?? false;
  await page.getByRole('button', { name: initiallyDark ? 'Switch to light theme' : 'Switch to dark theme' }).click();
  await expect(html).toHaveClass(initiallyDark ? /^(?!.*\bdark\b)/ : /\bdark\b/);
  await page.reload();
  await expect(html).toHaveClass(initiallyDark ? /^(?!.*\bdark\b)/ : /\bdark\b/);
});

test('footer lists email and Telegram on every page', async ({ page }) => {
  for (const path of ['/', '/about', '/km/projects']) {
    await page.goto(path);
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'dapravithrotha@gmail.com' })).toHaveAttribute('href', 'mailto:dapravithrotha@gmail.com');
    await expect(footer.getByRole('link', { name: /@dapravith/ })).toHaveAttribute('href', 'https://t.me/dapravith');
    await expect(footer.getByRole('link', { name: '+855 89 937 798' })).toHaveAttribute('href', 'tel:+85589937798');
  }
});

test('skip link moves focus to the main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});

test('unknown URLs return a 404 page in both languages', async ({ page }) => {
  const res = await page.goto('/does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
  await expect(page.getByText('រកមិនឃើញទំព័រ')).toBeVisible();
});

test('old résumé URLs redirect to the current file', async ({ request }) => {
  const res = await request.get('/resume.pdf', { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers()['location']).toBe('/rotha-dapravith-resume.pdf');
});

test('AI-assisted engineering section and portfolio assistant work', async ({ page }) => {
  await page.goto('/');
  const ai = page.locator('#ai');
  await expect(ai.getByRole('rowheader', { name: 'Debugging' })).toBeVisible();
  await expect(ai.getByText('Claude Code', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Open portfolio assistant' }).click();
  await page.getByRole('button', { name: 'Work experience' }).click();
  await expect(page.getByText(/Full-stack Developer — Digital Economy and Business Committee/)).toBeVisible();
  await page.getByRole('button', { name: 'Close chat' }).first().click();
  await expect(page.getByRole('button', { name: 'Open portfolio assistant' })).toBeVisible();
});
