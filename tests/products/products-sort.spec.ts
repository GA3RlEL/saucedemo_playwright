import { expect, test } from "@playwright/test";
import POManager from "../../page-objects/POManager";
import user from "../../data/user.json";
import { Product, SortOption } from "../../page-objects/InventoryPage";

test.beforeEach(async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  // Navigate to login page
  await loginPage.goto();

  // Login with valid credentials
  await loginPage.login(user.validUser.username, user.validUser.password);
});

test("Sort products by price (low to high)", async ({ page }) => {
  const poManager = new POManager(page);
  const inventoryPage = poManager.getInventoryPage();

  //Check if the inventory page is displayed
  await inventoryPage.isAt();

  // Select the "Price (low to high)" option
  await inventoryPage.selectOption(SortOption.lohi);

  // Get all products and take min price
  const products: Product[] = await inventoryPage.getAllProducts();
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  // Assert that the products are sorted by price (low to high)
  await expect(products).toEqual(sortedProducts);

  const minPrice = Math.min(...products.map((product) => product.price));
  const minPriceProduct = products.find(
    (product) => product.price === minPrice
  );

  // Assert that the first product has the lowest price
  const firstProduct = products[0];
  await expect(firstProduct).toBe(minPriceProduct);
});

test("Sort products by price (high to low)", async ({ page }) => {
  const poManager = new POManager(page);
  const inventoryPage = poManager.getInventoryPage();

  //Check if the inventory page is displayed
  await inventoryPage.isAt();

  // Select the "Price (high to low)" option
  await inventoryPage.selectOption(SortOption.hilo);

  // Get all products and take min price
  const products: Product[] = await inventoryPage.getAllProducts();
  const sortedProducts = [...products].sort((a, b) => b.price - a.price);

  // Assert that the products are sorted by price (high to low)
  await expect(products).toEqual(sortedProducts);

  const maxPrice = Math.max(...products.map((product) => product.price));
  const maxPriceProduct = products.find(
    (product) => product.price === maxPrice
  );

  // Assert that the first product has the highest price
  const firstProduct = products[0];
  await expect(firstProduct).toBe(maxPriceProduct);
});

test("Sort products alphabetically (A to Z)", async ({ page }) => {
  const poManager = new POManager(page);
  const inventoryPage = poManager.getInventoryPage();

  //Check if the inventory page is displayed
  await inventoryPage.isAt();

  // Select the "Price (high to low)" option
  await inventoryPage.selectOption(SortOption.az);

  // Get all products and take names
  const products: Product[] = await inventoryPage.getAllProducts();
  const sortedProducts = [...products].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Assert that the products are sorted alphabetically (A to Z)
  await expect(products).toEqual(sortedProducts);
});

test("Sort products alphabetically (Z to A)", async ({ page }) => {
  const poManager = new POManager(page);
  const inventoryPage = poManager.getInventoryPage();

  //Check if the inventory page is displayed
  await inventoryPage.isAt();

  // Select the "Price (high to low)" option
  await inventoryPage.selectOption(SortOption.za);

  // Get all products and take names
  const products: Product[] = await inventoryPage.getAllProducts();
  const sortedProducts = [...products].sort((a, b) =>
    b.name.localeCompare(a.name)
  );

  // Assert that the products are sorted alphabetically (Z to A)
  await expect(products).toEqual(sortedProducts);
});
