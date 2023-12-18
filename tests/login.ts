import { Page } from "@playwright/test";

export async function login(page: Page) {
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('test@test.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Test_666');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
  }