import { Page } from "@playwright/test";
import LoginPage from "./LoginPage";
import InventoryPage from "./InventoryPage";
import MenuPage from "./MenuPage";
import CartPage from "./CartPage";

export default class POManager {
  private page: Page;
  public loginPage: LoginPage;
  public inventoryPage: InventoryPage;
  public menuPage: MenuPage;
  public cartPage: CartPage;

  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.menuPage = new MenuPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getInventoryPage() {
    return this.inventoryPage;
  }

  getMenuPage() {
    return this.menuPage;
  }

  getCartPage() {
    return this.cartPage;
  }
}
