import { firefox } from "@playwright/test";

const authFile = "auth.json";

// test("auth", async ({ page }) => {
//   await page.goto("/login?redirect=/my-account");
//   await page.getByPlaceholder("E-Mail").fill(process.env.USER);
//   await page.getByPlaceholder("Password").fill(process.env.ADMIN_PASSWORD);
//   await page.getByRole("button", { name: "Login" }).click();
//   await page.waitForSelector("[data-qa='delivery-address']");
//   await page.context().storageState({ path: authFile });
// });

export default async () => {
  const browser = await firefox.launch(); // Or 'chromium' or 'webkit'.
  // Create a new incognito browser context.
  const context = await browser.newContext();
  // Create a new page in a pristine context.
  const page = await context.newPage();

  await page.goto("http://localhost:2221/login?redirect=/my-account");
  await page.getByPlaceholder("E-Mail").fill(process.env.USER);
  await page.getByPlaceholder("Password").fill(process.env.ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForSelector("[data-qa='delivery-address']");
  await page.context().storageState({ path: authFile });
};
