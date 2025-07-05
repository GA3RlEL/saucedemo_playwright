import { Locator, Page } from "@playwright/test";

export default class MenuPage {
  private page: Page;
  private menuButton: Locator;
  private logoutButton: Locator;

  constructor(page) {
    this.page = page;
    this.menuButton = this.page.locator("#react-burger-menu-btn");
    this.logoutButton = this.page.getByText("Logout");
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutButton.click();
  }
}
