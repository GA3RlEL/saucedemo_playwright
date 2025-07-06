import { Locator, Page } from "@playwright/test";

export default class MenuPage {
  private page: Page;
  private menuButton: Locator;
  private logoutButton: Locator;
  private cartButton: Locator;

  constructor(page) {
    this.page = page;
    this.menuButton = this.page.locator("#react-burger-menu-btn");
    this.logoutButton = this.page.getByText("Logout");
    this.cartButton = this.page.locator(".shopping_cart_link");
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutButton.click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
}
