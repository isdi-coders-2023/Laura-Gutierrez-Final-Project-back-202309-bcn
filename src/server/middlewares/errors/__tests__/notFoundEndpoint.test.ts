import request from "supertest";
import app from "../../../app.js";
import "../../../index.js";

describe("Given a GET /fake endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with an error 404 and an error message 'Endpoint not found'", async () => {
      const expectedStatusCode = 404;
      const expectedMessage = "Endpoint not found";
      const requestedPath = "/fake";

      const response = await request(app)
        .get(requestedPath)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
