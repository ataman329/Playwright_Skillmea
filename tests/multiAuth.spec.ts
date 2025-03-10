import { test, expect } from '@playwright/test';

// Tests with user authentication
test.describe('Home page user', () => {
    test.use({ storageState: '.auth/user.json'});
 

    test('Verify successful user login', async ({ page }) => {
        await page.goto('/profile');
        await expect (page.getByText('adriank')).toBeVisible();
        await expect (page.getByRole('button', { name: 'Log out' })).toBeVisible();
    });
 });

 // Tests with admin authentication
 test.describe('Home page admin', () => {
    test.use({ storageState: '.auth/admin.json'});
 

    test('Verify successful admin login', async ({ page }) => {
        await page.goto('/profile');
        await expect (page.getByText('adriank_admin')).toBeVisible();
        await expect (page.getByRole('button', { name: 'Log out' })).toBeVisible();
    });
 });