import { expect } from '@playwright/test';
import test from '../fixtures/base';
import { CUSTOMERS } from '../constants/users';

test.describe('Saucedemo app basic tests', () => {
    const standartUserCredentials = CUSTOMERS[0];
    test('Check to sort products by name (Z to A)', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin(standartUserCredentials.userName, standartUserCredentials.password);
        const namesBeforeSort = await app.inventory.getProductNames();
        await app.inventory.sortBy('za');
        const namesAfterSort = await app.inventory.getProductNames();
        const sortedNamesDescending = [...namesBeforeSort].sort((a, b) => b.localeCompare(a));
        expect(namesAfterSort).toEqual(sortedNamesDescending);
    });
});
