import { test } from "@playwright/test";
import POManager from "../../page-objects/POManager";
import user from "../../data/user.json";

test("Logout from the application", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const inventoryPage = poManager.getInventoryPage();
  const menuPage = poManager.getMenuPage();

  // Login to the application
  await loginPage.goto();
  await loginPage.login(user.validUser.username, user.validUser.password);

  // Verify that the user is on the inventory page
  await inventoryPage.isAt();

  // Logout the user
  await menuPage.logout();

  // Verify that the user is on the login page
  await loginPage.isAt();
});
