import { test, expect } from '@playwright/test';
import { login } from './login';

const navItems = ['Dashboard', 'Users', 'Plants'];
for (const navItem of navItems) {
  test(`navigating to ${navItem} works`, async ({ page }) => {
    await page.goto('https://soizhiwen.com/');
    login(page);

    await page.getByTestId(`${navItem}-nav`).click();
    await expect(page).toHaveURL(`https://soizhiwen.com/home/${navItem.toLowerCase()}`);
  });
}