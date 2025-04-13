import BasePage from "./BasePage";

export default class BasePopUp extends BasePage {
    public popUp = this.page.locator("div[class*='modal-dialog']")
    public popUpTitle = this.page.locator("[class='modal-title']")
};
