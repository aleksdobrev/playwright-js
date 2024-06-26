import { type Locator, type Page, expect } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder("E-Mail");
    this.passwordInput = page.getByPlaceholder("Password");
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  /**
   * Fill in the sign up form with random data for a new user and click on Register button.
   */
  async signUpAsNewUser(email, password) {
    await this.emailInput.waitFor();
    await this.emailInput.fill(email);
    await this.passwordInput.waitFor();
    await this.passwordInput.fill(password);
    await this.registerButton.waitFor();
    await this.registerButton.click();
  }
}
