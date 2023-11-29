import request from "supertest";
import "../../../index.js";
import app from "../../../server/app";
import { plantsMock } from "../mocks/plantsMock";
import { type PlantStructure } from "../types";

describe("Given a GET /plants endpoint", () => {
  describe("When it recives a request", () => {
    test("Then it should respond with all the plants in the collection.", async () => {
      const expectedStatusCode = 200;
      const requestedPath = "/plants";

      const response = await request(app)
        .get(requestedPath)
        .expect(expectedStatusCode);

      const responseBody = response.body as { plants: PlantStructure[] };

      responseBody.plants.forEach((plant, plantPosition) => {
        expect(plant).toHaveProperty("name", plantsMock[plantPosition].name);
      });
    });
  });
});
