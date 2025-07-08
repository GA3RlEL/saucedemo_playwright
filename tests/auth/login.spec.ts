import { expect, test } from "@playwright/test";
import users from "../../data/user.json";
import POManager from "../../page-objects/POManager";

test("Login with valid credentials", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const inventoryPage = poManager.getInventoryPage();

  // Navigate to the login page
  await loginPage.goto();

  // Fill VALID credentials in the username and password fields
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Assert that the login was successful by checking the URL of the page
  await inventoryPage.isAt();
});

test("Login with invalid credentials", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  // Navigate to the login page
  await loginPage.goto();

  // Fill INVALID credentials in the username and password fields
  await loginPage.login(users.invalidUser.username, users.invalidUser.password);

  // Assert that the login failed by checking the error message
  await loginPage.checkErrorMessage(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Login with locked user", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  // Navigate to the login page
  await loginPage.goto();

  // Fill credentials for a locked user
  await loginPage.login(users.blockedUser.username, users.blockedUser.password);

  // Assert error message for blocked user
  await loginPage.checkErrorMessage(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("Login with empty login and password fields", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  // Navigate to the login page
  await loginPage.goto();

  // Enter empty credentials
  await loginPage.login("", "");

  // Assert error message empty credentials
  await loginPage.checkErrorMessage("Epic sadface: Username is required");
});
