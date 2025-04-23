import {expect} from "@playwright/test";
import BasePage from "./BasePage";

export default class BasePopUp extends BasePage {
    public popUp = this.page.locator("div[class*='modal-dialog']")
    public popUpTitle = this.page.locator("[class='modal-title']")

    async verifyIsVisible(visible: boolean): Promise<void> {
        if (visible) {
            await expect(this.popUp).toBeVisible();
        } else {
            await expect(this.popUp).not.toBeVisible();
        };
    };

    async verifyPopUpTitle(expected: string): Promise<void> {
        await expect(this.popUpTitle).toHaveText(expected);
    };
};
