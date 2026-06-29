import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Failure Tests', () => {
  test('Display error message for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', '123456');
    await loginPage.expectInvalidCredentialsError();
  }

)
}
)
