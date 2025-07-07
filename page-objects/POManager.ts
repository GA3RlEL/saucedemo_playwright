import { Page } from "@playwright/test";
import LoginPage from "./LoginPage";
import InventoryPage from "./InventoryPage";
import MenuPage from "./MenuPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import CheckoutPageOverview from "./CheckoutPageOverview";
import CheckoutCompletePage from "./CheckoutCompletePage";

export default class POManager {
  private page: Page;
  public loginPage: LoginPage;
  public inventoryPage: InventoryPage;
  public menuPage: MenuPage;
  public cartPage: CartPage;
  public checkoutPage: CheckoutPage;
  public checkoutPageOverview: CheckoutPageOverview;
  public checkoutCompletePage: CheckoutCompletePage;

  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.menuPage = new MenuPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.checkoutPageOverview = new CheckoutPageOverview(this.page);
    this.checkoutCompletePage = new CheckoutCompletePage(this.page);
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

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getCheckoutPageOverview() {
    return this.checkoutPageOverview;
  }

  getCheckoutCompletePage() {
    return this.checkoutCompletePage;
  }
}
