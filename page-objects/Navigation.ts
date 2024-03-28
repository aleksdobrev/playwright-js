import { type Locator, type Page } from "@playwright/test";

export class Navigation {
  readonly page: Page;
  readonly basketCounter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
  }

  async getBasketCount() {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  }
}
