import { type Request, type Response } from "express";
import { plantsMock } from "../../mocks/plantsMock";
import { type PlantsRepository } from "../../repository/types";
import PlantsController from "../PlantsController";
import { type PlantStructureWithoutId } from "../../types";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Given a PlantsController's getPlants method", () => {
  const plants: PlantStructureWithoutId[] = plantsMock;

  const plantsRepository: PlantsRepository = {
    getPlants: jest.fn().mockResolvedValue(plants),
    deletePlant: jest.fn(),
    getPlantsById: jest.fn().mockResolvedValue(plants[0]),
    addPlant: jest.fn(),
    modifyPlant: jest.fn(),
  };

  const plantsController = new PlantsController(plantsRepository);

  describe("When it receives a request", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    test("Then it should call its method status with a 200 status code.", async () => {
      const expectedStatusCode = 200;

      await plantsController.getPlants(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the plants Oregano and Salvia", async () => {
      const expectedCollection = plantsMock;

      await plantsController.getPlants(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ plants: expectedCollection });
    });
  });
});
