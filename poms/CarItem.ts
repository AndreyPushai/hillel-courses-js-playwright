import BasePage from "./BasePage";

export default class CarItem extends BasePage {

        public item = this.page.locator("app-car");
        public carName = this.item.locator("p[class*='car_name']");
        public editButton = this.item.locator("button[class*='car_edit']");
        public addFuelExpenseButton = this.item.locator("button[class*='car_add-expense']");
        public updateMileageInput = this.item.locator("input[class*='update-mileage']");
        public updateMileageButton = this.item.locator("button[class*='update-mileage']");
};
