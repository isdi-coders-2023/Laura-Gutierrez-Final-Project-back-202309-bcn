import type { Request, Response, NextFunction } from "express";
import PlantsController from "../PlantsController";
import { type PlantsRepository } from "../../repository/types";
import type PlantsMongooseRepository from "../../repository/PlantsMongooseRepository";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a PlantsController deletePlant method", () => {
  const plantsRepository: Pick<PlantsRepository, "deletePlant"> = {
    deletePlant: jest.fn().mockReturnValue({}),
  };

  const req: Pick<Request, "params"> = {
    params: { _id: "6566158cd11a3f8f1075c7a1" },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnValue({}),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a response", () => {
    test("Then it shoul call its method status with 200", async () => {
      const expectedStatusCode = 200;

      const plantsController = new PlantsController(
        plantsRepository as PlantsRepository,
      );

      await plantsController.deletePlant(
        req as Request<{ plantId: string }>,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it method json with an empty object", async () => {
      const expectedEmptyObject = {};

      const plantsController = new PlantsController(
        plantsRepository as PlantsRepository,
      );

      await plantsController.deletePlant(
        req as Request<{ plantId: string }>,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(expectedEmptyObject);
    });
  });

  describe("When it receives a request with an incorrect plant id", () => {
    test("Then it should call its next function with a CustomError that says 'There's been an error deleting this plant.'", async () => {
      const plantsRepository: PlantsMongooseRepository = {
        deletePlant: jest.fn().mockRejectedValue(null),
        getPlants: jest.fn(),
        addPlant: jest.fn(),
        getPlantsById: jest.fn(),
      };

      const plantsController = new PlantsController(plantsRepository);

      await plantsController.deletePlant(req as Request, res as Response, next);

      const expectedError: Partial<CustomError> = {
        message: "There's been an error deleting this plant.",
        statusCode: 400,
      };

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
