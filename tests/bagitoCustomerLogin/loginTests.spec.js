const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');
const loginData = require('../../testdata/logindata.json');

test.describe('Login Tests', () => {
  let loginpage;

  test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    await loginpage.navigateToLoginPage();
  });

  test.only('login with valid credentials', async ({page}) => {
    const { email, password } = loginData.validUser;
    
    expect(await loginpage.verifyLoginPageLoaded()).toBeTruthy();
    await loginpage.signIn(email, password);
    
    // Add assertion for successful login
    const profileBtn = page.locator("span[aria-label='Profile']");
    await loginpage.click(profileBtn);
    const welcomeText = page.getByText('Welcome', { exact: false });
    await welcomeText.waitFor({ state: 'visible', timeout: 1000 });
    expect(await welcomeText.isVisible()).toBeTruthy();

  });

    test('login with invalid credentials', async ({page}) => {
    const { email, password } = loginData.invalidUser;
    
    expect(await loginpage.verifyLoginPageLoaded()).toBeTruthy();
    await loginpage.signIn(email, password);
    
    // Add assertion for failed login
   
  });
});