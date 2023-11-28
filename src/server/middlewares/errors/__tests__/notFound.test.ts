import type { Request, Response, NextFunction } from "express";
import CustomError from "../../../customError/CustomError";
import { notFoundError } from "../errorMiddleware";

describe("Given a notFoundError function", () => {
  describe("When it receives a NextFunction", () => {
    test("Then it should call the next function with a customError", () => {
      const req = {};
      const res = {};
      const next: NextFunction = jest.fn();

      const customError = new CustomError(
        "Endpoint not found",
        404,
        "errorMiddlewWare:notFound",
        "testPrivateMessage",
      );

      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
