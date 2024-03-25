import { expect, test } from "@playwright/test";

test("Product Page Add to Basket", async ({ page }) => {
  await page.goto("http://localhost:2221/");
  await page.waitForTimeout(1000);
});
