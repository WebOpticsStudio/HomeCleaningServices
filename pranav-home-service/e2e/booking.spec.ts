import { expect, test } from '@playwright/test';

test('empty booking form shows validation errors and does not submit', async ({ page }) => {
  await page.goto('/booking');
  await page.getByRole('button', { name: 'Send booking request' }).click();

  await expect(page.getByText('Enter your full name.')).toBeVisible();
  await expect(page.getByText('Choose a service.')).toBeVisible();
  await expect(page).toHaveURL(/\/booking$/);
});

test('pricing CTA preselects the package on the booking page', async ({ page }) => {
  await page.goto('/pricing');
  await page.getByRole('link', { name: 'Book Standard' }).click();
  await expect(page).toHaveURL(/\/booking\?package=standard/);
});
