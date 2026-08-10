import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page, loginPage } from '../hooks/hooks';

Given('I am on the SauceDemo login page', async function () {
    await loginPage.navigateToLoginPage();
});

When('I enter valid login credentials', async function () {
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
});

When(
    'I enter username {string} and password {string}',
    async function (username: string, password: string) {
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
    }
);

When('I click the login button', async function () {
    await loginPage.clickLogin();
});

Then('I should be successfully logged in', async function () {
    await page.waitForURL('**/inventory.html');
});

Then(
    'I should see the login error message {string}',
    async function (expectedMessage: string) {
        const actualMessage = await loginPage.getLoginErrorMessage();

        expect(actualMessage).toContain(expectedMessage);
    }
);