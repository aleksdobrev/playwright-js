import { type Locator, type Page, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly addButtons: Locator;
  readonly basketCounter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
  }

  /**
   * Visits the Products page URL.
   */
  async visit() {
    await this.page.goto("/");
  }

  /**
   * It will click on the "Add to Basket" button with the specified index and inspect that the title had changed.
   */
  async addProductToBasket(index: number) {
    const specificAddButton = this.addButtons.nth(index);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");
    const basketCountBeforeAdding = await this.getBasketCount();
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");
    const basketCountAfterAdding = await this.getBasketCount();
    expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
  }

  async getBasketCount() {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  }
}
