const BasePage = require('./BasePage')

class loginPage extends BasePage {
  constructor(page) {
    super(page);

    this.URL = 'https://commerce.bagisto.com/customer/login';
    this.usernameInput = page.locator("input[name='email']");
    this.passwordInput = page.locator("#password");
    this.signInButton = page.locator("button[type='submit']");
    
  }

  async signIn(username, password)  {

    //clear the input fields before filling them
    await this.clear(this.usernameInput);
    await this.clear(this.passwordInput);

    // Fill in the email and password fields
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    // Click the Sign In button   
    await this.click(this.signInButton);
  }

  async navigateToLoginPage() {
    await this.goto(this.URL);  
  }

  async verifyLoginPageLoaded() {
    const customerLoginText = await this.getByText(' Customer Login ');
    if(!customerLoginText.isVisible()) {
      return false;
    }
    return true;
  }
}
module.exports = loginPage;
