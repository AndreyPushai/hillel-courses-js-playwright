import { test, expect } from "../fixtures/fixtures";

function generateDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
};

test.describe("Test API", () => {
    const car = {
        id: "",
        brand: {
            id: 3,
            name: "Ford"
        },
        model: {
            id: 13,
            name: "Fusion"
        },
        date: generateDate(),
        liters: 11,
        totalCost: 22.01,
        mileage: 140111,
        updatedMileage: 140222
    };

    test.beforeEach("POST: Create car", async ({ userRequest }) => {
        const response = await userRequest.post('/api/cars', {
            data: {
                "carBrandId": car.brand.id,
                "carModelId": car.model.id,
                "mileage": car.mileage
            }
        });

        const responseBody = await response.json();
        car.id = responseBody.data.id;

        expect(response.status()).toEqual(201);
        expect(responseBody.data.brand).toEqual(car.brand.name);
        expect(responseBody.data.model).toEqual(car.model.name);
        expect(responseBody.data.mileage).toEqual(car.mileage);
    });

    test.afterEach("DELETE: Delete car", async ({ userRequest }) => {
        const response = await userRequest.delete(`/api/cars/${car.id}`);
        const responseBody = await response.json();
        expect(response.status()).toEqual(200);
        expect(responseBody.data.carId).toEqual(car.id);
    });

    test("Test car created via API", async({ userRequest }) => {
        await test.step("GET: Check car added to cars list", async () => {
            const response = await userRequest.get('/api/cars');
            const responseBody = await response.json();

            const cars = responseBody.data;
            const expectedCar = cars.find(expectedCar => expectedCar.id === car.id);

            expect(response.status()).toEqual(200);
            expect(expectedCar).not.toBeUndefined();
            expect(expectedCar.brand).toEqual(car.brand.name);
            expect(expectedCar.model).toEqual(car.model.name);
            expect(expectedCar.mileage).toEqual(car.mileage);
        });
    });

    test("Test Unacceptable values cannot be put to a car", async({ userRequest }) => {
        await test.step("PUT: Unacceptable value", async () => {
            const response = await userRequest.put(`/api/cars/${car.id}`, {
                data: {
                    "Unacceptable": "Field"
                }
            });
            const responseBody = await response.json();

            expect(response.status()).toEqual(400);
            expect(responseBody.status).toEqual("error");
            expect(responseBody.message).toEqual("Unacceptable fields only or empty body are not allowed");
        });
    });

    test("Test car milage cannot be less than initial", async({ userRequest }) => {
        await test.step("PUT: milage less than initial", async () => {
            const response = await userRequest.put(`/api/cars/${car.id}`, {
                data: {
                    "mileage": car.mileage - 100
                }
            });
            const responseBody = await response.json();

            expect(response.status()).toEqual(400);
            expect(responseBody.status).toEqual("error");
            expect(responseBody.message).toEqual("New mileage is less then previous entry");
        });
    });
});
