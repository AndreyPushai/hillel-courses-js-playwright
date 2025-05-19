import { test as base, APIRequestContext } from "@playwright/test";
import { GaragePage } from "../poms";

type MyFixtures = {
    userGaragePage: GaragePage,
    userRequest: APIRequestContext
};

export const test = base.extend<MyFixtures>({
    userGaragePage: async ({ browser, baseURL }, use) => {
        const context = await browser.newContext({ storageState: "utils/user.json" });
        const page = await context.newPage();
        const garagePage = new GaragePage(page);
        await page.goto(baseURL);

        await use(garagePage);

        await context.close();
    },
    // eslint-disable-next-line
    userRequest: async ({ baseURL, request }, use) => {
        await request.post(`${baseURL}/api/auth/signin`, {
            data: {
                "email": process.env.userEmail2,
                "password": process.env.userPassword2,
                "remember": false
            }
        });

        await request.storageState({ path: "utils/user2.json" });
        await use(request);
    }
});
export { expect } from '@playwright/test';
