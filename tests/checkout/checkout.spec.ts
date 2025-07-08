import { test } from "@playwright/test";
import POManager from "../../page-objects/POManager";
import users from "../../data/user.json";

test("Check input field validation", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const inventoryPage = poManager.getInventoryPage();
  const menuPage = poManager.getMenuPage();
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();

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

  // Go to Checkout page
  await cartPage.goToCheckout();

  // Click continue without filling the form
  await checkoutPage.clickContinue();

  // Assert that error message is displayed
  await checkoutPage.checkErrorMessage("Error: First Name is required");

  // Fill the first name field
  await checkoutPage.fulfillForm("Test");

  // Click continue without filling the form
  await checkoutPage.clickContinue();

  // Assert that error message is displayed
  await checkoutPage.checkErrorMessage("Error: Last Name is required");

  // Fill the last name field
  await checkoutPage.fulfillForm(undefined, "Test2");

  // Click continue without filling the form
  await checkoutPage.clickContinue();

  // Assert that error message is displayed
  await checkoutPage.checkErrorMessage("Error: Postal Code is required");
});

test("Complete checkout process", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const inventoryPage = poManager.getInventoryPage();
  const menuPage = poManager.getMenuPage();
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();
  const checkoutPageOverview = poManager.getCheckoutPageOverview();
  const checkoutCompletePage = poManager.getCheckoutCompletePage();

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

  // Go to Checkout page
  await cartPage.goToCheckout();

  // Fill the checkout form
  await checkoutPage.fulfillForm("Jhon", "Doe", "10-234");

  // Click continue to proceed
  await checkoutPage.clickContinue();

  // Assert that Checkout page overview is visible by checking url
  await checkoutPageOverview.isAt();

  // Assert that product is visible in overview
  await checkoutPageOverview.checkIfProductIsInCheckoutOverview(productName);

  // Assert that total value of products is correct
  await checkoutPageOverview.checkTotalValueOfProducts();

  // Finish the order
  await checkoutPageOverview.finishOrder();

  // Assert checkout complete page is displayed
  await checkoutCompletePage.isAt();

  // Assert "Thank you for your order!" message is displayed
  await checkoutCompletePage.checkCompleteOrderMessage();
});

test("Check if products stays in the cart after canceling checkout", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const inventoryPage = poManager.getInventoryPage();
  const menuPage = poManager.getMenuPage();
  const cartPage = poManager.getCartPage();
  const checkoutPage = poManager.getCheckoutPage();

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

  // Go to Checkout page
  await cartPage.goToCheckout();

  // Go back
  await checkoutPage.goBack();

  // Assert we are back on the cart page
  await cartPage.isAt();

  // Assert that produts are still in the cart
  await cartPage.checkIfItemInCart(productName);
});
