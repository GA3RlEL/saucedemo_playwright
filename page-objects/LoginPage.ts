import { expect, Locator, Page } from "@playwright/test";

export default class LoginPage {
  private page: Page;
  private userNameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;

  constructor(page) {
    this.page = page;
    this.userNameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator("[data-test='error']");
  }

  async isAt() {
    const url = this.page.url();
    expect(url).toBe("https://www.saucedemo.com/");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    // Fill VALID credentials in the username and password fields
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);

    // Click the login button
    await this.loginButton.click();
  }

  async checkErrorMessage(expectedMessage: string) {
    // Get Error message
    const errorMessage = await this.errorMessage.textContent();

    // Assert that the error message is as expected
    await expect(errorMessage).toContain(expectedMessage);
  }
}
