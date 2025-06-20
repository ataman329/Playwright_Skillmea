import { test as setup } from "@playwright/test";

let adminUsername = "adriank_admin";
let adminPassword = "Password666@";
const adminAuthFile = ".auth/admin.json";

let userName = "adriank";
let userPassword = "Password666@";
const userAuthFile = ".auth/user.json";


setup ("Create Admin Auth", async ({ page, context }) => {
    await page.goto("https://demoqa.com/login");
    await page.getByPlaceholder("UserName").fill(adminUsername);
    await page.getByPlaceholder("Password").fill(adminPassword);
    await page.getByRole("button", { name: "Login"}).click();
    // check logged in
    await page.waitForURL("https://demoqa.com/profile");

    await context.storageState ({ path: adminAuthFile });
});

setup ("Create User Auth", async ({ page, context }) => {
    await page.goto("https://demoqa.com/login");
    await page.getByPlaceholder("UserName").fill(userName);
    await page.getByPlaceholder("Password").fill(userPassword);
    await page.getByRole("button", { name: "Login"}).click();
    // check logged in
    await page.waitForURL("https://demoqa.com/profile");

    await context.storageState ({ path: userAuthFile });
});