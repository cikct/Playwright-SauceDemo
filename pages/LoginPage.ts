import { Page, Locator , expect} from '@playwright/test';

export class LoginPage {
   //private readonly baseUrl: string = 'https://www.saucedemo.com'; //moved to playwright.config.ts
  page: Page;
   private readonly usernameInput: Locator;
   private readonly passwordInput: Locator;
   private readonly submitButton: Locator;
   private readonly loginErrorMessage: Locator;


  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="login-button"]');
    this.loginErrorMessage = page.locator('[data-test="error"]');
  
  }

  async navigateToLoginpage() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  
  }

  async expectLoginSuccess() {  
    await this.page.waitForSelector('[data-test="inventory-container"]', { state: 'visible' });
  } 
  
  async expectInvalidCredentialsError() {
    await expect(this.loginErrorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
   
  } 

}