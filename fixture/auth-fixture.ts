import {test as base, Page} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users"

type CartFixture={
    page:Page;
    productName:string;
    productPrice:string;
}

type AuthFixtures={
    loginAsStandardUser:Page;
    loginAsProblemUser:Page;
    loginAsVisualUser:Page;
    addedproductToCart:CartFixture;
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
    }

})

export { expect } from '@playwright/test';
