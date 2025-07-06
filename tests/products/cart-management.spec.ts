import { test } from "@playwright/test";
import POManager from "../../page-objects/POManager";
import users from "../../data/user.json";

test("Add products to cart", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const inventoryPage = poManager.getInventoryPage();
  const menuPage = poManager.getMenuPage();
  const cartPage = poManager.getCartPage();

  // Navigate to the login page
  await loginPage.goto();

  // Fill VALID credentials in the username and password fields
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Assert that the login was successful by checking the URL of the page
  await inventoryPage.isAt();

  // Add a product to the cart
  const productName = "Sauce Labs Backpack";
  await inventoryPage.addProductToCart(productName);

  // Go to cart page
  await menuPage.goToCart();

  // Assert that the cart page is displayed
  await cartPage.isAt();

  // Assert that the product is in the cart
  await cartPage.checkIfItemInCart(productName);
});

test("Remove products from cart", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const inventoryPage = poManager.getInventoryPage();
  const menuPage = poManager.getMenuPage();
  const cartPage = poManager.getCartPage();

  // Navigate to the login page
  await loginPage.goto();

  // Fill VALID credentials in the username and password fields
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Assert that the login was successful by checking the URL of the page
  await inventoryPage.isAt();

  // Add a product to the cart
  const productName = "Sauce Labs Backpack";
  await inventoryPage.addProductToCart(productName);

  // Go to cart page
  await menuPage.goToCart();

  // Assert that the cart page is displayed
  await cartPage.isAt();

  // Assert that the product is in the cart
  await cartPage.checkIfItemInCart(productName);

  // Remove the product from the cart
  await cartPage.removeItemFromCart(productName);

  // Assert that the product is removed
  await cartPage.checkIfItemRemovedFromCart(productName);
});
