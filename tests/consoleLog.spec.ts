import { test, expect } from '@playwright/test';

// Create an isolated test that doesn't use the shared fixtures
test.describe('Console log errors', () => {
    // Force new browser instance for this test    
    test('Page has no errors or logs', async ({ browser }) => {
        // Create a fresh context and page for this test
        const context = await browser.newContext();
        const page = await context.newPage();
        
        const logs: any[] = [];
        page.on("console", (message) => {
            logs.push({ message: message.text(), type: message.type() });
        });

        const errors: any[] = [];
        page.on("pageerror", (exception) => {
            errors.push(exception);
        });

        await page.goto('https://demoqa.com/');
        
        // Wait a bit to collect any logs/errors
        await page.waitForTimeout(1000);
        
        console.log('Logs:', logs);
        expect.soft(logs.length).toBe(2);
        console.log('Errors:', errors);
        expect(errors.length).toBe(0);
        
        // Clean up
        await context.close();
    });
});