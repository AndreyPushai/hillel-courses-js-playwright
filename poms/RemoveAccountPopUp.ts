import BasePopUp from "./BasePopUp";

export default class RemoveAccountPopUp extends BasePopUp {
    public popUp = this.page.locator("app-remove-account-modal");
    public removeButton = this.popUp.locator("button", {hasText: "Remove"});

    async confirmRemoveAccount(): Promise<void> {
        await this.removeButton.click();
    };
};
