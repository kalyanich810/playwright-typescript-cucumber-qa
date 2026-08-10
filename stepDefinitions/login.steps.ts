import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
});

After(async function () {
    await browser.close();
});

Given('I am on the SauceDemo login page', async function () {
    await loginPage.navigateToLoginPage();
});

When('I enter valid login credentials', async function () {
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
});

When('I click the login button', async function () {
    await loginPage.clickLogin();
});

Then('I should be successfully logged in', async function () {
    await page.waitForURL('**/inventory.html');
});