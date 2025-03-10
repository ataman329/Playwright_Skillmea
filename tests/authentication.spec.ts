import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) =>{
    await page.goto('https://demoqa.com/login');
});

test.describe('Authentication', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    test.skip
    test('Successful login', async ({ page }) => {
        await page.getByText('adriank').isVisible();
        expect (page.getByRole('button', { name: 'Log out'})).toBeVisible();
    });
});