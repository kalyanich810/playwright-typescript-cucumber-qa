import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page, loginPage } from '../hooks/hooks';
import { ProductsPage } from '../pages/ProductsPage';
import { loadEnvironment } from '../utils/env';
const env = loadEnvironment();

let productsPage: ProductsPage;

Given('I am logged in with valid credentials', async function () {
    await loginPage.navigateToLoginPage(env.BASE_URL);

    await loginPage.enterUsername(env.USERNAME);
    await loginPage.enterPassword(env.PASSWORD);

    await loginPage.clickLogin();

    await page.waitForURL('**/inventory.html');

    productsPage = new ProductsPage(page);
});

Then('I should see products on the products page', async function () {
    const productCount = await productsPage.getProductCount();

    expect(productCount).toBeGreaterThan(0);
});

When('I sort products by {string}', async function (option: string) {
    const sortValue: Record<string, string> = {
        'Price (low to high)': 'lohi',
        'Price (high to low)': 'hilo',
        'Name (A to Z)': 'az',
        'Name (Z to A)': 'za'
    };

    await productsPage.sortProducts(sortValue[option]);
});

Then(
    'the products should be sorted by price from low to high',
    async function () {
        const prices = await page
            .locator('.inventory_item_price')
            .allTextContents();

        const numericPrices = prices.map(price =>
            Number(price.replace('$', ''))
        );

        const sortedPrices = [...numericPrices].sort(
            (a, b) => a - b
        );

        expect(numericPrices).toEqual(sortedPrices);
    }
);

When('I add {string} to the cart', async function (productName: string) {
    await productsPage.addProductToCart(productName);
});
