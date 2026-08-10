import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly products: Locator;
    readonly sortDropdown: Locator;
    readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator('.inventory_item');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartButton = page.locator('.shopping_cart_link');
    }

    async getProductCount(): Promise<number> {
        return await this.products.count();
    }

    async sortProducts(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async addProductToCart(productName: string) {
        const product = this.page.locator('.inventory_item', {
            hasText: productName
        });

        await product.locator('button').click();
    }

    async openCart() {
        await this.cartButton.click();
    }
}