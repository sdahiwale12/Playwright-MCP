// spec: specs/bagisto-mens-test-plan.md
// Test for section 2: Search and Filtering
// Pattern: Page Object Model with Data-Driven Testing

const { test, expect } = require('@playwright/test');
const MensProductListingPage = require('../../pages/MensProductListingPage');
const filterTestData = require('../../testdata/filterTestData');

test.describe('Search and Filtering', () => {
  let mensPage;

  test.beforeEach(async ({ page }) => {
    mensPage = new MensProductListingPage(page);
    await mensPage.navigateToMensPage();
  });

  test('2.1 Search for Products by Keyword', async ({ page }) => {
    const { term, urlParam } = filterTestData.search;

    // Verify preconditions
    expect(await mensPage.verifyPageLoaded()).toBeTruthy();
    expect(await mensPage.verifySearchBarVisible()).toBeTruthy();

    // Execute search
    await mensPage.fill(mensPage.searchInput, term);
    const inputValue = await mensPage.inputValue(mensPage.searchInput);
    expect(inputValue).toContain(term);

    await mensPage.pressKey('Enter');
    await mensPage.waitForElement(mensPage.bagistoLogo);

    // Verify results
    expect(await mensPage.getTitle()).toContain(term);
    expect(mensPage.getUrl()).toContain(urlParam);
    expect(await mensPage.getProductCount()).toBeGreaterThan(0);
  });

  test('2.2 Filter Products by Price Range', async ({ page }) => {
    const { min, max } = filterTestData.price;
    const { filterApply } = filterTestData.timeouts;

    // Get baseline
    expect(await mensPage.verifyPageLoaded()).toBeTruthy();
    expect(await mensPage.verifyFilterPanelVisible()).toBeTruthy();
    const initialCount = await mensPage.getProductCount();

    // Apply filter
    await mensPage.expandPriceFilter();
    await mensPage.setPriceRange(min, max);
    await page.waitForTimeout(filterApply);

    // Verify filtered results
    const filteredCount = await mensPage.getProductCount();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThanOrEqual(initialCount);

    // Clear and verify reset
    await mensPage.clearAllFilters();
    await page.waitForTimeout(filterApply);
    const resetCount = await mensPage.getProductCount();
    expect(resetCount).toBe(initialCount);
  });

  // Data-driven test for color filters
  test.describe('Filter Products by Color', () => {
    filterTestData.colors.forEach(({ name, id, labelSelector, inputSelector }) => {
      test(`should filter products by ${name} color`, async ({ page }) => {
        const { filterApply } = filterTestData.timeouts;

        // Setup
        expect(await mensPage.verifyPageLoaded()).toBeTruthy();
        const initialCount = await mensPage.getProductCount();

        // Apply filter
        await mensPage.clickFilterOption(labelSelector);
        await page.waitForTimeout(filterApply);

        // Verify filter applied
        const input = await mensPage.getFilterOptionInput(inputSelector);
        await expect(input).toBeChecked();

        const filteredCount = await mensPage.getProductCount();
        expect(filteredCount).toBeGreaterThan(0);
        expect(filteredCount).toBeLessThanOrEqual(initialCount);
        expect(mensPage.getUrl()).toContain(`color=${id}`);

        // Reset
        await mensPage.clickFilterOption(labelSelector);
        await page.waitForTimeout(filterApply);
        await expect(input).not.toBeChecked();
        expect(await mensPage.getProductCount()).toBe(initialCount);
      });
    });
  });

  // Data-driven test for size filters
  test.describe('Filter Products by Size', () => {
    filterTestData.sizes.forEach(({ name, id, labelSelector, inputSelector }) => {
      test(`should filter products by size ${name}`, async ({ page }) => {
        const { filterApply } = filterTestData.timeouts;

        // Setup
        expect(await mensPage.verifyPageLoaded()).toBeTruthy();
        const initialCount = await mensPage.getProductCount();

        // Apply filter
        await mensPage.clickFilterOption(labelSelector);
        await page.waitForTimeout(filterApply);

        // Verify filter
        const input = await mensPage.getFilterOptionInput(inputSelector);
        await expect(input).toBeChecked();

        const filteredCount = await mensPage.getProductCount();
        expect(filteredCount).toBeGreaterThan(0);
        expect(filteredCount).toBeLessThanOrEqual(initialCount);
        expect(mensPage.getUrl()).toContain(`size=${id}`);

        // Cleanup
        await mensPage.clickFilterOption(labelSelector);
        await page.waitForTimeout(filterApply);
      });
    });

    test('should support multiple size selection (OR logic)', async ({ page }) => {
      const { filterApply } = filterTestData.timeouts;
      const [sizeM, sizeXL] = filterTestData.sizes;

      // Get baseline
      const initialCount = await mensPage.getProductCount();

      // Select M
      await mensPage.clickFilterOption(sizeM.labelSelector);
      await page.waitForTimeout(filterApply);
      const mInput = await mensPage.getFilterOptionInput(sizeM.inputSelector);
      await expect(mInput).toBeChecked();
      const mCount = await mensPage.getProductCount();

      // Add XL
      await mensPage.clickFilterOption(sizeXL.labelSelector);
      await page.waitForTimeout(filterApply);
      const xlInput = await mensPage.getFilterOptionInput(sizeXL.inputSelector);
      await expect(xlInput).toBeChecked();
      await expect(mInput).toBeChecked();

      const multiCount = await mensPage.getProductCount();
      expect(multiCount).toBeGreaterThanOrEqual(mCount);

      // Clean up
      await mensPage.clickFilterOption(sizeM.labelSelector);
      await mensPage.clickFilterOption(sizeXL.labelSelector);
      await page.waitForTimeout(filterApply);
    });
  });

  // Data-driven test for brand filters
  test.describe('Filter Products by Brand', () => {
    filterTestData.brands.forEach(({ name, labelSelector, inputSelector }) => {
      test(`should filter products by ${name} brand`, async ({ page }) => {
        const { filterApply } = filterTestData.timeouts;

        // Setup
        expect(await mensPage.verifyPageLoaded()).toBeTruthy();
        const initialCount = await mensPage.getProductCount();

        // Apply filter
        await mensPage.clickFilterOption(labelSelector);
        await page.waitForTimeout(filterApply);

        // Verify filter
        const input = await mensPage.getFilterOptionInput(inputSelector);
        await expect(input).toBeChecked();

        const brandCount = await mensPage.getProductCount();
        expect(brandCount).toBeGreaterThan(0);
        expect(brandCount).toBeLessThanOrEqual(initialCount);
      });
    });
  });

  test('2.6 Search Within Filter Options', async ({ page }) => {
    const { query, expectedVisible, expectedHidden } = filterTestData.filterSearch;
    const { filterApply } = filterTestData.timeouts;

    // Setup
    expect(await mensPage.verifyPageLoaded()).toBeTruthy();
    expect(await mensPage.isVisible(mensPage.colorFilterButton)).toBeTruthy();

    // Search in filter
    await mensPage.searchInFilter(query);
    await page.waitForTimeout(filterApply);

    // Verify filtered options
    for (const color of expectedVisible) {
      const checkbox = page.getByRole('checkbox', { name: color });
      expect(await mensPage.isVisible(checkbox)).toBeTruthy(`${color} should be visible when searching for '${query}'`);
    }

    for (const color of expectedHidden) {
      const checkbox = page.getByRole('checkbox', { name: color });
      expect(await mensPage.isVisible(checkbox)).toBeFalsy(`${color} should be hidden when searching for '${query}'`);
    }

    // Clear search and verify all options visible
    await mensPage.clearFilterSearch();
    await page.waitForTimeout(filterApply);

    const allColors = ['Blue', 'Black', 'Red', 'Green'];
    for (const color of allColors) {
      const checkbox = page.getByRole('checkbox', { name: color });
      expect(await mensPage.isVisible(checkbox)).toBeTruthy(`${color} should be visible after clearing search`);
    }
  });
});