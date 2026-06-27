import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Purchase Flow', () => {
  test('user logs in and purchase two cheapest products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);  
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Navigate to the login page
    await loginPage.goto(); 
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.expectLoginSuccess();

    // Step 2: Add two cheapest products to the cart
    const selectedProducts = await productPage.addTwoCheapestProductsToCart();
    for (const product of selectedProducts) {
      const productName = await product.product.locator('[data-test="inventory-item-name"]').innerText();
      console.log(`Added to cart: ${productName} - $${product.price}`);
    }

    // Step 3: Verify that the cart has 2 items 
    await cartPage.getCartItemCount(2);

    //step 4: Open cart and proceed to checkout page
    await cartPage.openCart();
    await cartPage.clickCheckout();

    // Step 5: Fill in checkout information and complete the purchase
    await checkoutPage.fillCheckoutInfo('Siti', 'Test', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.expectCheckoutOverview();

    // Step 6: Verify item total, tax, and final total
    await checkoutPage.verifyFinalTotalCalculation();   

    // Step 7: Finish the checkout process
    await checkoutPage.clickFinish();
    await checkoutPage.verifyCheckoutComplete();    
   
  });
});
