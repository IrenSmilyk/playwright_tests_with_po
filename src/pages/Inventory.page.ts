// @ts-check
import BaseSwagLabPage from './BaseSwagLab.page';

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    sortDropdown = this.page.locator('select.product_sort_container');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async sortBy(optionText) {
        await this.sortDropdown.selectOption({ value: optionText });
    }

    async getAllProducts() {
        return this.inventoryItems.evaluateAll((items) => items.map((item) => ({
            name: (item.querySelector('.inventory_item_name') as HTMLElement)?.innerText || '',
            description: (item.querySelector('.inventory_item_desc') as HTMLElement)?.innerText || '',
            price: (item.querySelector('.inventory_item_price') as HTMLElement)?.innerText || ''
        })));
    }

    async getProductNames() {
        const products = await this.getAllProducts();
        return products.map((product) => product.name);
    }
}
export default InventoryPage;
