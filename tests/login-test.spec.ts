import { test, expect } from '@playwright/test';
import { login } from './login';

test('User can log in and log out', async ({ page }) => {
  await page.goto('https://soizhiwen.com/');
  await login(page);

  await expect(page).toHaveURL(`https://soizhiwen.com/home/dashboard`);
  await page.getByRole('button', { name: 'Logout', exact: true }).click();
});

