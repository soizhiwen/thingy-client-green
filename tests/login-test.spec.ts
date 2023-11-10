import { test, expect } from '@playwright/test';

test('Login works', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByTestId('dashboard').getByText('Dashboard')).toBeVisible();
});
