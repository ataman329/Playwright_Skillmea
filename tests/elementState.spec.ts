import { test, expect } from '@playwright/test';

  test('Element Title', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    console.log(await page.locator('#user-name').isEditable());
    console.log(await page.locator('#password').isVisible());
    console.log(await page.locator('#login-button').isVisible());
    // await page.pause();
    // await page.getByRole('button', { name: 'Prijať všetko' }).click(); // tento riadok som sem vlozil pomocou Record a manualne som siel na Google.com
    // await expect(page).toHaveTitle(/Google/); // Expect a title "to contain" a substring.
  });