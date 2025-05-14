import { test as base } from "@playwright/test";
import { GaragePage } from "../poms";

type MyFixtures = {
    userGaragePage: GaragePage
};

export const test = base.extend<MyFixtures>({
    userGaragePage: async ({ browser, baseURL }, use) => {
        const context = await browser.newContext({ storageState: "utils/user.json"});
        const page = await context.newPage();
        const garagePage = new GaragePage(page);
        await page.goto(baseURL);

        await use(garagePage);

        await context.close();
    }
});
export { expect } from '@playwright/test';
