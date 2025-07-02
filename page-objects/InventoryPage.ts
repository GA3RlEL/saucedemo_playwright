import { expect, Page } from "@playwright/test";

export default class InventoryPage {
  private page: Page;

  constructor(page) {
    this.page = page;
  }

  async isAt() {
    await this.page.waitForURL("https://www.saucedemo.com/inventory.html");
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(
      "https://www.saucedemo.com/inventory.html"
    );
  }
}
