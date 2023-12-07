import { type NextFunction, type Request, type Response } from "express";
import { plantsMock } from "../../mocks/plantsMock";
import { type PlantsRepository } from "../../repository/types";
import PlantsController from "../PlantsController";
import { type PlantStructureWithoutId } from "../../types";
import Plant from "../../model/Plant";
import CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getPlantsById controller", () => {
  const plants: PlantStructureWithoutId[] = plantsMock;

  const plantsRepository: PlantsRepository = {
    getPlants: jest.fn().mockResolvedValue(plants),
    deletePlant: jest.fn(),
    getPlantsById: jest.fn().mockResolvedValue(plants[0]),
    addPlant: jest.fn(),
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

    describe("When it receives a request with ann invalid id on its body, a response and a next function", () => {
      const plantsRepository: PlantsRepository = {
        getPlants: jest.fn(),
        getPlantsById: jest
          .fn()
          .mockRejectedValue(
            new CustomError("Sorry, cannot find this plant", 404),
          ),
        deletePlant: jest.fn(),
        addPlant: jest.fn(),
      };

      const plantsController = new PlantsController(plantsRepository);

      const wrongId = "4637vz";

      const req: Partial<Request> = {
        params: { id: wrongId },
      };

      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      test("Then it should call the next function with the error message 'Sorry, cannot find this plant' ", async () => {
        const expectedError = new CustomError(
          "Sorry, cannot find this plant.",
          404,
        );

        Plant.findById = jest
          .fn()
          .mockReturnValue(jest.fn().mockRejectedValue(expectedError));

        await plantsController.getPlantsById(
          req as Request<{ id: string }>,
          res as Response,
          next as NextFunction,
        );

        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});
