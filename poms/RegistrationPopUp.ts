import BasePopUp from "./BasePopUp";

export default class RegistrationPopUp extends BasePopUp {
        public popUp = this.page.locator("app-signup-modal");
        public nameInput = this.popUp.locator("input[id='signupName']");
        public nameInputError = this.popUp.locator("div[class='form-group']:has(input[id='signupName']) div[class='invalid-feedback'] p");
        public lastNameInput = this.popUp.locator("input[id='signupLastName']");
        public lastNameInputError = this.popUp.locator("div[class='form-group']:has(input[id='signupLastName']) div[class='invalid-feedback'] p");
        public emailInput = this.popUp.locator("input[id='signupEmail']");
        public emailInputError = this.popUp.locator("div[class='form-group']:has(input[id='signupEmail']) div[class='invalid-feedback'] p");
        public passwordInput = this.popUp.locator("input[id='signupPassword']");
        public passwordInputError = this.popUp.locator("div[class='form-group']:has(input[id='signupPassword']) div[class='invalid-feedback'] p");
        public repeatPasswordInput = this.popUp.locator("input[id='signupRepeatPassword']");
        public repeatPasswordInputError = this.popUp.locator("div[class='form-group']:has(input[id='signupRepeatPassword']) div[class='invalid-feedback'] p");
        public registerButton = this.popUp.locator("button", { hasText: "Register" });

    async fillAndSubmitForm(name: string,
                      lastName: string,
                      email: string,
                      password: string): Promise<void> {

        await this.nameInput.type(name);
        await this.lastNameInput.type(lastName);
        await this.emailInput.type(email);
        await this.passwordInput.type(password);
        await this.repeatPasswordInput.type(password);
        await this.registerButton.click();
    };
};
