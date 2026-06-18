    import { Locator,Page } from "@playwright/test";

    export class CartPage{
        private readonly page:Page;
        private readonly remove:Locator;
        private readonly checkout:Locator;
        private readonly continueShopping:Locator;
        private readonly productName:Locator;
        private readonly productPrice:Locator;
        private readonly emptyCartItem:Locator;

        constructor(page:Page){
            this.page=page;
            this.remove=page.getByRole("button",{name:'Remove'})
            this.checkout=page.getByRole("button",{name:'Checkout'})
            this.continueShopping=page.getByRole("button",{name:'Continue Shopping'})
            this.productName=page.getByTestId("cart-list").getByTestId("inventory-item-name").first();
            this.productPrice=page.getByTestId("cart-list").getByTestId("inventory-item-price").first();
            this.emptyCartItem=page.getByTestId("inventory-item")
        }
    
        async removeProduct(){
            await this.remove.click();
        }

        async checkoutProduct(){
            await this.checkout.click();
        }

        async continueProductShopping (){
            await this.continueShopping.click();
        }

        async getProductName(){
        return await this.productName.textContent();
        }

        async getProductPrice(){
            return await this.productPrice.textContent();
        }

         getCartItems():Locator{
            return this.emptyCartItem;
        }

        
        



    }