import BasePage from "./BasePage";

export default class SettingsPage extends BasePage {
    public removeMyAccountButton = this.page.locator("button", {hasText: "Remove my account"});

    async clickRemoveMyAccountButton(): Promise<void> {
        await this.removeMyAccountButton.click();
    };
};
