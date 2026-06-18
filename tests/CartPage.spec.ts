import { CartPage } from "../pages/CartPage";
import {test , expect} from "../fixture/auth-fixture"


test.describe("Cart page functionality", ()=>{
    let cartPage:CartPage;
    let addedProduct : {productName:string , productPrice:string};

    test.beforeEach(async({addedproductToCart})=>{
       const { page , productName , productPrice} = addedproductToCart;
       cartPage=new CartPage(page);
       addedProduct={productName , productPrice};
    })
    
    test("should have same product name as added",async()=>{
        const  name = await cartPage.getProductName();
        expect(name).toBe(addedProduct.productName);
    })

     test("should have same price as added",async()=>{
        const  price = await cartPage.getProductPrice();
        expect(price).toBe(addedProduct.productPrice);
    })

    test("should be able to move to checkout", async({page})=>{
      await cartPage.checkoutProduct();
      await expect(page).toHaveURL(/checkout-step-one\.html/)
     });

     test("should be able to continue shopping when clicking on Continue Shopping",async({page})=>{
        await cartPage.continueProductShopping();
        await expect(page).toHaveURL(/inventory\.html/);
     })

     test("should be able to remove product",async()=>{
        await cartPage.removeProduct();
        await expect(cartPage.getCartItems()).toHaveCount(0);
     })

})