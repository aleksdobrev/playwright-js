import { type Page } from "@playwright/test";

export class MyAccountPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("/my-account");
  }
}
