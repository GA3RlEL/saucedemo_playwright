import { expect, Locator, Page } from "@playwright/test";

export default class CheckoutCompletePage {
  private page: Page;
  private completeOrderMessage: Locator;

  constructor(page) {
    this.page = page;
    this.completeOrderMessage = this.page.locator(".complete-header");
  }

  async isAt() {
    const url = await this.page.url();
    expect(url).toBe("https://www.saucedemo.com/checkout-complete.html");
  }

  async checkCompleteOrderMessage() {
    const message = await this.completeOrderMessage.textContent();
    await expect(message).toContain("Thank you for your order!");
  }
}
