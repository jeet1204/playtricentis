import { test, expect } from '@playwright/test';
import { homePage } from '../src/pages/homepage';
import { registerPage } from '../src/pages/registerpage';
import { loginPage } from '../src/pages/loginpage';
import {productDetailPage} from '../src/pages/productdetailpage';
import {cartpage} from '../src/pages/cartpage';


test.beforeEach (async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
});
test('has title', async ({ page }) => {
  const homepage = new homePage(page);
  await homepage.clickOnRegister();
  await homepage.verifyRegister();
});

test('verify register', async ({page})=>
{
  const homepage = new homePage(page);
  const registerpage = new registerPage(page);
  await homepage.clickOnRegister();
  const uniqueEmail = `test${Date.now()}@test.com`;
  await registerpage.fillRegisterForm(uniqueEmail);
  await registerpage.verifyRegistration();
  await homepage.verifyHomePage();
});

test('verify duplicate registration', async ({page})=>
  {
    const homepage = new homePage(page);
    const registerpage = new registerPage(page);
    await homepage.clickOnRegister();
    await registerpage.fillRegisterForm("test1@test.com");
    await registerpage.verifyDuplicateValidation();
  });

test('verify login',async({page})=>
{
  const homepage=new homePage(page);
  const loginpage=new loginPage(page);
  const loginuser="test1@test.com";
  await homepage.clickOnLogin();
  await loginpage.login(loginuser,"Test@123");
  await homepage.verifyLogin("Test1@test.com");
});

test('verify add cart',async({page})=>{
  const homepage= new homePage(page);
  const productpage = new productDetailPage(page);
  const cartpageobj = new cartpage(page);
  await homepage.addProduct("14.1-inch Laptop");
  await productpage.addtocart();
  await homepage.goToShoppingCart();
  await cartpageobj.verifyProductCart("14.1-inch Laptop");
});

test('verify quantity edit',async({page})=>
{
  const homepage = new homePage(page);
  const productpage = new productDetailPage(page);
  const cartpageobj = new cartpage(page);
  await homepage.addProduct("14.1-inch Laptop");
  await productpage.addtocart();
  await homepage.goToShoppingCart();
  await cartpageobj.editQuantity();
});

test('verify links', async({page})=>
{
  const homepage = new homePage(page);
  await homepage.clickOnAllLinks();
});

test('verify filter', async({page})=>
{
  const homepage = new homePage(page);
  await homepage.goToCategory('Computers','Desktop');
});

test.only('verify cart total', async({page})=>
{
  const homepage = new homePage(page);
  const productpage = new productDetailPage(page);
  const cartpageobj = new cartpage(page);
  await homepage.addProduct("14.1-inch Laptop");
  await productpage.addtocart();
  await homepage.goToCategory('Electronics','Cell phones');
  await homepage.addProduct("Smartphone");
  await productpage.addtocart();
  await homepage.goToShoppingCart();
  await cartpageobj.verifyTotal();
});
