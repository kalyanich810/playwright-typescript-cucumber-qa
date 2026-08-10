import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export let browser: Browser;
export let page: Page;
export let loginPage: LoginPage;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
});

After(async function () {
    await browser.close();
});