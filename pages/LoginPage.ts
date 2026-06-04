import { Locator , Page } from "@playwright/test";


export class LoginPage {

    private readonly page:Page;
    private readonly username:Locator;
    private readonly password:Locator;
    private readonly loginButton:Locator;
    private readonly errorMessage:Locator;

    constructor(page:Page){
        this.page = page;
        this.username= page.getByTestId("username");
        this.password= page.getByTestId("password");
        this.loginButton=page.getByRole("button",{name:"Login"});
        this.errorMessage= page.locator("[data-test='error']");
    }

    async goto(){
        await this.page.goto(process.env.BASE_URL ?? "https://saucedemo.com");
    }

    async login(username:string,password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    getErrorMessage(){
        return this.errorMessage;
    }


}