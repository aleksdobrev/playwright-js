import { type Locator, type Page, expect } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;
  readonly discountCode: Locator;
  readonly discountCodeInput: Locator;
  readonly submitDiscountCodeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
    this.discountCodeInput = page.locator('[data-qa="discount-code-input"]');
    this.submitDiscountCodeButton = page.locator('[data-qa="submit-discount-button"]');
  }

  async activateDiscount() {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();
    await this.discountCodeInput.waitFor();
    await this.discountCodeInput.fill(code);
    await expect(this.discountCodeInput).toHaveValue(code);
    await this.submitDiscountCodeButton.waitFor();
    await this.submitDiscountCodeButton.click();
  }
}
