import {expect, Page, Locator} from 'playwright/test';
export class productDetailPage{
    page:Page;
    addcartButton:Locator;
    recipientName:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.addcartButton= this.page.locator("(//input[@value='Add to cart'])[1]");
        this.recipientName= this.page.getByLabel("Recipient's Name:");
    }

    async addtocart()
    {
        await this.addcartButton.click();
    }
}