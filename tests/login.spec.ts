import test, { expect } from '../fixtures/basePages';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Login', () =>{
  test.beforeEach(async ({ loginPage }) =>{
    await loginPage.gotoLoginPage();
  })


  test('Succesful login', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.getByText('Swag Labs')).toBeVisible();
  });
  
  test('Succesful login using one const', async ({ page, loginPage }) => {
  
    // await loginPage.enterValidUsername();
    // await loginPage.enterValidPassword();
    // await loginPage.clickLoginButton();
    await loginPage.login();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    // await page.goto('https://www.saucedemo.com/');
    // await page.locator('[data-test="username"]').click();
    // await page.locator('[data-test="username"]').fill('standard_user');
    // await page.locator('[data-test="password"]').click();
    // await page.locator('[data-test="password"]').fill('secret_sauce');
    // await page.locator('[data-test="login-button"]').click();
    // await expect(page.getByText('Swag Labs')).toBeVisible();
  });
  
  test('Cannot login with valid username and invalid password', async ({ page, loginPage }) => {
    test.info().annotations.push({
      type: 'Test',
      description: 'This test will pass if the user is not able to login with valid username and invalid password.'
    });
    await test.step ('Enter valid username', async () => {
      await loginPage.enterValidUsername();
    });
    await test.step ('Enter invalid password', async () => {
      await loginPage.enterInvalidPassword();
    });
    await test.step ('Click login button', async () => {
      await loginPage.clickLoginButton();
    });
    await test.step ('Verify invalid credentials error message', async () => {
      await expect(loginPage.invalidCredentialsErrorMessage, 'Je to dojebane.').toBeVisible();
    });
  });
  
  test('Cannot login with invalid username and valid password', async ({ page, loginPage }) => {
  
    // await loginPage.login();
    // await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await loginPage.enterInvalidUsername();
    await loginPage.enterValidPassword();
    await page.pause();
    await loginPage.clickLoginButton();
    await expect(loginPage.invalidCredentialsErrorMessage).toBeVisible();
  });
  
  test('Cannot login with blank fields', async ({ page, loginPage }) => {
  
    // await loginPage.login();
    // await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    // await loginPage.enterInvalidUsername();
    // await loginPage.enterValidPassword();
    await loginPage.clickLoginButton();
    await expect(loginPage.requiredCredentialsErrorMessage).toBeVisible();
  });
  
  test('Cannot login with locked out user', async ({ page, loginPage }) => {
  
    await loginPage.enterLockedOutUser();
    await loginPage.enterValidPassword();
    await loginPage.clickLoginButton();
    await expect(loginPage.lockedOutErrorMessage).toBeVisible();
  });
});