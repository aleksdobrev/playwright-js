import { type Locator, type Page, expect } from "@playwright/test";

export class Navigation {
  readonly page: Page;
  readonly basketCounter: Locator;
  readonly checkoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = page.getByRole("link", { name: "Checkout" });
  }

  async getBasketCount() {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  }

  async goToCheckout() {
    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();
    await expect(this.page).toHaveURL("/basket");
  }
}
