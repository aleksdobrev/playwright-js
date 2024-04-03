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
  readonly savedAddressFirstName: Locator;
  readonly savedAddressLastName: Locator;
  readonly savedAddressStreet: Locator;
  readonly savedAddressPostcode: Locator;
  readonly savedAddressCity: Locator;
  readonly savedAddressCountry: Locator;
  readonly continueToPaymentButton: Locator;

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
    this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]');
    this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]');
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]');
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]');
    this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]');
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
   * It will save the address details and check that the address containers count has increased
   * and the address details are correctly saved and shown inside the container.
   */
  async saveDetails() {
    const addressContainerCountBeforeSaving = await this.addressContainer.count();
    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();

    await expect(this.addressContainer).toHaveCount(addressContainerCountBeforeSaving + 1);

    await this.savedAddressFirstName.first().waitFor();
    expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue());
    await this.savedAddressLastName.first().waitFor();
    expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue());
    await this.savedAddressStreet.first().waitFor();
    expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue());
    await this.savedAddressPostcode.first().waitFor();
    expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postCodeInput.inputValue());
    await this.savedAddressCity.first().waitFor();
    expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue());
    await this.savedAddressCountry.first().waitFor();
    expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue());
  }

  async continueToPayment() {
    await this.continueToPaymentButton.waitFor();
    await this.continueToPaymentButton.click();
    await expect(this.page).toHaveURL(/\/payment/);
  }
}
