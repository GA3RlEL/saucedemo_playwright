import { expect, Locator, Page } from "@playwright/test";

export default class CartPage {
  private page: Page;
  private cartItems: Locator;

  constructor(page) {
    this.page = page;
    this.cartItems = this.page.locator(".cart_item");
  }

  async isAt() {
    const url = this.page.url();
    expect(url).toContain("/cart.html");
  }

  async findCartItem(productName: string) {
    const items = await this.cartItems.all();

    const item = items.find(async (item) => {
      (await item.locator(".inventory_item_name").textContent()) ===
        productName;
    });

    return item;
  }

  async checkIfItemInCart(productName: string) {
    const item = await this.findCartItem(productName);
    expect(item).toBeDefined();
  }

  async removeItemFromCart(productName: string) {
    const item = await this.findCartItem(productName);

    if (item) {
      const removeButton = item.getByText("Remove");
      await removeButton.click();
    } else {
      throw new Error(`Item with name ${productName} not found in cart`);
    }
  }

  async checkIfItemRemovedFromCart(productName: string) {
    const item = await this.findCartItem(productName);
    expect(item).toBeUndefined();
  }
}
