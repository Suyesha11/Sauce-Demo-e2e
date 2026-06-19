import { test ,expect} from "../fixture/auth-fixture"
import { OrderConfirmationPage } from "../pages/OrderConfirmationPage"

test.describe("Order Confirmation page",()=>{

    let orderConfirmationPage:OrderConfirmationPage;

    test.beforeEach(async({checkoutProduct})=>{
        const {page}=checkoutProduct;
        orderConfirmationPage = new OrderConfirmationPage(page);
        await page.getByRole('button' ,{name : 'Finish'}).click();
        await page.waitForURL(/checkout-complete\.html/);
    })

    test("should display Thankyou Message",async()=>{
       const message = await orderConfirmationPage.getThankyouMessage();
        expect(message).toContain("Thank you");
    })

    test("should display Checkout header",async()=>{
        const header = await orderConfirmationPage.getSecondaryHeader();
        expect(header).toContain("Checkout");
    })

    test("should be able to go back to Home page",async({page})=>{
        await orderConfirmationPage.goBackHome().click();
        await expect(page).toHaveURL(/inventory\.html/);
    })

    test("should not contain cart item badge",async()=>{
        await expect(orderConfirmationPage.getCartBadge()).not.toBeVisible();
    })
})