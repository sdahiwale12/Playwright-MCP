# Bagisto Men's Product Page Test Plan

## Application Overview

This test plan covers comprehensive testing of the Bagisto e-commerce platform's men's product listing and product detail pages. The application is a fashion e-commerce platform offering various clothing and footwear items with features like filtering, searching, wishlist management, and cart functionality. Tests include happy path scenarios, edge cases, error handling, and user interaction validation.

## Test Scenarios

### 1. Product Listing and Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. View Men's Product Listing Page

**File:** `tests/bagisto-mens/product-listing.spec.ts`

**Steps:**
  1. Navigate to https://demo.bagisto.com/bagisto-common/mens
    - expect: Page loads successfully with title 'Mens'
    - expect: Product grid is visible with multiple products displayed
    - expect: Navigation header shows Bagisto logo and main menu items (Mens, Womens, Kids, Wellness)
    - expect: Search bar is visible in the header
    - expect: Filter panel is visible on the left side
    - expect: Products display price, Add To Cart, Add To Wishlist, and Add To Compare buttons
    - expect: Product badges (New, Sale) are visible where applicable

#### 1.2. Navigate Between Product Categories

**File:** `tests/bagisto-mens/category-navigation.spec.ts`

**Steps:**
  1. From the men's page, hover over 'Mens' in the main navigation
    - expect: Submenu appears showing category options: Formal Wear, Casual Wear, Active Wear, Footwear
  2. Click on 'Formal Wear' subcategory
    - expect: Page navigates to formal wear products page
    - expect: URL changes to /formal-wear-men
    - expect: Filtered products are displayed (formal wear items only)
  3. Click on 'Mens' main category again
    - expect: Page returns to all men's products
    - expect: All categories of men's products are visible

#### 1.3. Switch Between View Modes (Grid and List)

**File:** `tests/bagisto-mens/view-modes.spec.ts`

**Steps:**
  1. On the men's product page, locate the view mode buttons (Grid/List icons) in the top right sorting area
    - expect: Grid and List view toggle buttons are visible
    - expect: Grid view is active by default
  2. Click on the List view button
    - expect: Products are displayed in list format instead of grid
    - expect: Product information is displayed in rows
    - expect: List view button is now highlighted/active
  3. Click back on the Grid view button
    - expect: Products return to grid layout format
    - expect: Grid view button is now highlighted/active

### 2. Search and Filtering

**Seed:** `tests/seed.spec.ts`

#### 2.1. Search for Products by Keyword

**File:** `tests/bagisto-mens/search-functionality.spec.ts`

**Steps:**
  1. Navigate to the men's product page
    - expect: Page loads successfully
  2. Click on the search input field in the header
    - expect: Search input field is focused and ready for input
    - expect: Placeholder text 'Search products here' is visible
  3. Type 'sneakers' in the search field
    - expect: Text 'sneakers' appears in the search input
  4. Press Enter to execute the search
    - expect: Page navigates to search results page
    - expect: URL changes to contain search query parameter (e.g., /search?query=sneakers)
    - expect: Page title shows 'These are results for: sneakers'
    - expect: Search results display only products matching 'sneakers'

#### 2.2. Filter Products by Price Range

**File:** `tests/bagisto-mens/price-filter.spec.ts`

**Steps:**
  1. Navigate to the men's product page
    - expect: Page loads successfully
  2. Locate the Price filter on the left panel
    - expect: Price filter section is visible
    - expect: Default range shows '$0.00 - $299.99'
    - expect: Min and Max price sliders are visible
  3. Drag the Min price slider to set a minimum price of approximately $50
    - expect: Min price slider updates
    - expect: Price range in the filter updates to show new minimum value
    - expect: Products are filtered to show only items within the new price range
    - expect: Products below $50 are no longer displayed
  4. Drag the Max price slider to set a maximum price of approximately $150
    - expect: Max price slider updates
    - expect: Price range updates to show new maximum value
    - expect: Only products in the $50-$150 range are displayed
  5. Click 'Clear All' filters button
    - expect: All filters are reset
    - expect: Price sliders return to default position
    - expect: All products are displayed again

#### 2.3. Filter Products by Color

**File:** `tests/bagisto-mens/color-filter.spec.ts`

**Steps:**
  1. Navigate to the men's product page
    - expect: Page loads successfully
  2. Expand the Color filter section (if collapsed)
    - expect: Color filter options expand
    - expect: 'Showing 12 of 12 options' text appears
    - expect: Color checkboxes are visible (Red, Green, Yellow, Black, White, Orange, Blue, Pink, Purple, Grey, Dual Tone, Brown)
  3. Click on the 'Black' color checkbox
    - expect: Black color checkbox becomes checked
    - expect: Products are filtered to show only black items
    - expect: Product count updates to reflect filtered results
  4. Click on the 'Red' color checkbox to add another color filter
    - expect: Both Black and Red checkboxes are checked
    - expect: Products showing include only items that are either black OR red
    - expect: Product count updates accordingly
  5. Uncheck the Black checkbox
    - expect: Only Red checkbox remains checked
    - expect: Products showing only include red items

#### 2.4. Filter Products by Size

**File:** `tests/bagisto-mens/size-filter.spec.ts`

**Steps:**
  1. Navigate to the men's product page
    - expect: Page loads successfully
  2. Expand the Size filter section
    - expect: Size filter options are visible
    - expect: 'Showing 6 of 6 options' appears
    - expect: All sizes are available: S, M, L, XL, XXL, Free Size
  3. Click on the 'M' (Medium) size checkbox
    - expect: M size checkbox is checked
    - expect: Products are filtered to show only items available in size M
    - expect: Products without size M are hidden
  4. Click on the 'XL' size checkbox
    - expect: Both M and XL are checked
    - expect: Products are filtered to show items available in either M or XL size
    - expect: Product list updates accordingly

#### 2.5. Filter Products by Brand

**File:** `tests/bagisto-mens/brand-filter.spec.ts`

**Steps:**
  1. Navigate to the men's product page
    - expect: Page loads successfully
  2. Expand the Brand filter section
    - expect: Brand filter options are visible
    - expect: 'Showing 3 of 3 options' appears
    - expect: Brand options available: Adidas, Nike, Elegance
  3. Click on the 'Nike' brand checkbox
    - expect: Nike checkbox is checked
    - expect: Products are filtered to show only Nike brand items
    - expect: Non-Nike products are hidden
  4. Click on the 'Adidas' brand checkbox
    - expect: Both Nike and Adidas are checked
    - expect: Products from Nike OR Adidas brands are displayed
    - expect: Other brands are filtered out

#### 2.6. Search Within Filter Options

**File:** `tests/bagisto-mens/filter-search.spec.ts`

**Steps:**
  1. Navigate to the men's product page
    - expect: Page loads successfully
  2. Expand the Color filter section
    - expect: Color filter with search box is visible
    - expect: Search input field shows placeholder text 'Search'
  3. Click on the search field within Color filter and type 'bl'
    - expect: Search text is entered
    - expect: Filter options are narrowed down to show only 'Blue' and 'Black' colors
    - expect: Other color options are hidden
  4. Clear the search field
    - expect: All 12 color options are displayed again

### 3. Product Details and Interactions

**Seed:** `tests/seed.spec.ts`

#### 3.1. View Product Details

**File:** `tests/bagisto-mens/product-details.spec.ts`

**Steps:**
  1. Navigate to the men's product page and click on the first product 'Executive Elegance Men's Formal Office Suit'
    - expect: Product detail page loads successfully
    - expect: URL changes to product-specific URL
    - expect: Product name is displayed as main heading
    - expect: Breadcrumb navigation shows 'Home > Product Name'
    - expect: Product image is displayed with thumbnail gallery
    - expect: Product price is shown with 'As low as' label
    - expect: Product description is visible

#### 3.2. Select Product Options (Color and Size)

**File:** `tests/bagisto-mens/product-options.spec.ts`

**Steps:**
  1. Navigate to a product detail page (e.g., Executive Elegance Suit)
    - expect: Product page loads successfully
    - expect: Color dropdown is visible with 'Please select an option' as default
    - expect: Size dropdown is visible and disabled (grayed out)
  2. Click on the Color dropdown
    - expect: Color dropdown expands
    - expect: Available colors are displayed (e.g., Green, Blue)
  3. Select 'Green' from the Color dropdown
    - expect: Green color is selected and displayed in the dropdown
    - expect: Size dropdown becomes enabled (no longer grayed out)
    - expect: Size options become available for selection
  4. Click on the Size dropdown
    - expect: Size dropdown expands
    - expect: Available sizes are displayed for the selected color
  5. Select size 'M' (Medium) from the dropdown
    - expect: Medium size is selected and displayed in the Size dropdown
    - expect: Product page shows selected color and size options

#### 3.3. Adjust Product Quantity

**File:** `tests/bagisto-mens/quantity-adjustment.spec.ts`

**Steps:**
  1. Navigate to a product detail page
    - expect: Product detail page loads
    - expect: Quantity selector is visible with default value of 1
  2. Click the 'Increase Quantity' button three times
    - expect: Quantity increases from 1 to 2 after first click
    - expect: Quantity increases to 3 after second click
    - expect: Quantity increases to 4 after third click
  3. Click the 'Decrease Quantity' button twice
    - expect: Quantity decreases from 4 to 3
    - expect: Quantity decreases from 3 to 2
  4. Click the 'Decrease Quantity' button when quantity is 1
    - expect: Quantity remains 1 (does not go below 1)

#### 3.4. View Product Tabs (Description, Additional Info, Reviews)

**File:** `tests/bagisto-mens/product-tabs.spec.ts`

**Steps:**
  1. Navigate to a product detail page
    - expect: Three tabs are visible: Description, Additional Information, Reviews
    - expect: Description tab is active by default
    - expect: Product description and key features are displayed
  2. Click on the 'Additional Information' tab
    - expect: Additional Information tab becomes active
    - expect: Additional product details are displayed
  3. Click on the 'Reviews' tab
    - expect: Reviews tab becomes active
    - expect: Reviews section is displayed (may show no reviews if none exist)
  4. Click back on the 'Description' tab
    - expect: Description tab is active again
    - expect: Original description content is displayed

### 4. Shopping Cart and Wishlist

**Seed:** `tests/seed.spec.ts`

#### 4.1. Add Product to Cart from Product Details

**File:** `tests/bagisto-mens/add-to-cart.spec.ts`

**Steps:**
  1. Navigate to a product detail page
    - expect: Product page loads
    - expect: 'Add To Cart' button is visible and enabled
  2. Select product options (color and size)
    - expect: Color option is selected
    - expect: Size option is selected
    - expect: Size dropdown is no longer disabled
  3. Click the 'Add To Cart' button
    - expect: Product is added to cart
    - expect: Success notification appears (if applicable)
    - expect: Cart indicator in header updates to show item count

#### 4.2. Add Product to Wishlist from Product Listing

**File:** `tests/bagisto-mens/add-to-wishlist.spec.ts`

**Steps:**
  1. Navigate to the men's product listing page
    - expect: Product listing page loads with products visible
  2. Click the 'Add To Wishlist' button (heart icon) on the first product
    - expect: Wishlist button is highlighted or changes appearance indicating the item was added
    - expect: Success notification appears (if applicable)
  3. Click the 'Add To Wishlist' button again on the same product
    - expect: Product is removed from wishlist
    - expect: Wishlist button returns to original state

#### 4.3. Add Product to Compare

**File:** `tests/bagisto-mens/add-to-compare.spec.ts`

**Steps:**
  1. Navigate to the men's product listing page
    - expect: Product listing page loads
  2. Click the 'Add To Compare' button on the first product
    - expect: Product is added to compare list
    - expect: Button state changes to indicate product is added
  3. Click the 'Add To Compare' button on a second product
    - expect: Second product is added to compare list
  4. Click on the 'Compare' link in the header
    - expect: Compare page loads
    - expect: Both products are displayed side-by-side for comparison

### 5. Sorting and Pagination

**Seed:** `tests/seed.spec.ts`

#### 5.1. Sort Products by Price

**File:** `tests/bagisto-mens/sort-products.spec.ts`

**Steps:**
  1. Navigate to the men's product listing page
    - expect: Product listing loads with default sorting (Expensive First)
  2. Click on the sort dropdown button showing 'Expensive First'
    - expect: Sort options dropdown appears
    - expect: Available sorting options are displayed (e.g., Price Low to High, Price High to Low, etc.)
  3. Select 'Price Low to High' from the dropdown
    - expect: Products are re-sorted to display items from lowest to highest price
    - expect: First product shown has the lowest price
    - expect: Last product shown has the highest price within the visible list
  4. Change sort back to 'Expensive First'
    - expect: Products are re-sorted to show most expensive items first

#### 5.2. Change Items Per Page

**File:** `tests/bagisto-mens/items-per-page.spec.ts`

**Steps:**
  1. Navigate to the men's product listing page
    - expect: Page displays 12 products by default
    - expect: 'Items per page' dropdown shows '12' as default
  2. Click on the items per page dropdown
    - expect: Dropdown expands showing options (e.g., 6, 12, 24, 48)
  3. Select '6' from the dropdown
    - expect: Page reloads showing only 6 products per page
    - expect: Products are displayed in product grid format
  4. Change back to '12' items per page
    - expect: Page updates to display 12 products again

### 6. Header and Footer Actions

**Seed:** `tests/seed.spec.ts`

#### 6.1. Access and Use Currency Selector

**File:** `tests/bagisto-mens/currency-selector.spec.ts`

**Steps:**
  1. Navigate to the men's product page
    - expect: Page loads successfully
    - expect: Currency selector showing '$ USD' is visible in the header
  2. Click on the currency selector button
    - expect: Currency dropdown appears
    - expect: Available currency options are displayed
  3. Select a different currency (if available)
    - expect: Currency is changed
    - expect: Product prices are updated to reflect the new currency
    - expect: Prices display correct currency symbol

#### 6.2. Access Language Selector

**File:** `tests/bagisto-mens/language-selector.spec.ts`

**Steps:**
  1. Navigate to the men's product page
    - expect: Page loads successfully
    - expect: Language selector showing 'English' is visible in the header with locale icon
  2. Click on the language selector button
    - expect: Language dropdown appears
    - expect: Available language options are displayed
  3. Select a different language if available
    - expect: Page content updates to the selected language
    - expect: Product names and descriptions are translated (if available)

#### 6.3. View Promotional Banner and Click Shop Now

**File:** `tests/bagisto-mens/promo-banner.spec.ts`

**Steps:**
  1. Navigate to the men's product page
    - expect: Promotional banner is visible at the top saying 'Get UPTO 40% OFF on your 1st order'
    - expect: 'SHOP NOW' button is visible in the banner
  2. Click the 'SHOP NOW' button
    - expect: User is navigated to products page or promotional landing page
    - expect: Promotional discount information is accessible

#### 6.4. Access Footer Links

**File:** `tests/bagisto-mens/footer-links.spec.ts`

**Steps:**
  1. Scroll down to the footer section on the men's product page
    - expect: Footer section is visible
    - expect: Multiple footer links are displayed in columns
  2. Click on 'About Us' link in the footer
    - expect: Page navigates to About Us page
    - expect: URL changes to about-us page
  3. Go back and click on 'Privacy Policy' link
    - expect: Page navigates to Privacy Policy page
    - expect: Privacy policy content is displayed
  4. Go back and click on 'Contact Us' link
    - expect: Page navigates to Contact Us page
    - expect: Contact form or contact information is displayed

#### 6.5. Subscribe to Newsletter

**File:** `tests/bagisto-mens/newsletter-subscription.spec.ts`

**Steps:**
  1. Scroll to the footer newsletter subscription section
    - expect: Newsletter section is visible with heading 'Get Ready for our Fun Newsletter!'
    - expect: Subscription message says 'Subscribe to stay in touch'
    - expect: Email input field is visible with placeholder 'email@example.com'
    - expect: 'Subscribe' button is visible
  2. Enter 'test@example.com' in the email field
    - expect: Email address is entered in the input field
  3. Click the 'Subscribe' button
    - expect: Email is submitted
    - expect: Success message or confirmation appears
    - expect: Email field is cleared or disabled after submission

### 7. Edge Cases and Validation

**Seed:** `tests/seed.spec.ts`

#### 7.1. Handle Empty Search Results

**File:** `tests/bagisto-mens/empty-search.spec.ts`

**Steps:**
  1. Navigate to the men's product page
    - expect: Page loads successfully
  2. Search for a non-existent product term like 'zzzzunknownproductzzz'
    - expect: Page navigates to search results page
    - expect: Message indicates no products found or empty results displayed
    - expect: No products are shown on the page

#### 7.2. Validate Product Page Requires Option Selection

**File:** `tests/bagisto-mens/option-validation.spec.ts`

**Steps:**
  1. Navigate to a product that requires color selection
    - expect: Product detail page loads
    - expect: Color dropdown shows 'Please select an option'
  2. Try to click 'Add To Cart' without selecting color
    - expect: Either Add To Cart is disabled, or an error message appears
    - expect: Required field validation is triggered

#### 7.3. Validate Filter Combinations

**File:** `tests/bagisto-mens/filter-combinations.spec.ts`

**Steps:**
  1. Navigate to men's product page
    - expect: Page loads with all filters available
  2. Apply multiple filters: Price range ($50-$150), Color (Blue), Size (L), Brand (Nike)
    - expect: All filters are applied correctly
    - expect: Products are filtered using AND logic (all criteria must match)
    - expect: Only products matching ALL filter conditions are displayed
  3. Clear one filter at a time and verify results update
    - expect: Removing each filter updates the product list accordingly
    - expect: Removing filters expands the product selection

#### 7.4. Test Responsive Behavior on Different Viewports

**File:** `tests/bagisto-mens/responsive-design.spec.ts`

**Steps:**
  1. Navigate to men's product page on a desktop viewport (1920x1080)
    - expect: Product grid displays 4 columns
    - expect: Filter panel is visible on the left
    - expect: Navigation is fully visible
  2. Resize viewport to tablet size (768x1024)
    - expect: Product grid adjusts to 2 columns
    - expect: Filter panel may collapse or become accessible via menu
    - expect: Navigation adjusts appropriately
  3. Resize viewport to mobile size (375x667)
    - expect: Product grid displays single column
    - expect: Filter panel is hidden or accessible via menu/toggle button
    - expect: Navigation is mobile-optimized (hamburger menu)
    - expect: All interactive elements remain accessible

#### 7.5. Invalid Email Submission in Newsletter

**File:** `tests/bagisto-mens/newsletter-validation.spec.ts`

**Steps:**
  1. Scroll to newsletter subscription section
    - expect: Newsletter section is visible
  2. Enter an invalid email format like 'notanemail' in the email field
    - expect: Invalid email is entered in the field
  3. Click the 'Subscribe' button
    - expect: Validation error appears
    - expect: Error message indicates invalid email format
    - expect: Form is not submitted
