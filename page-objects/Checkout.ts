import { type Locator, type Page, expect } from "@playwright/test";

export class Checkout {
  readonly page: Page;
  readonly basketCards: Locator;
  readonly basketItemPrice: Locator;
  readonly basketItemRemoveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]');
  }

  async removeCheapestProduct() {
    await this.basketCards.first().waitFor();
    const allPriceTexts = await this.basketItemPrice.allInnerTexts();
    const allPricesNumbers = await allPriceTexts.map((element) => {
      const withoutDollarSign = element.replace("$", "");
      return parseInt(withoutDollarSign, 10);
    });

    console.warn({ allPriceTexts });
    console.warn({ allPricesNumbers });
  }
}
