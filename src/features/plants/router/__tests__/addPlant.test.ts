import request from "supertest";
import app from "../../../../server/app";
import "../../../../server/index";
import { plantMock } from "../../mocks/plantMock";
import { server } from "../../../../setupTests";

describe("Given a POST/plants/add endpoint", () => {
  const path = "/plants/add";

  describe("When it receives a request with a new plant Oregano", () => {
    test("Then it should respond with a status code 201 and the new plant Oregano with id", async () => {
      const expectedStatusCode = 201;
      const expectedMessage = "Plant added successfully!";

      const response = await request(app)
        .post(path)
        .send(plantMock)
        .expect(expectedStatusCode);

      const responseBody = response.body as { message: string };

      expect(responseBody.message).toStrictEqual(expectedMessage);
    });
  });

  describe("When it receives an invalid request", () => {
    test("Then it should respond with the status code 404 and the error message 'Error: Could not add plant. Please try again.'", async () => {
      await server.stop();

      const expectedStatusCode = 400;
      const expectedError = {
        message: "Error: Could not add plant. Please try again.",
      };

      const response = await request(app)
        .post(path)
        .send(plantMock)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
