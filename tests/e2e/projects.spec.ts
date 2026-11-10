import { expect, test } from '@playwright/test';

test('category filter updates the list and the shareable URL', async ({ page }) => {
  await page.goto('/projects');
  const rows = page.locator('main article');
  const total = await rows.count();
  expect(total).toBeGreaterThanOrEqual(4);

  const filters = page.getByRole('navigation', { name: 'Filter by area' });
  await filters.getByRole('link', { name: /Observability/ }).click();
  await expect(page).toHaveURL(/\?category=observability$/);
  await expect(filters.getByRole('link', { name: /Observability/ })).toHaveAttribute('aria-current', 'true');
  await expect(rows).toHaveCount(1);
  await expect(page.getByRole('status')).toHaveText('Showing 1 project');

  await filters.getByRole('link', { name: /^All/ }).click();
  await expect(rows).toHaveCount(total);
});

test('a filtered URL opened directly shows the filtered list', async ({ page }) => {
  await page.goto('/projects?category=delivery');
  await expect(page.locator('main article')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'DevSecOps pipeline with Jenkins' })).toBeVisible();
});

test('filters are keyboard operable', async ({ page }) => {
  await page.goto('/projects');
  const security = page.getByRole('navigation', { name: 'Filter by area' }).getByRole('link', { name: /Security/ });
  await security.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/category=security/);
});

test('case study has every section, a diagram and a working repository link', async ({ page }) => {
  await page.goto('/projects/retail-microservices-platform');
  await expect(page.getByRole('heading', { level: 1, name: 'Retail microservices platform' })).toBeVisible();
  for (const name of [
    'The problem',
    'My role',
    'Approach',
    'Architecture',
    'Technical decisions',
    'Implementation',
    'Challenges and solutions',
    'Security and reliability',
    'Testing',
    'Trade-offs',
    'Results',
    'Lessons and next steps',
  ]) {
    await expect(page.getByRole('heading', { level: 2, name, exact: true })).toBeVisible();
  }
  await expect(page.locator('figure figcaption')).toContainText('System overview');
  const repo = page.getByRole('link', { name: /github\.com\/Dapravith\/microservices-enterprise-system/ });
  await expect(repo).toHaveAttribute('target', '_blank');
  await expect(repo).toHaveAttribute('rel', 'noopener noreferrer');
});

test('Khmer case study marks English-only text with lang="en"', async ({ page }) => {
  await page.goto('/km/projects/retail-microservices-platform');
  await expect(page.locator('html')).toHaveAttribute('lang', 'km');
  await expect(page.getByText('ការសិក្សាករណីលម្អិតនេះមានជាភាសាអង់គ្លេសនៅឡើយ។')).toBeVisible();
  await expect(page.locator('#problem p[lang="en"]')).toHaveCount(2);
});

test('homepage shows selected work as problem, contribution and result', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'View selected work' }).click();
  await expect(page).toHaveURL(/#work$/);
  const work = page.locator('#work');
  await expect(work.locator('article')).toHaveCount(4);
  for (const term of ['Problem', 'My contribution', 'Result']) await expect(work.locator('dt', { hasText: term })).toHaveCount(4);
  await work.getByRole('link', { name: /Read the case study\s*:\s*Retail microservices platform/ }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Trade-offs' })).toBeVisible();
});
