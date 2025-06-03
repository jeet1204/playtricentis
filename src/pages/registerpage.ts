import {expect,Locator,Page} from '@playwright/test';

export class registerPage{
    page:Page;
    maleRadio:Locator;
    firstName:Locator;
    lastName:Locator;
    email:Locator;
    password:Locator;
    confirmPassword:Locator;
    registerButton:Locator;
    continueButton:Locator;
    duplicateMessage:Locator;
    constructor(page:Page)
    {
        this.page=page;        
        this.maleRadio = page.locator("//input[@id='gender-male']");
        this.firstName = page.locator("//input[@id='FirstName']");
        this.lastName = page.locator("//input[@id='LastName']");
                this.email = page.locator("//input[@id='Email']");
                this.password = page.locator("//input[@id='Password']");
                this.confirmPassword = page.locator("//input[@id='ConfirmPassword']");
                this.registerButton = page.locator("//input[@id='register-button']");
                this.continueButton=page.locator("//input[@value='Continue']");
                this.duplicateMessage=page.locator("//div[@class='validation-summary-errors']");
    }
    async fillRegisterForm(mail: string)
    {
        //const uniqueEmail = `test${Date.now()}@test.com`;
        await this.maleRadio.click();
        await this.firstName.fill("Test");
        await this.lastName.fill("User");
        await this.email.fill(mail);
        await this.password.fill("Test@123");
        await this.confirmPassword.fill("Test@123");
        await this.registerButton.click();
        //await this.continueButton.click();
    }
    async verifyRegistration()
    {
        await this.continueButton.click();
    }

    async verifyDuplicateValidation()
    {
        await expect(this.duplicateMessage).toHaveText("The specified email already exists");
    }
}
