import { expect, Locator, Page } from "@playwright/test";
import { error } from "console";

export default class CheckoutPage {
  private page: Page;
  private continueButton: Locator;
  private errorMessageContainer: Locator;
  private firstNameField: Locator;
  private lastNameField: Locator;
  private postalCodeField: Locator;
  private cancelButton: Locator;

  constructor(page) {
    this.page = page;
    this.continueButton = this.page.getByRole("button", { name: "Continue" });
    this.errorMessageContainer = this.page.locator(".error-message-container");
    this.firstNameField = this.page.locator("#first-name");
    this.lastNameField = this.page.locator("#last-name");
    this.postalCodeField = this.page.locator("#postal-code");
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async fulfillForm(
    firstName?: string,
    lastName?: string,
    postalCode?: string
  ) {
    if (firstName) {
      await this.firstNameField.fill(firstName);
    }
    if (lastName) {
      await this.lastNameField.fill(lastName);
    }
    if (postalCode) {
      await this.postalCodeField.fill(postalCode);
    }
  }

  async checkErrorMessage(expectedMessage: string) {
    const errorMessage = await this.errorMessageContainer
      .locator("h3")
      .textContent();
    if (errorMessage) {
      await expect(errorMessage).toContain(expectedMessage);
    } else {
      throw new Error("Error message container not found");
    }
  }

  async goBack() {
    await this.cancelButton.click();
  }
}
