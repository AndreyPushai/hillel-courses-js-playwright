import { test, expect } from '@playwright/test';
import {Homepage, LoginPopUp, RegistrationPopUp, RemoveAccountPopUp, SettingsPage, Sidebar} from '../poms';


let homepage: Homepage;
let loginPopUp: LoginPopUp;
let registrationPopUp: RegistrationPopUp;
let sidebar: Sidebar;
let settingsPage: SettingsPage;
let removeAccountPopUp: RemoveAccountPopUp;
const ts = Date.now(); // timestamp

test.describe("Positive Registration tests", () => {
    test("Test user successfully registered", async ({ page }) => {

        await test.step("Open Login popup", async () => {
            await page.goto("/");
            homepage = new Homepage(page);
            await homepage.signInButton.click();
        });

        await test.step("Open Registration popup from Login popup", async () => {
            loginPopUp = new LoginPopUp(page);

            await loginPopUp.verifyIsVisible(true);
            await loginPopUp.registrationButton.click();
            await loginPopUp.verifyIsVisible(false);
        });

        await test.step("Fill and submit Registration form", async () => {
            registrationPopUp = new RegistrationPopUp(page);

            await registrationPopUp.verifyIsVisible(true);
            await registrationPopUp.verifyPopUpTitle("Registration");
            await registrationPopUp.fillAndSubmitForm(
                "name", "lastName", `test+${ts}@email.com`, "Password1");
            await registrationPopUp.verifyIsVisible(false);

        });

        await test.step("User redirected to garage page", async () => {
            await expect(page).toHaveURL("/panel/garage");
        });


        await test.step("Delete user account after it was created", async () => {
            sidebar = new Sidebar(page);
            await sidebar.clickLink("Settings");
            await expect(page).toHaveURL("/panel/settings");

            settingsPage = new SettingsPage(page);
            await settingsPage.clickRemoveMyAccountButton();

            removeAccountPopUp = new RemoveAccountPopUp(page);
            await removeAccountPopUp.verifyIsVisible(true);
            await removeAccountPopUp.verifyPopUpTitle("Remove account");
            await removeAccountPopUp.confirmRemoveAccount();
            await removeAccountPopUp.verifyIsVisible(false);

            await expect(page).toHaveURL("/");
        });
    });
});

test.describe("Negative Registration tests", () => {
    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        await page.goto("/");
        await homepage.signUpButton.click();
    });

    test("Test name validation", async ({ page }) => {
        registrationPopUp = new RegistrationPopUp(page);
        await registrationPopUp.nameInput.focus();
        await registrationPopUp.nameInput.blur();

        await expect(registrationPopUp.nameInputError).toBeVisible();
        await expect(registrationPopUp.nameInputError).toHaveText("Name required");

        await registrationPopUp.nameInput.fill("12");
        await expect(registrationPopUp.nameInputError).toHaveText("Name is invalid");
        await registrationPopUp.nameInput.clear();
        await registrationPopUp.nameInput.fill("a");
        await expect(registrationPopUp.nameInputError).toHaveText("Name has to be from 2 to 20 characters long");
    });

    test("Test last name validation", async ({ page }) => {
        registrationPopUp = new RegistrationPopUp(page);
        await registrationPopUp.lastNameInput.focus();
        await registrationPopUp.lastNameInput.blur();
        await expect(registrationPopUp.lastNameInputError).toBeVisible();
        await expect(registrationPopUp.lastNameInputError).toHaveText("Last name required");

        await registrationPopUp.lastNameInput.fill("12");
        await expect(registrationPopUp.lastNameInputError).toHaveText("Last name is invalid");
        await registrationPopUp.lastNameInput.clear();
        await registrationPopUp.lastNameInput.fill("a");
        await expect(registrationPopUp.lastNameInputError).toHaveText("Last name has to be from 2 to 20 characters long");
    });

    test("Test email validation", async ({ page }) => {
        registrationPopUp = new RegistrationPopUp(page);
        await registrationPopUp.emailInput.focus();
        await registrationPopUp.emailInput.blur();
        await expect(registrationPopUp.emailInputError).toBeVisible();
        await expect(registrationPopUp.emailInputError).toHaveText("Email required");

        await registrationPopUp.emailInput.fill("12");
        await expect(registrationPopUp.emailInputError).toHaveText("Email is incorrect");
    });

    test("Test password validation", async ({ page }) => {
        registrationPopUp = new RegistrationPopUp(page);
        await registrationPopUp.passwordInput.focus();
        await registrationPopUp.passwordInput.blur();
        await expect(registrationPopUp.passwordInputError).toBeVisible();
        await expect(registrationPopUp.passwordInputError).toHaveText("Password required");

        await registrationPopUp.passwordInput.fill("12");
        await expect(registrationPopUp.passwordInputError).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    });

    test("Test re-enter password validation", async ({ page }) => {
        registrationPopUp = new RegistrationPopUp(page);
        await registrationPopUp.repeatPasswordInput.focus();
        await registrationPopUp.repeatPasswordInput.blur();
        await expect(registrationPopUp.repeatPasswordInputError).toBeVisible();
        await expect(registrationPopUp.repeatPasswordInputError).toHaveText("Re-enter password required");

        await registrationPopUp.passwordInput.fill("Password1");
        await registrationPopUp.repeatPasswordInput.fill("Password2");
        await expect(registrationPopUp.repeatPasswordInputError).toHaveText("Passwords do not match");
    });

    test("Test submit button disabled in case of error", async ({ page }) => {
        registrationPopUp = new RegistrationPopUp(page);
        await registrationPopUp.nameInput.focus();
        await registrationPopUp.lastNameInput.fill("LastName");
        await registrationPopUp.emailInput.fill("test@email.com");
        await registrationPopUp.passwordInput.fill("Password1");
        await registrationPopUp.repeatPasswordInput.fill("Password1");
        await expect(registrationPopUp.registerButton).toBeDisabled();
    });
});
