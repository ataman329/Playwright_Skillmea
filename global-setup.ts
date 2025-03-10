import { chromium } from "@playwright/test";
import fs from 'fs';

async function globalSetup() {
    // Create .auth directory if it doesn't exist
    if (!fs.existsSync('.auth')) {
        fs.mkdirSync('.auth', { recursive: true });
    }

    // Setup for user authentication
    const userBrowser = await chromium.launch({ headless: true });
    const userPage = await userBrowser.newPage();

    await userPage.goto('https://demoqa.com/login');
    await userPage.getByPlaceholder('UserName').fill('adriank');
    await userPage.getByPlaceholder('Password').fill('Password666@');
    await userPage.getByRole('button', { name: 'Login'}).click();
    // check logged in
    await userPage.waitForURL('https://demoqa.com/profile');

    await userPage.context().storageState({path: '.auth/user.json'});
    await userBrowser.close();

    // Setup for admin authentication
    const adminBrowser = await chromium.launch({ headless: true });
    const adminPage = await adminBrowser.newPage();

    await adminPage.goto('https://demoqa.com/login');
    await adminPage.getByPlaceholder('UserName').fill('adriank_admin');
    await adminPage.getByPlaceholder('Password').fill('Password666@'); // Assuming same password, change if different
    await adminPage.getByRole('button', { name: 'Login'}).click();
    // check logged in
    await adminPage.waitForURL('https://demoqa.com/profile');

    await adminPage.context().storageState({path: '.auth/admin.json'});
    await adminBrowser.close();
}

export default globalSetup;