import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test.describe('Login Failure Tests', () => {
  test('Display error message for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginpage();
    await loginPage.login(users.standardUser.username, '123456');
    await loginPage.expectInvalidCredentialsError();
  }

)
}
)
