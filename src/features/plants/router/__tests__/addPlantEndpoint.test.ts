import request from "supertest";
import app from "../../../../server/app";
import "../../../../server/index";
import { type PlantStructure } from "../../types";
import { plantsMock } from "../../mocks/plantsMock";
import { server } from "../../../../setupTests";

describe("Given a POST/plants/add endpoint", () => {
  const path = "/plants/add";

  describe("When it receives a request with a new plant Oregano without id", () => {
    test("Then it should respond with a status code 201 and the new plant Oregano with id", async () => {
      const expectedStatusCode = 201;
      const expectedName = "Oregano";

      const response = await request(app)
        .post(path)
        .send(plantsMock[0])
        .expect(expectedStatusCode);

      const responseBody = response.body as { plant: PlantStructure };

      expect(responseBody.plant).toHaveProperty("name", expectedName);
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
        .send(plantsMock[0])
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
