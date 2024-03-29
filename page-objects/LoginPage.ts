import { type Locator, type Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly moveToSignUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.moveToSignUpButton = page.locator('[data-qa="go-to-signup-button"]');
  }

  /**
   * Open Sign Up page from Login Page.
   */
  async moveToSignUp() {
    await this.moveToSignUpButton.waitFor();
    await this.moveToSignUpButton.click();
    await expect(this.page).toHaveURL(/\/signup/);
  }
}
