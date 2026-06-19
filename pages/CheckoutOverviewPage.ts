import { Locator,Page } from "@playwright/test";

export class CheckoutOverviewPage{

    private readonly page:Page;
    private readonly finish:Locator;
    private readonly cancel:Locator;
    private readonly paymentInfo:Locator;
    private readonly shippingInfo:Locator;
    private readonly priceTotalLabel:Locator;
    private readonly itemTotal:Locator;
    private readonly tax:Locator;
    private readonly totalPrice:Locator;
    private readonly itemName:Locator;
    private readonly itemPrice :Locator;

    constructor(page:Page){
        this.page=page;
        this.finish=page.getByRole('button',{name:"Finish"});
        this.cancel=page.getByRole('button',{name:"Cancel"});
        this.paymentInfo=page.getByTestId("payment-info-label");
        this.shippingInfo=page.getByTestId("shipping-info-label");
        this.priceTotalLabel=page.getByTestId("total-info-label");
        this.itemTotal=page.getByTestId("subtotal-label");
        this.tax=page.getByTestId("tax-label");
        this.totalPrice=page.getByTestId("total-label");
        this.itemName=page.getByTestId("inventory-item").first().getByTestId("inventory-item-name");
        this.itemPrice=page.getByTestId("inventory-item").first().getByTestId("inventory-item-price");
    }

     getPaymentInfoLabel(){
        return this.paymentInfo;
    }
    getShippingInfoLabel(){
        return this.shippingInfo;
    }
    getTotalPriceLable(){
        return this.priceTotalLabel;
    }
    async getItemTotal(){
        const rawItemPriceTotal = await this.itemTotal.textContent() ?? "";
        const itemPriceTotal = parseFloat(rawItemPriceTotal.replace(/[^0-9.]/g, ""));
        return itemPriceTotal;
    }
    getItemName(){
        return this.itemName;
    }
    getItenPrice(){
        return this.itemPrice;
    }
    async getPriceTotal(){
        const rawPriceTotal = await this.totalPrice.textContent()??"";
        const itemPriceTotal = parseFloat(rawPriceTotal?.replace(/[^0-9.]/g, ""));
        return itemPriceTotal; 
    }
    async getcalculateTotalPrice(){
    const rawItemPrice = await this.itemTotal.textContent() ?? "";
    const itemPrice = parseFloat(rawItemPrice.replace(/[^0-9.]/g, ""));
    const rawTax = await this.tax.textContent() ?? "";
    const tax = parseFloat(rawTax.replace(/[^0-9.]/g, ""));
    const expectedTotal = itemPrice + tax;
    return expectedTotal;
    }

    getCancelLocator(){
    return this.cancel;
    }
    getfinishLocator(){
        return this.finish;
    }
}