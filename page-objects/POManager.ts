import { Page } from "@playwright/test";
import LoginPage from "./LoginPage";
import InventoryPage from "./InventoryPage";

export default class POManager {
  private page: Page;
  public loginPage: LoginPage;
  public inventoryPage: InventoryPage;

  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getInventoryPage() {
    return this.inventoryPage;
  }
}
