// @ts-check
import { test as base } from '@playwright/test';
import Application from '../pages/Application';

const test = base.extend({
    app: async ({ browser, page }, use) => {
        test.info().annotations.push({
            type: 'Browser',
            description: `${browser.browserType().name()} ${browser.version()}`,
        });

        const app = new Application(page);

        await use(app);
    },
});

export default test;
