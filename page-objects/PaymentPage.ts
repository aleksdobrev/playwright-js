import { type Locator, type Page, expect } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
