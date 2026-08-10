import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../hooks/hooks';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

let cartPage: CartPage;
let checkoutPage: CheckoutPage;

When('I proceed to checkout', async function () {
    cartPage = new CartPage(page);

    await cartPage.clickCheckout();

    checkoutPage = new CheckoutPage(page);
});

When(
    'I enter checkout details {string}, {string}, {string}',
    async function (
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await checkoutPage.enterCustomerDetails(
            firstName,
            lastName,
            postalCode
        );
    }
);

When('I continue to order overview', async function () {
    await checkoutPage.clickContinue();
});

When('I finish the order', async function () {
    await checkoutPage.clickFinish();
});

Then('I should see the order confirmation message', async function () {
    const message = await checkoutPage.getConfirmationMessage();

    expect(message).toBe('Thank you for your order!');
});