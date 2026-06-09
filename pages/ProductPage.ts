import { test , expect } from "../fixture/auth-fixture";
import { Locator, Page } from "@playwright/test";

export class ProductPage{
    private readonly page:Page;
    readonly productList:Locator;
    private readonly productFilterDropdown:Locator;

    constructor (page:Page){
        this.page = page;
        this.productList = page.getByTestId("inventory-list");
        this.productFilterDropdown = page.getByTestId("product_sort_container");
    }

    async getProductCount():Promise<number>{
        return await this.productList.getByTestId("inventory-item").count();
    }

    async getProductFilters():Promise<number>{
        return await this.productFilterDropdown.locator("option").count();
    }

    async selectProductFilter(filterName:string):Promise<void>{
        await this.productFilterDropdown.selectOption({label:filterName});
    }

}