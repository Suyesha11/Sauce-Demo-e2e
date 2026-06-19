import { test ,expect} from "../fixture/auth-fixture"
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage"


test.describe("checkout overview Flow",()=>{
    let checkoutOverviewPage:CheckoutOverviewPage; 
    let addedProduct: {productName :string, productPrice:string }

    test.beforeEach(async({checkoutProduct})=>{
        const {productName, productPrice ,page} = checkoutProduct
        checkoutOverviewPage = new CheckoutOverviewPage(page);
        addedProduct={productName, productPrice};
    });

    test.describe("checkout information on checkout overview flow",()=>{
        test("should be able to see paymnet and shipping information and price total",async()=>{
            await expect(checkoutOverviewPage.getPaymentInfoLabel()).toBeVisible();
            await expect(checkoutOverviewPage.getShippingInfoLabel()).toBeVisible();
            await expect(checkoutOverviewPage.getTotalPriceLable()).toBeVisible();
        })

        test("should have correct productname and price",async()=>{
            await expect(checkoutOverviewPage.getItemName()).toHaveText(addedProduct.productName);
            await expect(checkoutOverviewPage.getItenPrice()).toHaveText(addedProduct.productPrice);
        })

        test("should see correct tax value",async()=>{
            const total = await checkoutOverviewPage.getPriceTotal();
            const expectedTotal = await checkoutOverviewPage.getcalculateTotalPrice();
            expect(total).toBeCloseTo(expectedTotal,2);
        })

        test("should be able to cancel checkout",async({page})=>{
            await checkoutOverviewPage.getCancelLocator().click();
            await expect(page).toHaveURL(/inventory\.html/)
        })

        test("should be able to finish checkout",async({page})=>{
            await checkoutOverviewPage.getfinishLocator().click();
            await expect(page).toHaveURL(/checkout-complete\.html/);
        })
    });

    
})