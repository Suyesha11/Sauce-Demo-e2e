
import { test, expect } from "../fixture/auth-fixture";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ERROR_MESSAGE } from "../utils/constant";
import { userDetails } from "../utils/userDetails";


test.describe("checkout page flow",()=>{

let checkoutPage : CheckoutPage;
    test.beforeEach(async({addedproductToCart})=>{
        const {page} = addedproductToCart;
        const cartPage = new CartPage(page);
        checkoutPage=new CheckoutPage(page);
        await cartPage.checkoutProduct();
        await page.waitForURL(/checkout-step-one\.html/);
    })
    

test.describe("Success checkout form filling",()=>{
    
    test("should be able to fill user details",async({page})=>{
        await checkoutPage.fillCheckoutForm();
        await checkoutPage.continueCheckout();
        await expect(page).toHaveURL(/checkout-step-two\.html/);
    })

    test("should be able to cancel checkout",async({page})=>{
        await checkoutPage.cancelCheckout();
        await expect(page).toHaveURL(/cart\.html/)
    })

})
test.describe("checkout form validations",()=>{

    test("should throw error if firstName is missing",async()=>{
        await checkoutPage.addLastName(userDetails.lastName);
        await checkoutPage.addPostalCode(userDetails.postalCode);
        await checkoutPage.continueCheckout();
        await expect(checkoutPage.getError()).toContainText(ERROR_MESSAGE.emptyFirstName);

    })
    test("should throw error if LastName is missing",async()=>{
        await checkoutPage.addFirstName(userDetails.firstName);
        await checkoutPage.continueCheckout();
        await expect(checkoutPage.getError()).toContainText(ERROR_MESSAGE.emptyLastName);
        
    })
    test("should throw error if PostalCode is missing",async()=>{
        await checkoutPage.addLastName(userDetails.lastName);
        await checkoutPage.addFirstName(userDetails.firstName);
        await checkoutPage.continueCheckout();
        await expect(checkoutPage.getError()).toContainText(ERROR_MESSAGE.emptyPostalCode);
        
    })
})
})