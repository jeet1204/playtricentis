import { expect, Locator, Page } from '@playwright/test';
import { expectedCategories } from '../testdata/testdata.ts';

export class homePage{
page:Page;
registerLink:Locator;
loginLink:Locator;
userAccount:Locator;
product: (productname: string) => Locator;
categories: Locator;
categoryLink:(category:number) => Locator;
shoppingCart:Locator;
pageTitle: Locator;
categoryHover:(categoryName:string)=>Locator;
subCategory:(subcategory:string)=>Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.registerLink = page.locator("//a[@href='/register']");
        this.loginLink = page.locator("//a[@href='/login']");
        this.userAccount=page.locator("(//a[@class='account'])[1]");
        this.product= productname=>page.locator(`//h2[@class='product-title']/a[text()='${productname}']`);
        this.shoppingCart=page.locator("//li[@id='topcartlink']/a");
        this.categoryLink= category =>page.locator(`(//ul[@class='top-menu']/li/a)['${category}']`);
        this.categories = page.locator("//ul[@class='top-menu']/li/a");
        this.pageTitle = page.locator("//div[@class='page-title']");
        this.categoryHover=(categoryName)=> page.locator(`//ul[@class='top-menu']/li/a[contains(text(),'${categoryName}')]`);
        this.subCategory=(subcategory)=>page.locator(`(//ul/li/a[contains(text(),'${subcategory}')])[1]`)
    }

    async clickOnRegister()
    {
        await this.registerLink.click();      
    }

    async clickOnLogin()
    {
        await this.loginLink.click();
    }

    async clickOnAllLinks()
    {
        let titles:string[]=[];
        await this.categories.last().waitFor();
        for(let i=0;i<(await this.categories.all()).length;i++)
        {
            await this.categories.nth(i).click();
            let currenttitle= await this.pageTitle.innerText();
            titles.push(currenttitle);
        }
        expect(titles,"titles not matching").toEqual(expectedCategories);
    }

    async goToCategory(category:string,sub:string)
    {
        await this.categoryHover(category).hover();
        await this.subCategory(sub).click();
    }
    
    async addProduct(product:string)
    {
        await this.product(product).click();
    }
    async goToShoppingCart()
    {
        await this.shoppingCart.click();
    }
    async verifyHomePage()
    {
        await expect(this.page).toHaveTitle("Demo Web Shop");
    }
    async verifyRegister()
    {
        await expect(this.page).toHaveTitle("Demo Web Shop. Register");
    }
    async verifyLogin(accountname:string)
    {
        await expect(this.userAccount).toHaveText(accountname);
    }

}