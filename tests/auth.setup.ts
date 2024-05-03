import { test } from "@playwright/test";

const authFile = "auth.json";

test("auth", async ({ page }) => {
  await page.goto("/login?redirect=/my-account");
  await page.getByPlaceholder("E-Mail").fill(process.env.USER);
  await page.getByPlaceholder("Password").fill(process.env.ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForSelector("[data-qa='delivery-address']");
  await page.context().storageState({ path: authFile });
});
