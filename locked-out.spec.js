const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('UI-Q1 - Locked out user should receive error message', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        'locked_out_user',
        'secret_sauce'
    );

    const errorMessage = await loginPage.getErrorMessage();

    expect(errorMessage).toContain(
        'Sorry, this user has been locked out.'
    );
});