import { expect, test } from "@playwright/test";
import exp from "constants";

test("Product Page Add to Basket", async ({ page }) => {
  await page.goto("http://localhost:2221/");

  const addToBasketButton = page.locator('[data-qa="product-button"]').first();
  const basketCounter = page.locator('[data-qa="header-basket-count"]');

  await addToBasketButton.waitFor();
  await basketCounter.waitFor();
  await expect(addToBasketButton).toHaveText("Add to Basket");
  await expect(basketCounter).toHaveText("0");

  await addToBasketButton.click();

  await expect(addToBasketButton).toHaveText("Remove from Basket");
  await expect(basketCounter).toHaveText("1");

  // await page.pause();
});
