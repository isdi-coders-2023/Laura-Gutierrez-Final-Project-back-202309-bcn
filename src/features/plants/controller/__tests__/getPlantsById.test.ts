import { type NextFunction, type Request, type Response } from "express";
import { plantsMock } from "../../mocks/plantsMock";
import { type PlantsRepository } from "../../repository/types";
import PlantsController from "../PlantsController";
import { type PlantData } from "../../types";
import Plant from "../../model/Plant";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getPlantsById controller", () => {
  const plants: PlantData[] = plantsMock;

  const plantsRepository: PlantsRepository = {
    getPlants: jest.fn().mockResolvedValue(plants),
    deletePlant: jest.fn(),
    getPlantsById: jest.fn().mockResolvedValue(plants[0]),
  };

  const plantsController = new PlantsController(plantsRepository);

  describe("When it receives a request with a valid id on its body, a response and a 'Next' function", () => {
    const plantId = "6566158cd11a3f8f1075c7a1";

    const req: Partial<Request> = {
      params: { id: plantId },
    };

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    test("Then it should call the response's method status with 200 and Oregano plant.", async () => {
      const expectedPlant = plantsMock[0];
      const expectedStatusCode = 200;

      Plant.findById = jest
        .fn()
        .mockReturnValue(jest.fn().mockResolvedValue(expectedPlant));

      await plantsController.getPlantsById(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedPlant);
    });
  });
});
