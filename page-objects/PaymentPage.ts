import { type Locator, type Page, expect } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;
  readonly discountCode: Locator;
  readonly discountCodeInput: Locator;
  readonly submitDiscountCodeButton: Locator;
  readonly discountActiveMessage: Locator;
  readonly discountedPrice: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
    this.discountCodeInput = page.locator('[data-qa="discount-code-input"]');
    this.submitDiscountCodeButton = page.locator('[data-qa="submit-discount-button"]');
    this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]');
    this.discountedPrice = page.locator('[data-qa="total-with-discount-value"]');
    this.totalPrice = page.locator('[data-qa="total-value"]');
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
    await expect(this.discountActiveMessage).not.toBeVisible();
    await expect(this.discountedPrice).not.toBeVisible();
    await this.submitDiscountCodeButton.click();
    await expect(this.discountActiveMessage).toBeVisible();
    await expect(this.discountActiveMessage).toHaveText("Discount activated!");
    await expect(this.discountedPrice).toBeVisible();
    const discountedTotalText = await this.discountedPrice.innerText();
    const discountWithoutDollarSign = discountedTotalText.replace("$", "");
    const discountTotalNumber = parseInt(discountWithoutDollarSign, 10);
    await this.totalPrice.waitFor();
    const regularPriceText = await this.totalPrice.innerText();
    const regularWithoutDollarSign = regularPriceText.replace("$", "");
    const regularPriceNumber = parseInt(regularWithoutDollarSign, 10);
    expect(discountTotalNumber).toBeLessThan(regularPriceNumber);
  }
}
