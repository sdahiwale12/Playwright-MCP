const BasePage = require('./BasePage');

/**
 * MensProductListingPage - Page Object for Men's Product Listing Page
 * Encapsulates all locators and methods related to the men's product listing page
 */

class MensProductListingPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define all locators as properties
    this.URL = 'https://commerce.bagisto.com/mens';
    
    // Header Navigation
    this.bagistoLogo = page.getByRole('link', { name: 'Bagisto' });
    this.mensLink = page.getByRole('link', { name: 'Mens', exact: true });
    this.womensLink = page.getByRole('link', { name: 'Womens' });
    this.kidsLink = page.getByRole('link', { name: 'Kids' });
    this.wellnessLink = page.getByRole('link', { name: 'Wellness' });
    
    // Search
    this.searchInput = page.locator('input[placeholder="Search products here"]');
    this.searchButton = page.locator('button[aria-label="Search"]');
    
    // Filters
    this.priceFilterButton = page.getByRole('button', { name: 'Price Toggle accordion' });
    this.colorFilterButton = page.getByRole('button', { name: 'Color Toggle accordion' });
    this.sizeFilterButton = page.getByRole('button', { name: 'Size Toggle accordion' });
    this.brandFilterButton = page.getByRole('button', { name: 'Brand Toggle accordion' });
    this.clearAllFiltersButton = page.getByText('Clear All');
    
    // Products
    this.addToCartButtons = page.getByRole('button', { name: 'Add To Cart' });
    this.addToWishlistButtons = page.getByRole('button', { name: 'Add To Wishlist' });
    this.addToCompareButtons = page.getByRole('button', { name: 'Add To Compare' });
    this.productBadges = page.getByText(/New|Sale/);
    this.newBadge = page.getByText('New');
    this.saleBadge = page.getByText('Sale');
    
    // Sorting & Pagination
    this.sortDropdown = page.getByRole('button', { name: /Expensive First/ });
    this.itemsPerPageDropdown = page.getByRole('button', { name: /12/ });
    this.gridViewButton = page.locator('button[aria-label="Grid View"]');
    this.listViewButton = page.locator('button[aria-label="List View"]');
    
    // Compare & Wishlist
    this.compareLink = page.getByRole('link', { name: 'Compare' });

    this.formalWearLink = page.getByRole('link', { name: 'Formal Wear' }).first();
    this.casualWearLink = page.getByRole('link', { name: 'Casual Wear' }).first();
    this.activeWearLink = page.getByRole('link', { name: 'Active Wear' }).first();
    this.footwearLink = page.getByRole('link', { name: 'Footwear' }).first();
  }

  // Page Navigation Methods
  async navigateToMensPage() {
    await this.goto(this.URL);
    // Wait for navigation to be fully loaded
    await this.waitForNavigationReady();
  }

  async waitForNavigationReady() {
    // Wait for multiple navigation items to ensure menu is fully rendered
    await this.waitForElement(this.bagistoLogo);
    await this.waitForElement(this.mensLink);
    // Additional small delay to ensure all menu items are rendered
    await this.page.waitForTimeout(500);
  }

  async navigateToFormalWear() {
    await this.click(this.mensLink);
    const formalWearLink = this.page.getByRole('link', { name: 'Formal Wear' }).first();
    await this.click(formalWearLink);
  }

  async navigateToCasualWear() {
    await this.click(this.mensLink);
    const casualWearLink = this.page.getByRole('link', { name: 'Casual Wear' }).first();
    await this.click(casualWearLink);
  }

  // Verification Methods
  async verifyPageLoaded() {
    await this.waitForElement(this.bagistoLogo);
    return await this.getTitle() === 'Mens';
  }

  async verifyNavigationMenuItems() {
    try {
      // Wait for at least one navigation item to be visible
      await this.waitForElement(this.mensLink, 5000);
      
      // Check if each menu item exists and is visible
      const isMensVisible = await this.isVisible(this.mensLink);
      const isWomensVisible = await this.isVisible(this.womensLink);
      const isKidsVisible = await this.isVisible(this.kidsLink);
      const isWellnessVisible = await this.isVisible(this.wellnessLink);
      
      // Return true only if all main menu items are visible
      return isMensVisible && isWomensVisible && isKidsVisible && isWellnessVisible;
    } catch (error) {
      console.error('Error verifying navigation menu items:', error);
      return false;
    }
  }

  async verifySearchBarVisible() {
    return await this.isVisible(this.searchInput);
  }

  async verifyFilterPanelVisible() {
    const isPriceFilterVisible = await this.isVisible(this.priceFilterButton);
    const isColorFilterVisible = await this.isVisible(this.colorFilterButton);
    return isPriceFilterVisible && isColorFilterVisible;
  }

  async verifyProductActionButtonsVisible() {
    const isAddToCartVisible = await this.isVisible(this.addToCartButtons.first());
    const isAddToWishlistVisible = await this.isVisible(this.addToWishlistButtons.first());
    const isAddToCompareVisible = await this.isVisible(this.addToCompareButtons.first());
    return isAddToCartVisible && isAddToWishlistVisible && isAddToCompareVisible;
  }

  async verifyProductBadgesVisible() {
    const isNewBadgeVisible = await this.isVisible(this.newBadge.nth(2));
    const isSaleBadgeVisible = await this.isVisible(this.saleBadge);
    return isNewBadgeVisible && isSaleBadgeVisible;
  }

  async verifyLogoVisible() {
    return await this.isVisible(this.bagistoLogo);
  }

  // Search Methods
  async searchProduct(productName) {
    await this.fill(this.searchInput, productName);
    await this.pressKey('Enter');
  }

  async clearSearch() {
    await this.fill(this.searchInput, '');
  }

  // Filter Methods
  async expandPriceFilter() {
    await this.click(this.priceFilterButton);
  }

  async expandColorFilter() {
    await this.click(this.colorFilterButton);
  }

  async expandSizeFilter() {
    await this.click(this.sizeFilterButton);
  }

  async expandBrandFilter() {
    await this.click(this.brandFilterButton);
  }

  async selectColorFilter(color) {
    const colorCheckbox = this.page.getByRole('checkbox', { name: color });
    await this.click(colorCheckbox);
  }

  async selectSizeFilter(size) {
    const sizeCheckbox = this.page.getByRole('checkbox', { name: size });
    await this.click(sizeCheckbox);
  }

  async selectBrandFilter(brand) {
    const brandCheckbox = this.page.getByRole('checkbox', { name: brand });
    await this.click(brandCheckbox);
  }

  async clearAllFilters() {
    await this.click(this.clearAllFiltersButton);
  }

  // Product Interaction Methods
  async getProductCount() {
    await this.addToCartButtons.first().waitFor({ state: 'visible' });
    return await this.getElementCount(this.addToCartButtons);
  }

  async clickAddToCartOnProduct(productIndex = 0) {
    const buttons = this.addToCartButtons;
    await this.click(buttons.nth(productIndex));
  }

  async clickAddToWishlistOnProduct(productIndex = 0) {
    const buttons = this.addToWishlistButtons;
    await this.click(buttons.nth(productIndex));
  }

  async clickAddToCompareOnProduct(productIndex = 0) {
    const buttons = this.addToCompareButtons;
    await this.click(buttons.nth(productIndex));
  }

  async clickFirstProductName() {
    const firstProductLink = this.page.locator('a[href*="executive-elegance"]').first();
    await this.click(firstProductLink);
  }

  // Sorting Methods
  async changeSortOrder(sortOption) {
    await this.click(this.sortDropdown);
    const option = this.page.getByRole('option', { name: sortOption });
    await this.click(option);
  }

  async changeItemsPerPage(itemCount) {
    await this.click(this.itemsPerPageDropdown);
    const option = this.page.getByRole('option', { name: itemCount.toString() });
    await this.click(option);
  }

  // View Mode Methods
  async switchToListView() {
    await this.click(this.listViewButton);
  }

  async switchToGridView() {
    await this.click(this.gridViewButton);
  }

  // Navigation Methods
  async hoverOverMensMenu() {
    await this.hover(this.mensLink);
  }

  async getSubcategoryLink(subcategory) {
    return this.page.getByRole('link', { name: subcategory });
  }

async getPriceSliders() {
  const minSlider = this.page.locator('input[type="range"]').nth(0);
  const maxSlider = this.page.locator('input[type="range"]').nth(1);
  return { minSlider, maxSlider };
}

async setPriceRange(min, max) {
  const { minSlider, maxSlider } = await this.getPriceSliders();
  await minSlider.evaluate((el) => el.value = min.toString());
  await maxSlider.evaluate((el) => el.value = max.toString());
  await minSlider.dispatchEvent('input');
  await maxSlider.dispatchEvent('input');
}

async clickFilterOption(labelSelector) {
  const label = this.page.locator(labelSelector);
  await this.click(label);
}

async getFilterOptionInput(inputSelector) {
  return this.page.locator(inputSelector);
}

async getFilterSearchInput() {
  return this.page.locator('input[placeholder="Search"]').first();
}

async searchInFilter(query) {
  const searchInput = await this.getFilterSearchInput();
  await this.fill(searchInput, query);
}

async clearFilterSearch() {
  const searchInput = await this.getFilterSearchInput();
  await this.fill(searchInput, '');
}
}

module.exports = MensProductListingPage;