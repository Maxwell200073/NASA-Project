const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
    test("it should get 200 response", async () => {
        const response = await request(app)
            .get("/launches")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});

describe("Test POST /launch", () => {
    test("it should get 201 response", () => {});

    test("should fail if improper date", () => {});

    test("should fail if missing fields", () => {});
});
