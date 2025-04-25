import {Locator} from "@playwright/test";
import BasePopUp from "./BasePopUp";

export default class RemoveCarPopUp extends BasePopUp {
    public popUp: Locator = this.page.locator("app-remove-car-modal");
    public removeButton = this.popUp.locator("button", {hasText: "Remove"});

    async clickRemoveButton() {
        await this.removeButton.click();
    };
};
