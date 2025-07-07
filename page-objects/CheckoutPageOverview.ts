import { expect, Locator, Page } from "@playwright/test";

export default class CheckoutPageOverview {
  private page: Page;
  private checkoutProducts: Locator;
  private totalProductsValue: Locator;
  private finishButton: Locator;

  constructor(page) {
    this.page = page;
    this.checkoutProducts = this.page.locator(".cart_item");
    this.totalProductsValue = this.page.locator(".summary_subtotal_label");
    this.finishButton = this.page.locator("#finish");
  }

  async isAt() {
    const url = await this.page.url();
    await expect(url).toBe("https://www.saucedemo.com/checkout-step-two.html");
  }

  async checkIfProductIsInCheckoutOverview(productToCheck: string) {
    const products = await this.checkoutProducts.all();
    const product = await products.find(async (p) => {
      (await p.locator(".inventory_item_name").textContent()) ===
        productToCheck;
    });

    await expect(product).toBeDefined();
  }

  async checkTotalValueOfProducts() {
    const products = await this.checkoutProducts.all();
    let totalValueProducts = 0;
    const totalValueSummaryText = await this.totalProductsValue.textContent();
    for (const product of products) {
      const priceText = await product
        .locator(".inventory_item_price")
        .textContent();
      if (priceText) {
        const priceValue = parseFloat(priceText.split("$")[1]);
        totalValueProducts += priceValue;
      } else {
        throw new Error("Price was not found");
      }
    }
    if (totalValueSummaryText) {
      const totalValueSummary = parseFloat(totalValueSummaryText.split("$")[1]);
      console.log(totalValueSummaryText.split("$"));
      expect(totalValueSummary).toEqual(totalValueProducts);
    }
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}
