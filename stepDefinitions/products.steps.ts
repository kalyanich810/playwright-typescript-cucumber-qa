import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../hooks/hooks';
import { ProductsPage } from '../pages/ProductsPage';
import { loadEnvironment } from '../utils/env';

const env = loadEnvironment();

let productsPage: ProductsPage;

Given(
    'I am logged in with valid credentials',
    async function (this: CustomWorld) {
        await this.loginPage.navigateToLoginPage(env.BASE_URL);

        await this.loginPage.enterUsername(env.USERNAME);
        await this.loginPage.enterPassword(env.PASSWORD);

        await this.loginPage.clickLogin();

        await this.page.waitForURL('**/inventory.html');

        productsPage = new ProductsPage(this.page);
    }
);

Then(
    'I should see products on the products page',
    async function () {
        const productCount = await productsPage.getProductCount();

        expect(productCount).toBeGreaterThan(0);
    }
);

When(
    'I sort products by {string}',
    async function (option: string) {
        const sortValue: Record<string, string> = {
            'Price (low to high)': 'lohi',
            'Price (high to low)': 'hilo',
            'Name (A to Z)': 'az',
            'Name (Z to A)': 'za'
        };

        await productsPage.sortProducts(sortValue[option]);
    }
);

Then(
    'the products should be sorted by price from low to high',
    async function (this: CustomWorld) {
        const prices = await this.page
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

When(
    'I add {string} to the cart',
    async function (productName: string) {
        await productsPage.addProductToCart(productName);
    }
);