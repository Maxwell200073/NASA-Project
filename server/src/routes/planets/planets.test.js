const request = require("supertest");
const app = require("../../app");

describe("Test GET /planets", () => {
    test("should return status 200", async () => {
        const response = await request(app)
            .get("/planets")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});
