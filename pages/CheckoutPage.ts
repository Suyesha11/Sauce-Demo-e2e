import { Locator , Page } from "@playwright/test";
import {userDetails} from "../utils/userDetails"

export class CheckoutPage{
private readonly page:Page;
private readonly firstName:Locator;
private readonly lastName:Locator;
private readonly postalCode:Locator;
private readonly cancel:Locator;
private readonly continue:Locator;
private readonly error:Locator;

constructor(page:Page){
    this.page=page;
    this.firstName=page.getByTestId("firstName");
    this.lastName=page.getByTestId("lastName");
    this.postalCode=page.getByTestId("postalCode");
    this.cancel=page.getByRole('button',{name:"Cancel"});
    this.continue=page.getByRole('button',{name:"Continue"});
    this.error=page.getByTestId("error")
}

    async addFirstName(value:string){
        await this.firstName.fill(value)
    }
    async addLastName(value:string){
        await this.lastName.fill(value)
    }
    async addPostalCode(value:string){
        await this.postalCode.fill(value)
    }
    async cancelCheckout(){
        await this.cancel.click();
    }
    async continueCheckout(){
        await this.continue.click();
    }
    async fillCheckoutForm() {
    await this.addFirstName(userDetails.firstName);
    await this.addLastName(userDetails.lastName);
    await this.addPostalCode(userDetails.postalCode);
}
    getError(){
        return this.error;
    }

}