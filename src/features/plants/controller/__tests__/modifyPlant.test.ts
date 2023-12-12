import { type NextFunction, type Response } from "express";
import { plantsMock } from "../../mocks/plantsMock";
import { type PlantRequestWithId } from "../../types";
import type PlantsMongooseRepository from "../../repository/PlantsMongooseRepository";
import { modifiedPlantMock } from "../../mocks/modifiedPlantMock";
import PlantsController from "../PlantsController";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an PlantsController's modifyPlant method", () => {
  const req: Pick<PlantRequestWithId, "body" | "params"> = {
    body: plantsMock[2],
    params: { _id: "6576e802d2b53ad62f2217a6" },
  };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives a request with a plant id '6576e802d2b53ad62f2217a6', an 'Oregano' plant and a response", () => {
    const plantRepository: Pick<PlantsMongooseRepository, "modifyPlant"> = {
      modifyPlant: jest.fn().mockResolvedValue(modifiedPlantMock),
    };

    test("Then it should call the response's status method with 200", async () => {
      const expectedStatusCode = 200;

      const plantsController = new PlantsController(
        plantRepository as PlantsMongooseRepository,
      );

      await plantsController.modifyPlant(
        req as PlantRequestWithId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with the 'Oregano' plant modified", async () => {
      const plantsController = new PlantsController(
        plantRepository as PlantsMongooseRepository,
      );

      await plantsController.modifyPlant(
        req as PlantRequestWithId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ plant: modifiedPlantMock });
    });
  });

  describe("When it receives a request with a plant id, a plant and a response and there is an error", () => {
    test("Then it should call its next function with a custom error 'Error. Couldn't modify the plant.'", async () => {
      const expectedStatusCode = 400;
      const expectedErrorMessage = "Error. Couldn't modify the plant.";
      const expectedError: Pick<CustomError, "statusCode" | "message"> = {
        statusCode: expectedStatusCode,
        message: expectedErrorMessage,
      };

      const plantsRepository: Pick<PlantsMongooseRepository, "modifyPlant"> = {
        modifyPlant: jest.fn().mockRejectedValue(null),
      };

      const plantsController = new PlantsController(
        plantsRepository as PlantsMongooseRepository,
      );

      await plantsController.modifyPlant(
        req as PlantRequestWithId,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
