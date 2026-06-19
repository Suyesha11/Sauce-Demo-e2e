import {test as base, Page} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users";
import { userDetails } from "../utils/userDetails";

type PageWithProduct ={
    page:Page;
    productName:string;
    productPrice:string;
}

type AuthFixtures={
    loginAsStandardUser:Page;
    loginAsProblemUser:Page;
    loginAsVisualUser:Page;
    addedproductToCart:PageWithProduct ;
    checkoutProduct:PageWithProduct ;
};


export const test = base.extend<AuthFixtures>({
    loginAsStandardUser:async({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard_user.username,users.standard_user.password);
        await page.waitForURL(/inventory\.html/);
    await use(page);
},


    loginAsProblemUser:async({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.problem_user.username,users.problem_user.password);
        await page.waitForURL(/inventory\.html/);
    await use(page);
    },
    
    loginAsVisualUser:async({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.visual_user.username,users.visual_user.password);
        await page.waitForURL(/inventory\.html/);
    await use(page);
    },

    addedproductToCart:async({loginAsStandardUser , page},use)=>{
        const productName= await page.getByTestId("inventory-item").first()
        .getByTestId("inventory-item-name").textContent() ?? "";

        const productPrice=await page.getByTestId("inventory-item").first()
        .getByTestId("inventory-item-price").textContent() ?? "";

        await page.getByTestId("inventory-item").first()
        .getByRole('button',{name:'Add To cart'}).click();
        await page.getByTestId("shopping-cart-link").click();
        await page.waitForURL(/cart\.html/);

        await use({page , productName , productPrice});
    },

    checkoutProduct:async({addedproductToCart},use)=>{
        const {page, productName, productPrice }=addedproductToCart;
        await page.getByRole('button',{name:"Checkout"}).click();
        await page.waitForURL(/checkout-step-one\.html/);
        await page.getByTestId("firstName").fill(userDetails.firstName);
        await page.getByTestId("lastName").fill(userDetails.lastName);
        await page.getByTestId("postalCode").fill(userDetails.postalCode);
        await page.getByRole('button',{name:"Continue"}).click();
        await page.waitForURL(/checkout-step-two\.html/);

        await use({page, productName, productPrice });
    }

})

export { expect } from '@playwright/test';
