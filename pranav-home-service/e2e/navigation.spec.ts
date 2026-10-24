import { expect, test } from '@playwright/test';

const pages = [
  { path: '/', heading: /clean/i },
  { path: '/about', heading: /cleaning company/i },
  { path: '/services', heading: 'Cleaning services' },
  { path: '/services/deep-cleaning', heading: 'Deep cleaning' },
  { path: '/gallery', heading: 'Before and after' },
  { path: '/pricing', heading: 'Pricing and packages' },
  { path: '/booking', heading: 'Book a cleaning' },
];

for (const { path, heading } of pages) {
  test(`${path} renders its heading`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(heading);
  });
}

test('unknown service slug returns 404', async ({ page }) => {
  const response = await page.goto('/services/does-not-exist');
  expect(response?.status()).toBe(404);
});

test('health endpoint reports ok', async ({ request }) => {
  const response = await request.get('/api/health');
  expect(response.ok()).toBe(true);
  expect(await response.json()).toMatchObject({ status: 'ok' });
});
