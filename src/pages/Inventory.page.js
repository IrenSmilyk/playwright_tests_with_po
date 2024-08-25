// @ts-check
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.getByTestId('secondary-header');

    inventoryItems = this.page.locator('.inventory_item');

    sortDropdown = this.page.locator('select.product_sort_container');

    async addItemToCartById(id) {
        await this.page.getByTestId(`add-to-cart-sauce-labs-bike-light-${id}`).click();
    }

    async sortBy(optionText) {
        await this.sortDropdown.selectOption({ value: optionText });
    }

    async getAllProducts() {
        const allProducts = await this.inventoryItems.all();
        return Promise.all(allProducts.map(async (element) => {
            const name = await element.locator('.inventory_item_name').innerText();
            const price = parseFloat((await element.locator('.inventory_item_price').innerText()).replace('$', ''));
            return { name, price };
        }));
    }

    async getProductNames() {
        const products = await this.getAllProducts();
        return products.map((product) => product.name);
    }

    async getProductPrices() {
        const products = await this.getAllProducts();
        return products.map((product) => product.price);
    }

    async verifySorting(optionText, getItems, compareFunction) {
        await this.sortBy(optionText);
        const items = await getItems();
        const sortedItems = [...items].sort(compareFunction);
        return items.every((item, index) => item === sortedItems[index]);
    }
}
