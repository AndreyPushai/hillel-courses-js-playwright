import BasePage from "./BasePage";

export default class ProfilePage extends BasePage {
    public profileName = this.page.locator("p[class^='profile_name']");
};
