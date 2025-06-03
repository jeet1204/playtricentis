import {Page, expect, Locator} from '@playwright/test';

export class cartpage{
    page:Page;
    cartProduct:Locator;
    quantityEdit: Locator;
    price: Locator;
    total: Locator;
    allProductsTotal:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.cartProduct=this.page.locator("//td[@class='product']/a");
        this.quantityEdit=this.page.locator("//input[@class='qty-input']");
        this.price = this.page.locator("//span[@class='product-unit-price']");
        this.total = this.page.locator("//span[@class='product-subtotal']");
        this.allProductsTotal = this.page.locator("(//span[@class='product-price'])[1]");

    }

    async verifyProductCart(product:string)
    {
        await expect(this.cartProduct).toHaveText(product);
    }

    async editQuantity()
    {
        await this.price.waitFor();
        const currentvalue = parseInt((await this.price.innerText()).toString());
        await this.quantityEdit.clear();
        await this.quantityEdit.fill("2");
        await this.quantityEdit.press("Enter");
        await this.total.waitFor();
        const newvalue = parseInt((await this.total.innerText()).toString());
        expect(newvalue).toBe(currentvalue*2);
    }

    async verifyTotal()
    {
        const carttotal = await this.total.allInnerTexts();
        const carttotalint = carttotal.map(x=> parseInt(x));
        const z= carttotalint.reduce((x,y)=>x+y,0);
        expect(parseInt(await this.allProductsTotal.innerText())).toEqual(z);
    }
}