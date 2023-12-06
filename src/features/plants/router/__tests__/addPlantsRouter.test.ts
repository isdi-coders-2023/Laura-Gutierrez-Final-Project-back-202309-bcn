import app from "../../../../server/app";
import "../../../../server/index";
import "../../../../setupTests";
import request from "supertest";
import { type Request, type Response, type NextFunction } from "express";
import { addPlantMock } from "../../mocks/addPlantMock";
import type PlantsMongooseRepository from "../../repository/PlantsMongooseRepository";
import type CustomError from "../../../../server/CustomError/CustomError";
import PlantsController from "../../controller/PlantsController";
import { type PlantRequestWithoutId } from "../../types";
import { plantsMock } from "../../mocks/plantsMock";

describe("Given a POST method '/plants/add' endpoint", () => {
  describe("When it receives a valid plant object in the body's request", () => {
    const req: Pick<PlantRequestWithoutId, "body"> = {
      body: plantsMock[0],
    };

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const next: NextFunction = jest.fn();

    test("Then it should call the response's method status code with 201 and the 'Plant added successfully!' message", async () => {
      const path = "/plants/add";
      const expectedStatus = 201;
      const expectedMessage = "Plant added successfully!";

      const response = await request(app)
        .post(path)
        .send(addPlantMock)
        .expect(expectedStatus);

      expect(response.body.message).toStrictEqual(expectedMessage);
    });

    test("Then it should call its response method status code 201 and the new plant object created", async () => {
      const path = "/plants/add";
      const expectedStatus = 201;
      const expectedNewPlantProperty = "addedPlant";

      const response = await request(app)
        .post(path)
        .send(addPlantMock)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(expectedNewPlantProperty);
    });
  });
});
