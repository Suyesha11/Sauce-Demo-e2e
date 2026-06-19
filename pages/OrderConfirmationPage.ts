import { Locator, Page } from "@playwright/test";

export class OrderConfirmationPage {
  private readonly page: Page;
  private readonly secondaryHeader: Locator;
  private readonly thankyouMessage: Locator;
  private readonly backHome: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.secondaryHeader = page.getByTestId("secondary-header");
    this.thankyouMessage = page.getByTestId("complete-header");
    this.backHome = page.getByRole("button", { name: "Back Home" });
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }

  async getSecondaryHeader() {
    return await this.secondaryHeader.textContent();
  }

  async getThankyouMessage() {
    return await this.thankyouMessage.textContent();
  }

   goBackHome() {
    return this.backHome;
  }

  getShoppingCart() {
    return this.shoppingCartLink;
  }
  getCartBadge(): Locator {
    return this.cartBadge;
}
}
