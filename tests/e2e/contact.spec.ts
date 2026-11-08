import { expect, test } from '@playwright/test';

const MOCK = 'http://127.0.0.1:3399';

test('shows field errors and focuses the first invalid field', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Your email').fill('not-an-email');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByLabel('Name')).toBeFocused();
  await expect(page.getByLabel('Name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a valid email address.')).toBeVisible();
  await expect(page.getByLabel('Your email')).toHaveAttribute('aria-describedby', 'email-error');
});

test('reports success only after the provider accepts the message', async ({ page, request }) => {
  await page.goto('/contact');
  // The server rejects forms submitted faster than a person could type.
  await page.waitForTimeout(2600);
  const unique = `e2e-${Date.now()}`;
  await page.getByLabel('Name').fill('Test Visitor');
  await page.getByLabel('Your email').fill('visitor@example.com');
  await page.getByLabel('Message', { exact: true }).fill(`Hello from an automated test ${unique}.`);
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page.getByRole('status')).toContainText('accepted for delivery');
  await expect(page.getByLabel('Message', { exact: true })).toHaveValue('');

  const sent = await (await request.get(`${MOCK}/last`)).json();
  expect(sent.text).toContain(unique);
  expect(sent.reply_to).toBe('visitor@example.com');
  expect(sent.authorization).toBe('Bearer e2e-test-key');
});

test('tells the visitor plainly when delivery fails and offers email', async ({ page }) => {
  await page.goto('/contact');
  await page.waitForTimeout(2600);
  await page.getByLabel('Name').fill('Test Visitor');
  await page.getByLabel('Your email').fill('visitor@example.com');
  await page.getByLabel('Message', { exact: true }).fill('This should fail: PROVIDER_FAIL');
  await page.getByRole('button', { name: 'Send message' }).click();

  const alert = page.getByRole('region', { name: 'Send a message' }).getByRole('alert');
  await expect(alert).toContainText('could not be sent');
  await expect(alert.getByRole('link', { name: 'dapravithrotha@gmail.com' })).toHaveAttribute('href', 'mailto:dapravithrotha@gmail.com');
  await expect(page.getByText('accepted for delivery')).toHaveCount(0);
  // Input is kept so the visitor can retry.
  await expect(page.getByLabel('Message', { exact: true })).toHaveValue('This should fail: PROVIDER_FAIL');
});
