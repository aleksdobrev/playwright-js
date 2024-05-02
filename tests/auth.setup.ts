import { test } from "@playwright/test";

const authFile = "auth.json";

test("auth", async ({ page }) => {
  await page.goto("/login?redirect=/my-account");
  await page.getByPlaceholder("E-Mail").fill("admin");
  await page.getByPlaceholder("Password").fill("Admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForSelector("[data-qa='delivery-address']");
  await page.context().storageState({ path: authFile });
});
