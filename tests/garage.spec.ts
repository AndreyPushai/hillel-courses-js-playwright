import {
    AddCarPopUp,
    CarItem,
    EditCarPopUp,
    RemoveCarPopUp,
} from "../poms";
import { test, expect } from "../fixtures/fixtures";

let addCarPopUp: AddCarPopUp;
let carItem: CarItem;
let editCarPopUp: EditCarPopUp;
let removeCarPopUp: RemoveCarPopUp;

test.describe("Testing garage flow", () => {
    test("Test user can create, edit and delete auto", async ({ userGaragePage }) => {
        await test.step("Add a car", async () => {
            await userGaragePage.clickAddCarButton();

            addCarPopUp = new AddCarPopUp(userGaragePage.page);
            await addCarPopUp.verifyIsVisible(true);
            await addCarPopUp.verifyPopUpTitle("Add a car");
            await addCarPopUp.selectCar("Porsche", "Cayenne", "340123");
            await addCarPopUp.addButton.click();
            await addCarPopUp.verifyIsVisible(false);
        });

        await test.step("Verify that car was added to the table", async () => {
            carItem = new CarItem(userGaragePage.page);
            await expect(carItem.item).toBeVisible();
            await expect(carItem.carName).toHaveText("Porsche Cayenne");
            await expect(carItem.updateMileageInput).toHaveValue("340123");
        });

        await test.step("Make changes to created car", async () => {
            await carItem.editButton.click();

            editCarPopUp = new EditCarPopUp(userGaragePage.page);
            await editCarPopUp.verifyIsVisible(true);
            await editCarPopUp.verifyPopUpTitle("Edit a car");
            await editCarPopUp.selectCar("Audi", "TT", "340124");
            await editCarPopUp.saveButton.click();
            await editCarPopUp.verifyIsVisible(false);
        });

        await test.step("Verify changes have been applied", async () => {
            await expect(carItem.item).toBeVisible();
            await expect(carItem.carName).toHaveText("Audi TT");
            await expect(carItem.updateMileageInput).toHaveValue("340124");
        });

        await test.step("Remove car", async () => {
            await carItem.editButton.click();

            editCarPopUp = new EditCarPopUp(userGaragePage.page);
            await editCarPopUp.verifyIsVisible(true);
            await editCarPopUp.verifyPopUpTitle("Edit a car");
            await editCarPopUp.clickRemoveCarButton();
            await editCarPopUp.verifyIsVisible(false);
            
            removeCarPopUp = new RemoveCarPopUp(userGaragePage.page);
            await removeCarPopUp.verifyIsVisible(true);
            await removeCarPopUp.verifyPopUpTitle("Remove car");
            await removeCarPopUp.clickRemoveButton();
            await removeCarPopUp.verifyIsVisible(false);
        });

        await test.step("Check car is not present in the list", async () => {
            await expect(carItem.item).not.toBeVisible();
        });
    });
});
