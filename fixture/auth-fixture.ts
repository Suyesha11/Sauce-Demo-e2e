import {test as base, Page} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users"

type AuthFixtures={
    loginAsStandardUser:Page;
    loginAsProblemUser:Page;
    loginAsVisualUser:Page;
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

})

export { expect } from '@playwright/test';
