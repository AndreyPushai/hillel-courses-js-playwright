import BasePopUp from "./BasePopUp";

export default class LoginPopUp extends BasePopUp {
        public popUp = this.page.locator("app-signin-modal");
        public emailInput = this.page.locator("input[id='signinEmail']");
        public passwordInput = this.page.locator("input[id='signinPassword']");
        public registrationButton = this.page.locator("button", { hasText: "Registration" });
        public loginButton = this.page.locator("button", { hasText: "Login" });

    async fillAndSubmitForm(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    };
};
