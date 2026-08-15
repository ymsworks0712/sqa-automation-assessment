class CartPage {

    constructor(page) {

        this.page = page;

        // Checkout button
        this.checkoutButton =
            page.locator('[data-test="checkout"]');

        // Items inside cart
        this.cartItems =
            page.locator('.cart_item');

        // Product names
        this.productNames =
            page.locator('.inventory_item_name');

        // Product prices
        this.productPrices =
            page.locator('.inventory_item_price');
    }


    // Click checkout
    async checkout() {

        await this.checkoutButton.click();
    }


    // Get all product names
    async getProductNames() {

        return await this.productNames.allTextContents();
    }


    // Get all product prices
    async getProductPrices() {

        return await this.productPrices.allTextContents();
    }
}


module.exports = { CartPage };