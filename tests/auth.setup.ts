import { test as setup } from "@playwright/test";

setup("Authorize", async ({ request, baseURL }) => {
    await request.post(`${baseURL}/api/auth/signin`, {
        data: {
            "email": process.env.userEmail,
            "password": process.env.userPassword,
            "remember": false
        }
    });

    await request.storageState({ path: "utils/user.json" });
});
