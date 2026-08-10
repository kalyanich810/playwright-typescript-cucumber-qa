import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../hooks/hooks';
import { loadEnvironment } from '../utils/env';

const env = loadEnvironment();

Given(
    'I am on the SauceDemo login page',
    async function (this: CustomWorld) {
        await this.loginPage.navigateToLoginPage(env.BASE_URL);
    }
);

When(
    'I enter valid login credentials',
    async function (this: CustomWorld) {
        await this.loginPage.enterUsername(env.USERNAME);
        await this.loginPage.enterPassword(env.PASSWORD);
    }
);

When(
    'I enter username {string} and password {string}',
    async function (
        this: CustomWorld,
        username: string,
        password: string
    ) {
        await this.loginPage.enterUsername(username);
        await this.loginPage.enterPassword(password);
    }
);

When(
    'I click the login button',
    async function (this: CustomWorld) {
        await this.loginPage.clickLogin();
    }
);

Then(
    'I should be successfully logged in',
    async function (this: CustomWorld) {
        await this.page.waitForURL('**/inventory.html');
    }
);

Then(
    'I should see the login error message {string}',
    async function (
        this: CustomWorld,
        expectedMessage: string
    ) {
        const actualMessage =
            await this.loginPage.getLoginErrorMessage();

        expect(actualMessage).toContain(expectedMessage);
    }
);