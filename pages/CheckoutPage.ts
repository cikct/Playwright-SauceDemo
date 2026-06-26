import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    //private readonly baseUrl: string = 'https://www.saucedemo.com/checkout.html';
    page: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly checkoutOverview: Locator;
    private readonly checkoutComplete: Locator;
    private readonly itemTotal: Locator;
    private readonly tax: Locator;
    private readonly finalTotal: Locator;



    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');

        this.continueButton = page.locator('[data-test="continue"]');
        this.checkoutOverview = page.locator('text=Checkout: Overview');
        this.finishButton = page.locator('[data-test="finish"]');
        this.checkoutComplete = page.locator('[data-test="complete-header"]');
        this.itemTotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.finalTotal = page.locator('[data-test="total-label"]');
    }

   /* async goto() {
        await this.page.goto(this.baseUrl); 
    } */

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }
    async expectCheckoutOverview() {
        await expect(this.checkoutOverview).toBeVisible();
    }

    async getItemTotal(): Promise<string> {
        const text = await this.itemTotal.textContent();
        return text?.replace('Item total: $', '') || '0';
}

    async verifyFinalTotalCalculation() {
    const itemTotal = Number(
        (await this.itemTotal.innerText())
            .replace('Item total: $', '')
    );

    const tax = Number(
        (await this.tax.innerText())
            .replace('Tax: $', '')
    );

    const total = Number(
        (await this.finalTotal.innerText())
            .replace('Total: $', '')
    );

    expect(total).toBeCloseTo(
        itemTotal + tax,
        2
    );
}

    async clickFinish() {
        await this.finishButton.click();
    }
    async verifyCheckoutComplete() {
        await expect(this.checkoutComplete).toHaveText('Thank you for your order!');
    }
}
