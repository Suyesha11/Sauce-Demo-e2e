import { ProductPage } from "../pages/ProductPage";
import { test, expect } from "../fixture/auth-fixture";
import { productFilters } from "../utils/productFilters";

test.describe("Product Page Tests for Standard User", () => {
  let productPage: ProductPage;
  test.beforeEach(async ({ loginAsStandardUser }) => {
    productPage = new ProductPage(loginAsStandardUser);
  });

  test("should display correct number of product filters", async () => {
    const filterCount = await productPage.getProductFilters();
    expect(filterCount).toBe(4);
  });

  test("should sort products by ascending name", async () => {
    await productPage.selectProductFilter(productFilters.ascendingName);
    const productNames = await productPage.getProductNames();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

  test("should sort products by descending name", async () => {
    await productPage.selectProductFilter(productFilters.descendingName);
    const productNames = await productPage.getProductNames();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  });

  test("should sort products by ascending price", async () => {
    await productPage.selectProductFilter(productFilters.ascendingPrice);
    const prices = await productPage.getProductPrice();
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test("should sort products by descending price", async () => {
    await productPage.selectProductFilter(productFilters.descendingPrice);
    const prices = await productPage.getProductPrice();
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  test("should be able to add and remove product from cart", async () => {
    await productPage.addFirstProductToCart();
    expect(await productPage.getShoppingCartBadgeText()).toBe("1");

    await productPage.removeFirstProductFromCart();
    await expect(productPage.getShoppingCartBadgeLocator()).not.toBeVisible();
  });

  test("adding product to cart should change the text of add to cart button to remove", async () => {
    await productPage.addFirstProductToCart();
    await expect(productPage.getFirstProductRemoveButton()).toBeVisible();
  });

  test("should naviagte to product details page when clicking on product name", async ({
    page,
  }) => {
    const productName = await productPage.getFirstProductName();
    await productPage.clickFirstProductName();
    await expect(page).toHaveURL(/inventory-item.html\?id=\d+/);
    await expect(page.getByTestId("inventory-item-name")).toHaveText(
      productName,
    );
  });

  test("should be able to add multiple products to cart and verify badge count", async () => {
    await productPage.selectProductFilter(productFilters.ascendingPrice);
    await productPage.addFirstProductToCart();
    await productPage.addLastProductToCart();
    expect(await productPage.getShoppingCartBadgeText()).toBe("2");
  });
});

test.describe("Product page tests for Problem User", () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ loginAsProblemUser }) => {
    productPage = new ProductPage(loginAsProblemUser);
  });

  test("each product should have a unique image", async () => {
    const imgSrcs = await productPage.getProductImageSrcs();
    const allSame = imgSrcs.every((src) => src === imgSrcs[0]);
    expect(allSame).toBe(true);
  });
});
