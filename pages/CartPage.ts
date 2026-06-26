import { Page, Locator, expect } from '@playwright/test';


export class CartPage {
   // private readonly baseUrl: string = 'https://www.saucedemo.com/cart.html';
    page: Page;
    private readonly cartlink: Locator;
    private readonly cartBadge: Locator;
    private readonly checkoutButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cartlink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

   /* async goto() {
        await this.page.goto(this.baseUrl); 
    } */
    async openCart() {
        await this.cartlink.click();
    }

    async getCartItemCount(expectedCount: number) {
        await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}
