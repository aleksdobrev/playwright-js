import { type Locator, type Page, expect } from "@playwright/test";

export class DeliveryDetails {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly streetInput: Locator;
  readonly postCodeInput: Locator;
  readonly cityInput: Locator;
  readonly countryDropdown: Locator;
  readonly saveAddressButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
    this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
    this.streetInput = page.locator('[data-qa="delivery-address-street"]');
    this.postCodeInput = page.locator('[data-qa="delivery-postcode"]');
    this.cityInput = page.locator('[data-qa="delivery-city"]');
    this.countryDropdown = page.locator('select[data-qa="country-dropdown"]');
    this.saveAddressButton = page.locator('button[data-qa="save-address-button"]');
  }

  async fillDetails() {
    await this.firstNameInput.waitFor();
    await this.firstNameInput.fill("Ayrton");
    await this.lastNameInput.waitFor();
    await this.lastNameInput.fill("Senna");
    await this.streetInput.waitFor();
    await this.streetInput.fill("Casino square");
    await this.postCodeInput.waitFor();
    await this.postCodeInput.fill("4242");
    await this.cityInput.waitFor();
    await this.cityInput.fill("Monte Carlo");
    await this.countryDropdown.waitFor();
    await this.countryDropdown.selectOption("Monaco");
  }
}
