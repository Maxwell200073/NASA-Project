const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
    test("should get 200 response", async () => {
        const response = await request(app)
            .get("/v1/launches")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});

describe("Test POST /launch", () => {
    const completeLaunchData = {
        launchDate: "January 1, 2030",
        target: "Kepler-69",
        rocket: "Explorer IS1",
        mission: "Goin Downtown",
    };
    const launchDataWithoutDate = {
        target: "Kepler-69",
        rocket: "Explorer IS1",
        mission: "Goin Downtown",
    };

    test("should get a 201 response", async () => {
        const response = await request(app)
            .post("/v1/launches")
            .send(completeLaunchData)
            .expect("Content-Type", /json/)
            .expect(201);

        const sentLaunchDate = new Date(
            completeLaunchData.launchDate
        ).valueOf();
        const receivedLaunchDate = new Date(response.body.launchDate).valueOf();

        expect(sentLaunchDate).toBe(receivedLaunchDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("should fail if improper date", async () => {
        // completeLaunchData is assigned an improper date for test
        completeLaunchData.launchDate = "December 44, 2029";
        const response = await request(app)
            .post("/v1/launches")
            .send(completeLaunchData)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: "Invalid launch date",
        });
    });

    test("should fail if missing fields", async () => {
        const response = await request(app)
            .post("/v1/launches")
            .send(launchDataWithoutDate)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: "Missing required mission field",
        });
    });
});
