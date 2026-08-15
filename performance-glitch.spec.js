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
    'UI-Q3 - Performance glitch user should complete purchase successfully',
    async ({ page }) => {

        // =========================================
        // CREATE PAGE OBJECTS
        // =========================================

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
            'performance_glitch_user',
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
        // STEP 3: SORT NAME Z TO A
        // =========================================

        await inventoryPage.sortByNameZA();


        // =========================================
        // STEP 4: GET FIRST PRODUCT NAME
        // =========================================

        const firstProductName =
            await inventoryPage.inventoryItemNames
                .first()
                .textContent();


        // Make sure a product exists
        expect(firstProductName)
            .toBeTruthy();


        // =========================================
        // STEP 5: ADD FIRST PRODUCT TO CART
        // =========================================

        await inventoryPage.addFirstProduct();


        // Verify one product is in cart
        await expect(inventoryPage.cartBadge)
            .toHaveText('1');


        // =========================================
        // STEP 6: OPEN CART
        // =========================================

        await inventoryPage.openCart();


        // =========================================
        // STEP 7: VERIFY PRODUCT NAME IN CART
        // =========================================

        const cartProductNames =
            await cartPage.getProductNames();


        expect(cartProductNames.length)
            .toBe(1);


        expect(cartProductNames[0])
            .toBe(firstProductName.trim());


        // =========================================
        // STEP 8: GO TO CHECKOUT
        // =========================================

        await cartPage.checkout();


        // =========================================
        // STEP 9: FILL CUSTOMER INFORMATION
        // =========================================

        await checkoutPage.fillInformation(
            'Yasin',
            'Mahmood',
            '4000'
        );


        // Continue to final checkout
        await checkoutPage.continueCheckout();


        // =========================================
        // STEP 10: VERIFY PRODUCT NAME
        // =========================================

        const checkoutProductNames =
            await checkoutPage.getProductNames();


        expect(checkoutProductNames.length)
            .toBe(1);


        expect(checkoutProductNames[0])
            .toBe(firstProductName.trim());


        // =========================================
        // STEP 11: VERIFY TOTAL PRICE
        // =========================================

        const calculatedSubtotal =
            await checkoutPage.calculateProductTotal();


        const actualSubtotal =
            await checkoutPage.getSubtotal();


        // Verify product price
        expect(actualSubtotal)
            .toBeCloseTo(calculatedSubtotal, 2);


        // Get final total
        const totalPrice =
            await checkoutPage.getTotalPrice();


        // Final total should be greater than subtotal
        // because tax is added
        expect(totalPrice)
            .toBeGreaterThan(actualSubtotal);


        // =========================================
        // STEP 12: FINISH PURCHASE
        // =========================================

        await checkoutPage.finishPurchase();


        // =========================================
        // STEP 13: VERIFY SUCCESS MESSAGE
        // =========================================

        const successMessage =
            await checkoutPage.getSuccessMessage();


        expect(successMessage)
            .toContain(
                'Thank you for your order!'
            );


        // =========================================
        // STEP 14: RESET APP STATE AGAIN
        // =========================================

        await page.goto('/inventory.html');

        await inventoryPage.resetAppState();


        // =========================================
        // STEP 15: LOGOUT
        // =========================================

        await inventoryPage.logout();


        // Verify user returned to login page
        await expect(page)
            .toHaveURL(/saucedemo\.com/);
    }
);