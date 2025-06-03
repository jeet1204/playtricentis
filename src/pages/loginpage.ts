import {expect,Locator,Page} from '@playwright/test';

export class loginPage{
    page:Page;
    emailField:Locator;
    passwordField:Locator;
    loginButton:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.emailField=page.locator("//input[@id='Email']");
        this.passwordField=page.locator("//input[@id='Password']");
        this.loginButton=page.locator("//input[@value='Log in']");
    }

    async login(email:string,password:string)
    {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}
