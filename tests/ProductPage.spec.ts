import { ProductPage } from "../pages/ProductPage";
import {test , expect} from "../fixture/auth-fixture";
import { productFilters } from "../utils/productFilters";

test.describe("Product Page Tests",()=>{
    let productPage:ProductPage;
    test.beforeEach(async({loginAsStandardUser})=>{
        productPage = new ProductPage(loginAsStandardUser);
    });

    test("should display correct number of products",async()=>{
       const productCount = await productPage.getProductCount();
        expect(productCount).toBe(6);
    },
);

    test("should display correct number of product filters",async()=>{
        const filterCount = await productPage.getProductFilters();
        expect(filterCount).toBe(4);
    });

    test("should sort products by ascending name",async()=>{
        await productPage.selectProductFilter(productFilters.ascendingName);
        const firstProductName = await productPage.productList.getByTestId("inventory-item").first().getByTestId("inventory-item-name").textContent();
        expect(firstProductName).toBe("Sauce Labs Backpack");
    });

    test("should sort products by descending name",async()=>{
        await productPage.selectProductFilter(productFilters.descendingName);
        const firstProductName = await productPage.productList.getByTestId("inventory-item").first().getByTestId("inventory-item-name").textContent();
        expect(firstProductName).toContain("Shirt");

})