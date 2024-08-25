import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { CUSTOMERS } from '../constants/users';

test.describe('Unit 10  test1', () => {
    const user = CUSTOMERS.standard_user;
    test('Check all sorting options', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin(user.userName, user.password);

        // Sort by name A to Z
        let isSorted = await app.inventory.verifySorting('az', app.inventory.getProductNames.bind(app.inventory), (a, b) => a.localeCompare(b));
        expect(isSorted).toBe(true);

        // Sort by name Z to A
        isSorted = await app.inventory.verifySorting('za', app.inventory.getProductNames.bind(app.inventory), (a, b) => b.localeCompare(a));
        expect(isSorted).toBe(true);

        // Sort by price low to high
        isSorted = await app.inventory.verifySorting('lohi', app.inventory.getProductPrices.bind(app.inventory), (a, b) => a - b);
        expect(isSorted).toBe(true);

        // Sort by price high to low
        isSorted = await app.inventory.verifySorting('hilo', app.inventory.getProductPrices.bind(app.inventory), (a, b) => b - a);
        expect(isSorted).toBe(true);
    });
});
