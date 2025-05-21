import { test, expect } from "../fixtures/fixtures";
import { faker } from "@faker-js/faker";
import {ProfilePage} from "../poms";

let profilePage: ProfilePage;

test.describe("Test profile name can be changed", () => {
    test("Test profile name changed with API", async({ userGaragePage }) => {

        const name = faker.person.firstName();
        const lastName = faker.person.lastName();

        await userGaragePage.page.request.put(
            "/api/users/profile",
            {data: {
                "name": name,
                "lastName": lastName,
            }}
        );

        await userGaragePage.page.goto("/panel/profile");
        profilePage = new ProfilePage(userGaragePage.page); 
        await expect(profilePage.profileName).toContainText(name);
        await expect(profilePage.profileName).toContainText(lastName);
    });

    test("Mock user data", async ({ userGaragePage }) => {

        const name = faker.person.firstName();
        const lastName = faker.person.lastName();

        await userGaragePage.page.route('/api/users/profile', async route => {
            const response = await route.fetch();
            const json = await response.json();
            
            json.data.name = name;
            json.data.lastName = lastName;

            await route.fulfill({ response, json });
        });
        await userGaragePage.page.goto("/panel/profile");


        profilePage = new ProfilePage(userGaragePage.page); 
        await expect(profilePage.profileName).toContainText(name);
        await expect(profilePage.profileName).toContainText(lastName);
    });
});
