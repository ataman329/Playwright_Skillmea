import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' }); // Ak chceš bežať testy za sebou

test.describe('Google Tests', () => {
  test.use({ baseURL: 'https://google.com' });

  test('has title', async ({ page }) => {
    await page.goto('/');
    await page.pause();
    await page.getByRole('button', { name: 'Prijať všetko' }).click(); // tento riadok som sem vlozil pomocou Record a manualne som siel na Google.com
    await expect(page).toHaveTitle(/Google/); // Expect a title "to contain" a substring.
  });
});

test.describe('YouTube Tests', () => {
  test.use ( { baseURL: 'https://youtube.com'});

  test('get started link', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accept the use of cookies and' }).click(); // Click the get started link.
  });
  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  // await expect(page).toHaveURL(/.*intro/);
});