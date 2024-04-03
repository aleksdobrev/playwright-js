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

    // Option 1 for laggy inputs: using .fill() with expect.toHaveValue()
    await this.discountCodeInput.fill(code);
    await expect(this.discountCodeInput).toHaveValue(code);

    // Option 2 for laggy inputs: focus field with slow typing
    // await this.discountCodeInput.focus();
    // await this.page.keyboard.type(code, { delay: 500 });

    await this.submitDiscountCodeButton.waitFor();
    await this.submitDiscountCodeButton.click();
    await this.page.pause();
  }
}
