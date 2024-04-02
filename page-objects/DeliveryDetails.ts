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
  readonly addressContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
    this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
    this.streetInput = page.locator('[data-qa="delivery-address-street"]');
    this.postCodeInput = page.locator('[data-qa="delivery-postcode"]');
    this.cityInput = page.locator('[data-qa="delivery-city"]');
    this.countryDropdown = page.locator('select[data-qa="country-dropdown"]');
    this.saveAddressButton = page.locator('button[data-qa="save-address-button"]');
    this.addressContainer = page.locator('[data-qa="saved-address-container"]');
  }

  /**
   * It fills all fields of the Delivery Details form.
   */
  async fillDetails(userDetails: any) {
    await this.firstNameInput.waitFor();
    await this.firstNameInput.fill(userDetails.firstName);
    await this.lastNameInput.waitFor();
    await this.lastNameInput.fill(userDetails.lastName);
    await this.streetInput.waitFor();
    await this.streetInput.fill(userDetails.street);
    await this.postCodeInput.waitFor();
    await this.postCodeInput.fill(userDetails.postcode);
    await this.cityInput.waitFor();
    await this.cityInput.fill(userDetails.city);
    await this.countryDropdown.waitFor();
    await this.countryDropdown.selectOption(userDetails.country);
  }

  /**
   * It will save the address details and check that the address containers count has increased.
   */
  async saveDetails() {
    const addressContainerCountBeforeSaving = await this.addressContainer.count();
    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();
    await expect(this.addressContainer).toHaveCount(addressContainerCountBeforeSaving + 1);
  }
}
