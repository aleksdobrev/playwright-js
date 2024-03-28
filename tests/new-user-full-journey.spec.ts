import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";

test.only("New user full end-to-end test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  // await page.pause();
});
