const BasePage = require('./BasePage');

/**
 * ProductDetailsPage - Page Object for Product Details Page
 * Encapsulates all locators and methods related to product detail pages
 */

class ProductDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Product Information
    this.productTitle = page.locator('h1');
    this.productPrice = page.locator('//paragraph[contains(text(), "$")]');
    this.productDescription = page.locator('//paragraph[contains(@class, "description")]');
    this.productImage = page.locator('img[alt*="product"]').first();
    
    // Product Options
    this.colorDropdown = page.locator('select').nth(0); // Or use more specific selector
    this.sizeDropdown = page.locator('select').nth(1);
    
    // Quantity
    this.increaseQuantityButton = page.getByRole('button', { name: 'Increase Quantity' });
    this.decreaseQuantityButton = page.getByRole('button', { name: 'Decrease Quantity' });
    this.quantityInput = page.locator('input[type="number"]');
    
    // Action Buttons
    this.addToCartButton = page.getByRole('button', { name: 'Add To Cart' });
    this.addToWishlistButton = page.getByRole('button', { name: 'Add To Wishlist' });
    this.compareButton = page.getByRole('button', { name: 'Compare' });
    
    // Tabs
    this.descriptionTab = page.getByRole('button', { name: 'Description' });
    this.additionalInfoTab = page.getByRole('button', { name: 'Additional Information' });
    this.reviewsTab = page.getByRole('button', { name: 'Reviews' });
    
    // Breadcrumb
    this.breadcrumb = page.locator('nav');
  }

  // Verification Methods
  async verifyProductDetailsLoaded() {
    return await this.isVisible(this.productTitle);
  }

  async getProductTitle() {
    return await this.getText(this.productTitle);
  }

  async verifyColorOptionVisible() {
    return await this.isVisible(this.colorDropdown);
  }

  async verifySizeOptionVisible() {
    return await this.isVisible(this.sizeDropdown);
  }

  async verifyAddToCartButtonVisible() {
    return await this.isVisible(this.addToCartButton);
  }

  async verifyProductDescriptionVisible() {
    return await this.isVisible(this.productDescription);
  }

  // Product Option Selection Methods
  async selectColor(color) {
    await this.click(this.colorDropdown);
    const option = this.page.locator(`option:has-text("${color}")`);
    await this.click(option);
  }

  async selectSize(size) {
    await this.click(this.sizeDropdown);
    const option = this.page.locator(`option:has-text("${size}")`);
    await this.click(option);
  }

  async getSelectedColor() {
    return await this.getText(this.colorDropdown);
  }

  async getSelectedSize() {
    return await this.getText(this.sizeDropdown);
  }

  // Quantity Methods
  async increaseQuantity(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.click(this.increaseQuantityButton);
    }
  }

  async decreaseQuantity(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.click(this.decreaseQuantityButton);
    }
  }

  async getQuantity() {
    return await this.getText(this.quantityInput);
  }

  async setQuantity(quantity) {
    await this.fill(this.quantityInput, quantity.toString());
  }

  // Action Methods
  async addToCart() {
    await this.click(this.addToCartButton);
  }

  async addToWishlist() {
    await this.click(this.addToWishlistButton);
  }

  async addToCompare() {
    await this.click(this.compareButton);
  }

  // Tab Methods
  async clickDescriptionTab() {
    await this.click(this.descriptionTab);
  }

  async clickAdditionalInfoTab() {
    await this.click(this.additionalInfoTab);
  }

  async clickReviewsTab() {
    await this.click(this.reviewsTab);
  }

  async isDescriptionTabActive() {
    const ariaSelected = await this.getAttribute(this.descriptionTab, 'aria-selected');
    return ariaSelected === 'true';
  }

  // Product Information Methods
  async getProductPrice() {
    return await this.getText(this.productPrice);
  }

  async getProductDescription() {
    return await this.getText(this.productDescription);
  }

  async verifyBreadcrumbNavigation() {
    return await this.isVisible(this.breadcrumb);
  }
}

module.exports = ProductDetailsPage;