import { expect, Locator, Page } from "@playwright/test";

export enum SortOption {
  az = "az",
  za = "za",
  lohi = "lohi",
  hilo = "hilo",
}

export interface Product {
  name: string;
  price: number;
}

export default class InventoryPage {
  private page: Page;
  private selectObject: Locator;
  private products: Locator;

  constructor(page) {
    this.page = page;
    this.selectObject = this.page.locator(".product_sort_container");
    this.products = this.page.locator(".inventory_item");
  }

  async isAt() {
    await this.page.waitForURL("https://www.saucedemo.com/inventory.html");
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(
      "https://www.saucedemo.com/inventory.html"
    );
  }

  async selectOption(option: SortOption) {
    await this.selectObject.selectOption(option);
  }

  async getAllProducts() {
    const products: Locator[] = await this.products.all();
    const productDetails: Product[] = [];
    for (const product of products) {
      const name = await product.locator(".inventory_item_name").textContent();
      const price = await product
        .locator(".inventory_item_price")
        .textContent();
      if (price?.split("$")[1]) {
        if (name && price) {
          productDetails.push({
            name: name.trim(),
            price: parseFloat(price.split("$")[1].trim()),
          });
        }
      }
    }

    return productDetails;
  }
}
