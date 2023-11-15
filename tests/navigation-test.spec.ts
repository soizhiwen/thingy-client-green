import { test, expect } from '@playwright/test';

const navItems = ['Dashboard', 'Users', 'Plants'];
for (const navItem of navItems) {
  test(`navigating to ${navItem} works`, async ({ page }) => {
    await page.goto('http://localhost:4200/home');

    await page.getByTestId(`${navItem}-nav`).click();
    await expect(page).toHaveURL(`http://localhost:4200/home/${navItem.toLowerCase()}`);
  });
}