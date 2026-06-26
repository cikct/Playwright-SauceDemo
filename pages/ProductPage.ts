import { Page, Locator } from '@playwright/test';

type Product = {
  product: Locator;
  price: number;
};

export class ProductPage {
  private readonly baseUrl: string = 'https://www.saucedemo.com/inventory.html';
  page: Page;
  private readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('[data-test="inventory-item"]');
  }

   /* async goto() {
        await this.page.goto(this.baseUrl); 
    } */

  async addTwoCheapestProductsToCart() {
    const products = await this.productCards.all();

    const productList: Product[] = [];

    for (const product of products) {
      const priceText = await product.locator('[data-test="inventory-item-price"]').innerText();
      const price = Number(priceText.replace(/[^0-9.]/g, ''));

      productList.push({
        product,
        price
      });
    }
    productList.sort((a, b) => a.price - b.price);

    const twoCheapestProducts = productList.slice(0, 2);


  for (const item of twoCheapestProducts) {
    await item.product.getByRole('button', { name: 'Add to cart' }).click();
  }

  return twoCheapestProducts;
  }

}