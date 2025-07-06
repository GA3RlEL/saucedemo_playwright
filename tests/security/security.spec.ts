import { test } from "@playwright/test";
import POManager from "../../page-objects/POManager";

test("Redirection to login page for non-login users", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  // Attempt to access the inventory page
  await page.goto("https://www.saucedemo.com/inventory.html");

  // Assert that the user was redirected to the login page
  await loginPage.isAt();

  // Attempt to access the cart page
  await page.goto("https://www.saucedemo.com/cart.html");

  // Assert that the user was redirected to the login page
  await loginPage.isAt();

  // Attempt to access the checkout page
  await page.goto("https://www.saucedemo.com/checkout-step-one.html");

  // Assert that the user was redirected to the login page
  await loginPage.isAt();
});
