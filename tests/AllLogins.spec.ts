import {test ,expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users";
import { ERROR_MESSAGE } from "../utils/constant";


const successfulUsers=[
  users.standard_user,
  users.performance_glitch_user,
  users.error_user,
  users.visual_user,
]

test.describe("Successful Login",()=>{

    for (const user of successfulUsers) {
      test(`should login successfully as ${user.description}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(user.username, user.password);
        await expect(page).toHaveURL(/inventory\.html/);
      });
    }})

test.describe("Unsuccessful Login",()=>{

  let loginPage:LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test(`should not login with locked out user credentials`, async () => {
    await loginPage.login(users.locked_out_user.username, users.locked_out_user.password);
    await expect(loginPage.getErrorMessage()).toBeVisible();  
    await expect(loginPage.getErrorMessage()).toContainText(ERROR_MESSAGE.lockedUser);  
  });

    test(`should not login with invalid user credentials`, async () => {
    await loginPage.login(users.invalid_user.username, users.invalid_user.password);
    await expect(loginPage.getErrorMessage()).toBeVisible();  
    await expect(loginPage.getErrorMessage()).toContainText(ERROR_MESSAGE.invalidCredentials);  
  });

    test(`should not login with empty username`, async () => {
    await loginPage.login("", users.standard_user.password);
    await expect(loginPage.getErrorMessage()).toBeVisible();  
    await expect(loginPage.getErrorMessage()).toContainText(ERROR_MESSAGE.emptyUsername);  
  });

    test(`should not login with empty password`, async () => {
    await loginPage.login(users.standard_user.username, "");
    await expect(loginPage.getErrorMessage()).toBeVisible();  
    await expect(loginPage.getErrorMessage()).toContainText(ERROR_MESSAGE.emptyPassword);  
  });

    test(`should not login with special characters entered in username and password`, async () => {
    await loginPage.login("!@#$%^&*()", "!@#$%^&*()");
    await expect(loginPage.getErrorMessage()).toBeVisible();  
    await expect(loginPage.getErrorMessage()).toContainText(ERROR_MESSAGE.invalidCredentials);  
  });

      test(`should not login with blank username and password`, async () => {
    await loginPage.login("", "");
    await expect(loginPage.getErrorMessage()).toBeVisible();  
    await expect(loginPage.getErrorMessage()).toContainText(ERROR_MESSAGE.emptyUsername);  
  });

})

test.describe("Direct Access to Products Page",()=>{
test('should not be able to access products page without logging in', async ({ page }) => {
   const  loginPage = new LoginPage(page);
  await page.goto('/inventory.html');
  await expect(loginPage.getErrorMessage()).toBeVisible();  
  await expect(loginPage.getErrorMessage()).toContainText(ERROR_MESSAGE.directaccesserror);
})
})