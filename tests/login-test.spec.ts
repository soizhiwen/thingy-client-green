import { test, expect } from '@playwright/test';

test('Login page is loading', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await expect(page.getByText('Login to your account')).toBeVisible();
});

test('User is redirected to login page if not logged in', async ({ page }) => {
  await page.goto('http://localhost:4200/home/dashboard');
  await expect(page.getByText('Login to your account')).toBeVisible();
});
