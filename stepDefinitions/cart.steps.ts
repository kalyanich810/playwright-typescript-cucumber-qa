import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../hooks/hooks';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

let productsPage: ProductsPage;
let cartPage: CartPage;

When('I open the shopping cart', async function () {
    productsPage = new ProductsPage(page);
    await productsPage.openCart();

    cartPage = new CartPage(page);
});

Then('the cart should contain {string}', async function (productName: string) {
    const isProductPresent = await cartPage.isProductInCart(productName);

    expect(isProductPresent).toBe(true);
});

When('I remove {string} from the cart', async function (productName: string) {
    await cartPage.removeProduct(productName);
});

Then('the cart should be empty', async function () {
    const itemCount = await cartPage.getCartItemCount();

    expect(itemCount).toBe(0);
});