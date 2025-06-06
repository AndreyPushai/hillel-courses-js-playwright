import BasePopUp from "./BasePopUp";
import type { TCarModels } from "./AddCarPopUp";

export default class EditCarPopUp extends BasePopUp {
    public popUp = this.page.locator("app-edit-car-modal");
    public brandSelect = this.popUp.locator("select[id='addCarBrand']");
    public modelSelect = this.popUp.locator("select[id='addCarModel']");
    public mileageInput = this.popUp.locator("input[id='addCarMileage']");
    public saveButton = this.popUp.locator("button", {hasText: "Save"});
    public removeCarButton = this.popUp.locator("button", {hasText: "Remove car"});

    async selectBrand<Brand extends keyof TCarModels>(
        brand: Brand
    ): Promise<void> {
        await this.brandSelect.selectOption(brand);
    };

    async selectModel(model: string): Promise<void> {
        await this.modelSelect.selectOption(model);
    };

    async selectCar<Brand extends keyof TCarModels>(
        brand: Brand,
        model: TCarModels[Brand],
        mileage: string | number
    ): Promise<void> {
        await this.selectBrand(brand);
        await this.selectModel(model);
        await this.mileageInput.fill(mileage.toString());
    };

    async clickRemoveCarButton() {
        await this.removeCarButton.click();
    };
};
