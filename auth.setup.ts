import { chromium } from "@playwright/test";

const authFile = "auth.json";

export default async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("http://localhost:2221/login?redirect=/my-account");
  await page.getByPlaceholder("E-Mail").fill(process.env.USER);
  await page.getByPlaceholder("Password").fill(process.env.ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForSelector("[data-qa='delivery-address']");
  await page.context().storageState({ path: authFile });
};
