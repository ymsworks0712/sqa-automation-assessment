class InventoryPage {

    constructor(page) {

        this.page = page;

        // Hamburger menu button
        this.menuButton =
            page.locator('#react-burger-menu-btn');

        // Close menu button
        this.closeMenuButton =
            page.locator('#react-burger-cross-btn');

        // Reset App State
        this.resetAppStateLink =
            page.locator('#reset_sidebar_link');

        // Logout
        this.logoutLink =
            page.locator('#logout_sidebar_link');

        // Shopping cart
        this.cartLink =
            page.locator('.shopping_cart_link');

        // Cart item count
        this.cartBadge =
            page.locator('.shopping_cart_badge');

        // Product list
        this.inventoryItems =
            page.locator('.inventory_item');

        // Product names
        this.inventoryItemNames =
            page.locator('.inventory_item_name');

        // Product sorting dropdown
    this.sortDropdown =
        page.locator('[data-test="product-sort-container"]');
    }


    // =========================================
    // OPEN MENU
    // =========================================

    async openMenu() {

       const menuAlreadyOpen =
        await this.closeMenuButton.isVisible();

    if (!menuAlreadyOpen) {

        await this.menuButton.click();
    }

    // Wait until the menu is attached
    await this.resetAppStateLink.waitFor({
        state: 'attached'
    });
    }


    // =========================================
    // CLOSE MENU
    // =========================================

    async closeMenu() {

        const menuAlreadyOpen =
            await this.closeMenuButton.isVisible();

        if (menuAlreadyOpen) {

            await this.closeMenuButton.click();
        }
    }


    // =========================================
    // RESET APP STATE
    // =========================================

    async resetAppState() {

        // Open hamburger menu
    await this.openMenu();

    // Wait for the menu item to exist
    await this.resetAppStateLink.waitFor({
        state: 'attached'
    });

    // Click the Reset App State link through the DOM
    await this.resetAppStateLink.evaluate(
        (element) => element.click()
    );
    }


    // =========================================
    // LOGOUT
    // =========================================

    async logout() {

        // Open hamburger menu
    await this.openMenu();

    // Wait for logout link
    await this.logoutLink.waitFor({
        state: 'attached'
    });

    // Click logout through the DOM
    await this.logoutLink.evaluate(
        (element) => element.click()
    );
    }


    // =========================================
    // ADD PRODUCT BY INDEX
    // =========================================

    async addProductByIndex(index) {

        const product =
            this.inventoryItems.nth(index);

        await product
            .locator('button')
            .click();
    }

   // =========================================
// SORT PRODUCTS
// =========================================

async sortByNameZA() {

    await this.sortDropdown.selectOption('za');
}

// =========================================
// ADD FIRST PRODUCT
// =========================================

async addFirstProduct() {

    await this.addProductByIndex(0);
}

    // =========================================
    // ADD THREE PRODUCTS
    // =========================================

    async addThreeProducts() {

        await this.addProductByIndex(0);

        await this.addProductByIndex(1);

        await this.addProductByIndex(2);
    }


    // =========================================
    // OPEN CART
    // =========================================

    async openCart() {

        await this.cartLink.click();
    }
}


module.exports = { InventoryPage };
