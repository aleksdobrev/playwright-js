import { type Locator, type Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Visits the Products page URL.
   */
  async visit() {
    await this.page.goto("/");
  }
}
