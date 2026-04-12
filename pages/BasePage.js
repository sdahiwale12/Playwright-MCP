/**
 * BasePage - Base class for all Page Objects
 * Provides common functionality and methods that all pages inherit from
 */

class BasePage {
  constructor(page) {
    this.page = page;
  }

  // Navigation methods
  async goto(url) {
    await this.page.goto(url);
  }

  getUrl() {
    return this.page.url();
  }

  async getTitle() {
    return this.page.title();
  }

  async goBack() {
    await this.page.goBack();
  }

  async reload() {
    await this.page.reload();
  }

  // Element interaction methods
  async click(locator) {
    await locator.click();
  }

  async fill(locator, text) {
    await locator.fill(text);
  }
  
  async clear(locator) {
    await locator.clear();
  }

  async inputValue(locator) {
    return await locator.inputValue();
  }

  async type(locator, text) {
    await locator.type(text);
  }

  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  async hover(locator) {
    await locator.hover();
  }

  // Element verification methods
  async isVisible(locator) {
    return await locator.isVisible().catch(() => false);
  }

  async getText(locator) {
    return await locator.textContent();
  }

  async getAttribute(locator, attribute) {
    return await locator.getAttribute(attribute);
  }

  async getElementCount(locator) {
    return await locator.count();
  }

  async waitForElement(locator, timeout = 7000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async scrollToElement(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async takeScreenshot(filename) {
    await this.page.screenshot({ path: filename });
  }

  async getByText(text) {
    return this.page.getByText(text);
  }
}

module.exports = BasePage;