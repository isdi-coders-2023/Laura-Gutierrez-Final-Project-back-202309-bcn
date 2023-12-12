import { type NextFunction, type Request, type Response } from "express";
import { plantsMock } from "../../mocks/plantsMock";
import Plant from "../../model/Plant";
import { type PlantsRepository } from "../../repository/types";
import { type PlantStructureWithoutId } from "../../types";
import PlantsController from "../PlantsController";
import CustomError from "../../../../server/CustomError/CustomError";

describe("Given a getPlantsById controller", () => {
  const plants: PlantStructureWithoutId[] = plantsMock;

  const plantsRepository: PlantsRepository = {
    getPlants: jest.fn().mockResolvedValue(plants),
    deletePlant: jest.fn(),
    getPlantsById: jest.fn().mockRejectedValue(new Error("Plant not found")),
    addPlant: jest.fn(),
    modifyPlant: jest.fn(),
  };

  const plantsController = new PlantsController(plantsRepository);

  describe("When it receives a request with an invalid id on its body, a response and a 'Next' function", () => {
    const plantId = "215tgb54ui35iuj325390889";
    const req: Partial<Request> = {
      params: { id: plantId },
    };

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    test("Then it should call the next function with the error message 'Sorry, cannot find this plant.' ", async () => {
      const expectedError = "Sorry, cannot find this plant.";
      const expectedStatusCode = 404;

      Plant.findById = jest
        .fn()
        .mockRejectedValue(new CustomError(expectedError, expectedStatusCode));

      await plantsController.getPlantsById(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining(
          new CustomError(expectedError, expectedStatusCode),
        ),
      );
    });
  });
});
