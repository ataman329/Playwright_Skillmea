import { test, expect } from '@playwright/test'

test('Test na git', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.locator('svg').first().click();
    await page.getByText('Radio Button').click();
    await page.getByText('Yes').click();
    await page.getByText('Check Box').click();
    await page.locator('#tree-node').getByRole('img').nth(3).click();    
});