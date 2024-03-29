import { type Locator, type Page, expect } from "@playwright/test";

export class Checkout {
  readonly page: Page;
  readonly basketCards: Locator;
  readonly basketItemPrice: Locator;
  readonly basketItemRemoveButton: Locator;
  readonly continueToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]');
    this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');
  }

  async removeCheapestProduct() {
    await this.basketCards.first().waitFor();
    const itemsBeforeRemoval = await this.basketCards.count();
    const allPriceTexts = await this.basketItemPrice.allInnerTexts();
    const allPricesNumbers = allPriceTexts.map((element) => {
      const withoutDollarSign = element.replace("$", "");
      return parseInt(withoutDollarSign, 10);
    });
    const smallestPrice = Math.min(...allPricesNumbers);
    const smallestPriceIndex = allPricesNumbers.indexOf(smallestPrice);
    const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIndex);
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
  }

  async continueToCheckout() {
    await this.continueToCheckoutButton.waitFor();
    await this.continueToCheckoutButton.click();
    await expect(this.page).toHaveURL(/\/login/);
  }
}
