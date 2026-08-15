class CheckoutPage {

    constructor(page) {

        this.page = page;

        // Customer information
        this.firstName =
            page.locator('[data-test="firstName"]');

        this.lastName =
            page.locator('[data-test="lastName"]');

        this.postalCode =
            page.locator('[data-test="postalCode"]');

        // Continue button
        this.continueButton =
            page.locator('[data-test="continue"]');

        // Final checkout product names
        this.itemNames =
            page.locator('.inventory_item_name');

        // Final checkout product prices
        this.itemPrices =
            page.locator('.inventory_item_price');

        // Item total
        this.subtotal =
            page.locator('[data-test="subtotal-label"]');

        // Final total
        this.total =
            page.locator('[data-test="total-label"]');

        // Finish button
        this.finishButton =
            page.locator('[data-test="finish"]');

        // Success message
        this.completeHeader =
            page.locator('[data-test="complete-header"]');
    }


    // Fill customer information
    async fillInformation(
        firstName,
        lastName,
        postalCode
    ) {

        await this.firstName.fill(firstName);

        await this.lastName.fill(lastName);

        await this.postalCode.fill(postalCode);
    }


    // Continue to final checkout page
    async continueCheckout() {

        await this.continueButton.click();
    }


    // Get product names
    async getProductNames() {

        return await this.itemNames.allTextContents();
    }


    // Get product prices
    async getProductPrices() {

        return await this.itemPrices.allTextContents();
    }


    // Get final total
    async getTotalPrice() {

        const text =
            await this.total.textContent();

        return parseFloat(
            text.replace('Total: $', '')
        );
    }


    // Get item subtotal
    async getSubtotal() {

        const text =
            await this.subtotal.textContent();

        return parseFloat(
            text.replace('Item total: $', '')
        );
    }


    // Calculate total of product prices
    async calculateProductTotal() {

        const prices =
            await this.itemPrices.allTextContents();

        return prices.reduce(
            (sum, priceText) => {

                const price =
                    parseFloat(
                        priceText.replace('$', '')
                    );

                return sum + price;

            },
            0
        );
    }


    // Finish purchase
    async finishPurchase() {

        await this.finishButton.click();
    }


    // Get success message
    async getSuccessMessage() {

        return await this.completeHeader.textContent();
    }
}


module.exports = { CheckoutPage };