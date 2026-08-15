const { test, expect } =
    require('@playwright/test');

const { LoginPage } =
    require('../pages/LoginPage');

const { InventoryPage } =
    require('../pages/InventoryPage');

const { CartPage } =
    require('../pages/CartPage');

const { CheckoutPage } =
    require('../pages/CheckoutPage');


test(
    'UI-Q2 - Standard user should complete purchase successfully',
    async ({ page }) => {

        // Create Page Objects
        const loginPage =
            new LoginPage(page);

        const inventoryPage =
            new InventoryPage(page);

        const cartPage =
            new CartPage(page);

        const checkoutPage =
            new CheckoutPage(page);


        // =========================================
        // STEP 1: LOGIN
        // =========================================

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );


        // Verify successful login
        await expect(page)
            .toHaveURL(/inventory/);


        // =========================================
        // STEP 2: RESET APP STATE
        // =========================================

        await inventoryPage.resetAppState();


        // =========================================
        // STEP 3: ADD THREE PRODUCTS
        // =========================================

        await inventoryPage.addThreeProducts();


        // Verify that 3 products are in cart
        await expect(inventoryPage.cartBadge)
            .toHaveText('3');


        // =========================================
        // STEP 4: OPEN CART
        // =========================================

        await inventoryPage.openCart();


        // =========================================
        // STEP 5: VERIFY CART PRODUCTS
        // =========================================

        const cartProductNames =
            await cartPage.getProductNames();


        // There should be exactly 3 products
        expect(cartProductNames.length)
            .toBe(3);


        // Verify product names
        expect(cartProductNames)
            .toContain('Sauce Labs Backpack');

        expect(cartProductNames)
            .toContain('Sauce Labs Bike Light');

        expect(cartProductNames)
            .toContain('Sauce Labs Bolt T-Shirt');


        // =========================================
        // STEP 6: GO TO CHECKOUT
        // =========================================

        await cartPage.checkout();


        // =========================================
        // STEP 7: FILL CUSTOMER INFORMATION
        // =========================================

        await checkoutPage.fillInformation(
            'Yasin',
            'Mahmood',
            '4000'
        );


        // Continue to final checkout page
        await checkoutPage.continueCheckout();


        // =========================================
        // STEP 8: VERIFY PRODUCT NAMES
        // =========================================

        const checkoutProductNames =
            await checkoutPage.getProductNames();


        expect(checkoutProductNames.length)
            .toBe(3);


        expect(checkoutProductNames)
            .toContain('Sauce Labs Backpack');

        expect(checkoutProductNames)
            .toContain('Sauce Labs Bike Light');

        expect(checkoutProductNames)
            .toContain('Sauce Labs Bolt T-Shirt');


        // =========================================
        // STEP 9: VERIFY SUBTOTAL
        // =========================================

        const calculatedSubtotal =
            await checkoutPage.calculateProductTotal();


        const actualSubtotal =
            await checkoutPage.getSubtotal();


        // Compare calculated price with website price
        expect(actualSubtotal)
            .toBeCloseTo(calculatedSubtotal, 2);


        // =========================================
        // STEP 10: VERIFY TOTAL PRICE
        // =========================================

        const totalPrice =
            await checkoutPage.getTotalPrice();


        // Total should be greater than subtotal
        // because tax is added
        expect(totalPrice)
            .toBeGreaterThan(actualSubtotal);


        // =========================================
        // STEP 11: FINISH PURCHASE
        // =========================================

        await checkoutPage.finishPurchase();


        // =========================================
        // STEP 12: VERIFY SUCCESS MESSAGE
        // =========================================

        const successMessage =
            await checkoutPage.getSuccessMessage();


        expect(successMessage)
            .toContain(
                'Thank you for your order!'
            );


        // =========================================
        // STEP 13: RESET APP STATE AGAIN
        // =========================================

        // Go back to inventory page
        await page.goto('/inventory.html');


        await inventoryPage.resetAppState();


        // =========================================
        // STEP 14: LOGOUT
        // =========================================

        await inventoryPage.logout();


        // Verify that user is back at login page
        await expect(page)
            .toHaveURL(/saucedemo\.com/);
    }
);