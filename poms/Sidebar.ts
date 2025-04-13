import BasePage from "./BasePage";

export default class Sidebar extends BasePage{
        public navigationSidebar = this.page.locator("nav[class*='sidebar']");
        public garageLink = this.navigationSidebar.locator("a[routerlink='garage']");
        public expensesLink = this.navigationSidebar.locator("a[routerlink='expenses']");
        public instructionsLink = this.navigationSidebar.locator("a[routerlink='instructions']");
        public profileLink = this.navigationSidebar.locator("a[routerlink='profile']");
        public settingsLink = this.navigationSidebar.locator("a[routerlink='settings']");
        public logOutLink = this.navigationSidebar.locator("a", {hasText: "Log out"});
};
