import BasePage from "./BasePage";

export default class GaragePage extends BasePage {

    public addCarButton = this.page.locator("button", {hasText: "Add car"})

    async clickAddCarButton() {
        await this.addCarButton.click();
    };
};
