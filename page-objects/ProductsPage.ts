import { type Locator, type Page, expect } from "@playwright/test";
import { Navigation } from "./Navigation";

export class ProductsPage {
  readonly page: Page;
  readonly addButtons: Locator;
  readonly sortDropdown: Locator;
  readonly productTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitle = page.locator('[data-qa="product-title"]');
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
    const navigation = new Navigation(this.page);
    const basketCountBeforeAdding = await navigation.getBasketCount();
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");
    const basketCountAfterAdding = await navigation.getBasketCount();
    expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
  }

  /**
   * It will sort the products by price in ascending order.
   */
  async sortByCheapest() {
    await this.sortDropdown.waitFor();
    await this.productTitle.first().waitFor();
    const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();
    await this.sortDropdown.selectOption("price-asc");
    const productTitlesAfterSorting = await this.productTitle.allInnerTexts();
    expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);
  }
}
