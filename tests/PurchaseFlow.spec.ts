import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import {users} from '../test-data/users';

test.describe('Purchase Flow', () => {
  test('user logs in and purchase two cheapest products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);  
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Navigate to the login page
    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLoginpage(); 
      await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
    );
      await loginPage.expectLoginSuccess();
  });

    // Step 2: Add two cheapest products to the cart
    await test.step('Add two cheapest products to the cart', async () => {
      const selectedProducts = await productPage.addTwoCheapestProductsToCart();
      for (const product of selectedProducts) {
       console.log(`Added to cart: ${product.productName} - $${product.price}`);
    }
  });

    // Step 3: Verify that the cart has 2 items 
    await test.step('Verify cart item count', async () => {
      await cartPage.getCartItemCount(2);
    });

    //step 4: Open cart and proceed to checkout page
    await test.step('Open cart and proceed to checkout', async () => {
      await cartPage.openCart();
      await cartPage.clickCheckout();
    });

    // Step 5: Fill in checkout information and complete the purchase
    await test.step('Fill checkout information', async () => {
      await checkoutPage.fillCheckoutInfo(
        users.checkoutUser.firstName,
        users.checkoutUser.lastName,
        users.checkoutUser.postalCode
      );
    });
    await test.step('Continue to checkout overview', async () => {
      await checkoutPage.clickContinue();
      await checkoutPage.expectCheckoutOverview();
    });

    // Step 6: Verify item total, tax, and final total
    await test.step('Verify final total calculation', async () => {
      await checkoutPage.verifyFinalTotalCalculation();
    });

    // Step 7: Finish the checkout process
    await test.step('Complete checkout', async () => {
      await checkoutPage.clickFinish();
      await checkoutPage.verifyCheckoutComplete();
    });
   
  });
});
