import { expect, test } from "@playwright/test";
import users from "../../data/user.json";

test.beforeEach(async ({ page }) => {
  // Navigate to the login page
  await page.goto("https://www.saucedemo.com/");
});

test("Login with valid credentials", async ({ page }) => {
  // Fill VALID credentials in the username and password fields
  await page.locator("#user-name").fill(users.validUser.username);
  await page.locator("#password").fill(users.validUser.password);

  // Click the login button
  await page.locator("#login-button").click();

  // Assert that the login was successful by checking the URL of the page
  await page.waitForURL("https://www.saucedemo.com/inventory.html");
  const url = await page.url();
  await expect(url).toBe("https://www.saucedemo.com/inventory.html");
});

test("Login with invalid credentials", async ({ page }) => {
  // Fill INVALID credentials in the username and password fields
  await page.locator("#user-name").fill(users.invalidUser.username);
  await page.locator("#password").fill(users.invalidUser.password);

  // Click the login button
  await page.locator("#login-button").click();

  // Assert that the login failed by checking the error message
  const errorMessage = await page.locator("[data-test='error']").textContent();
  await expect(errorMessage).toContain(
    "Epic sadface: Username and password do not match any user in this service"
  );
});
