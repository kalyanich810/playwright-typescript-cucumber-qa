import { Before, After, Status, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class CustomWorld {
    browser!: Browser;
    page!: Page;
    loginPage!: LoginPage;

    async init() {
        this.browser = await chromium.launch({
            headless: process.env.CI === 'true'
        });

        this.page = await this.browser.newPage();
        this.loginPage = new LoginPage(this.page);
    }
}

setWorldConstructor(CustomWorld);

Before(async function () {
    await this.init();
});

After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot({
            fullPage: true
        });

        await this.attach(screenshot, 'image/png');
    }

    if (this.browser) {
        await this.browser.close();
    }
});