import { type Locator, type Page, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly addButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButtons = page.locator('[data-qa="product-button"]');
  }

  /**
   * Visits the Products page URL.
   */
  async visit() {
    await this.page.goto("/");
  }

  async addProductToBasket(index: number) {
    const specificAddButton = this.addButtons.nth(index);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");
  }
}
