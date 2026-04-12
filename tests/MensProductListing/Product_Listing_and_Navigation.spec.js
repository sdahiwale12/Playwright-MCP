// spec: specs/bagisto-mens-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const MensProductListingPage = require('../../pages/MensProductListingPage');

test.describe('Product Listing and Navigation', () => {
  let mensPage;

  // Setup: Initialize page object before each test
  test.beforeEach(async ({ page }) => {
    mensPage = new MensProductListingPage(page);
    await mensPage.navigateToMensPage();
  });

  test('View Men\'s Product Listing Page', async ({ page }) => {
    // Ensure navigation is ready
    await mensPage.waitForNavigationReady();

    // Verify page is loaded
     await expect(async () => {
      expect(await mensPage.verifyPageLoaded()).toBeTruthy();
    }).toPass();

    // Verify navigation menu items are visible
    // Check each item individually for better debugging
    const isMensVisible = await mensPage.isVisible(mensPage.mensLink);
    console.log('Mens Link visible:', isMensVisible);
    expect(isMensVisible).toBeTruthy();

    const isWomensVisible = await mensPage.isVisible(mensPage.womensLink);
    console.log('Womens Link visible:', isWomensVisible);
    expect(isWomensVisible).toBeTruthy();

    const isKidsVisible = await mensPage.isVisible(mensPage.kidsLink);
    console.log('Kids Link visible:', isKidsVisible);
    expect(isKidsVisible).toBeTruthy();

    // Verify all critical elements
    expect(await mensPage.verifyLogoVisible()).toBeTruthy('Logo should be visible');
    expect(await mensPage.verifySearchBarVisible()).toBeTruthy('Search bar should be visible');
    expect(await mensPage.verifyFilterPanelVisible()).toBeTruthy('Filter panel should be visible');
    expect(await mensPage.verifyProductActionButtonsVisible()).toBeTruthy('Action buttons should be visible');
  });

  test('Navigate Between Product Categories', async ({ page }) => {
    // Ensure navigation is ready
    await mensPage.waitForNavigationReady();

    // Step 1: Hover over 'Mens' in the main navigation
    // Expected: Submenu appears showing category options: Formal Wear, Casual Wear, Active Wear, Footwear
    await mensPage.hoverOverMensMenu();
    
    // Wait a moment for submenu to appear
    await page.waitForTimeout(300);
    
    // Verify submenu links are visible
    expect(await mensPage.isVisible(mensPage.formalWearLink)).toBeTruthy();
    expect(await mensPage.isVisible(mensPage.casualWearLink)).toBeTruthy();
    expect(await mensPage.isVisible(mensPage.activeWearLink)).toBeTruthy();
    expect(await mensPage.isVisible(mensPage.footwearLink)).toBeTruthy();

    // Step 2: Click on 'Formal Wear' subcategory
    // Expected: Page navigates to formal wear products page
    await mensPage.click(mensPage.formalWearLink);
    
    // Wait for page to load after navigation
    await mensPage.waitForElement(mensPage.bagistoLogo);
    
    // Verify URL changes to /formal-wear-men
    const urlAfterNavigation = mensPage.getUrl();
    expect(urlAfterNavigation).toContain('formal-wear-men');

    await page.waitForTimeout(3000);

    // Verify products are displayed (filtered formal wear items)
    const productCount = await mensPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // Verify Add To Cart buttons are still visible on filtered products
    const isAddToCartVisible = await mensPage.isVisible(
      mensPage.addToCartButtons.first()
    );
    expect(isAddToCartVisible).toBeTruthy();

    // Step 3: Click on 'Mens' main category again
    // Expected: Page returns to all men's products
    await mensPage.waitForNavigationReady();
    await mensPage.hoverOverMensMenu();
    
    // Wait for submenu
    await page.waitForTimeout(300);
    
    const mensMainLink = page.getByRole('link', { name: 'Mens', exact: true });
    await mensPage.click(mensMainLink);

    // Wait for page to load
    await mensPage.waitForElement(mensPage.bagistoLogo);

    // Verify URL changes back to /mens
    const urlAfterReturn = mensPage.getUrl();
    expect(urlAfterReturn).toContain('/mens', 'Should navigate back to /mens');
    expect(urlAfterReturn).not.toContain('formal-wear-men', 'Should not contain formal-wear-men');

    // Verify all categories of men's products are visible again
    const finalProductCount = await mensPage.getProductCount();
    expect(finalProductCount).toBeGreaterThan(productCount);

    // Verify navigation menu items are still visible
    const menuItemsVisible = await mensPage.verifyNavigationMenuItems();
    expect(menuItemsVisible).toBeTruthy();

    // Verify filter panel is visible (indicating we're back on men's page)
    const filterPanelVisible = await mensPage.verifyFilterPanelVisible();
    expect(filterPanelVisible).toBeTruthy();
  });
});
