
import { Locator, Page } from "@playwright/test";

export class ProductPage{
    private readonly page:Page;
    private readonly productList:Locator;
    private readonly productFilterDropdown:Locator;
    private readonly productName:Locator;
    private readonly productPrices:Locator;
    private readonly firstProductCard :Locator;
    private readonly shoppingCartBadge:Locator;
    private readonly shoppingCartLink:Locator;
    private readonly lastProductCard:Locator;
    private readonly productImages:Locator;

    constructor (page:Page){
        this.page = page;
        this.productList = page.getByTestId("inventory-list");
        this.productFilterDropdown = page.getByTestId("product-sort-container");
        this.productName= this.productList.getByTestId("inventory-item-name");
        this.productPrices= page.getByTestId("inventory-item-price");
        this.firstProductCard= page.getByTestId("inventory-item").first();
        this.shoppingCartBadge=page.getByTestId("shopping-cart-badge");
        this.lastProductCard= page.getByTestId("inventory-item").last();
        this.shoppingCartLink= page.getByTestId("shopping-cart-link");
        this.productImages= page.locator("img.inventory_item_img");
    }

    async getProductNames():Promise<string[]>{
        return await this.productName.allTextContents();
    }

    async getProductFilters():Promise<number>{
        return await this.productFilterDropdown.locator("option").count();
    }

    async selectProductFilter(filterName:string):Promise<void>{
        await this.productFilterDropdown.selectOption({label:filterName});
    }

    async getProductPrice():Promise<number[]>{
        const prices = await this.productPrices.allTextContents();
        return prices.map(price=>parseFloat(price.replace("$","")));
    }

    async getFirstProductName(): Promise<string>{
        const name = await this.firstProductCard.getByTestId("inventory-item-name").textContent();
        return name?.trim() ?? "";
    }

    async clickFirstProductName(){
        await this.firstProductCard.getByTestId("inventory-item-name").click();
    }

     getFirstProductRemoveButton(){
        return this.firstProductCard.getByRole('button', {name: "Remove"});
    }

    async addFirstProductToCart(){
        await this.firstProductCard.getByRole('button', {name: "Add to cart"}).click();
    }

    async addLastProductToCart(){
        await this.lastProductCard.getByRole('button', {name: "Add to cart"}).click();
    }

     getShoppingCartBadgeLocator():Locator{
        return this.shoppingCartBadge;
    }

    async getShoppingCartBadgeText(){
        return await this.shoppingCartBadge.textContent();
    }

    async removeFirstProductFromCart(){
        await this.getFirstProductRemoveButton().click();
    }

     getProductList(){
        return this.productList;
    }

    getShoppingCartLink():Locator{
        return this.shoppingCartLink;
    }

    async getProductImageSrcs(){
        return await this.productImages.evaluateAll(
            images => images.map(img => img.getAttribute("src") ?? "")
        );

    }



}