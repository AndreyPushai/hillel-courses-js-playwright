import { Locator } from "@playwright/test";
import BasePage from "./BasePage";

type SidebarLinks = "Garage" | "Fuel expenses" | "Instructions" | "Profile" | "Settings" | "Log out";

export default class Sidebar extends BasePage{
    public navigationSidebar = this.page.locator("nav[class*='sidebar']");

    async getLink(name: SidebarLinks): Promise<Locator> {
        return this.navigationSidebar.locator("a", {hasText: name});
    };

    async clickLink(name: SidebarLinks): Promise<void> {
        const link = await this.getLink(name);
        await link.click();
    };
};
