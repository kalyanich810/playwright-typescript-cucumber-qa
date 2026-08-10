import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async isProductInCart(productName: string): Promise<boolean> {
        const product = this.page.locator('.cart_item', {
            hasText: productName
        });

        return await product.isVisible();
    }

    async removeProduct(productName: string) {
        const product = this.page.locator('.cart_item', {
            hasText: productName
        });

        await product.locator('button').click();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}