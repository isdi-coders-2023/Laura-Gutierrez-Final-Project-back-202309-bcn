import CustomError from "../../../CustomError/CustomError.js";
import generalError from "../errorMiddleware.js";
import type { NextFunction, Request, Response } from "express";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware", () => {
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next = jest.fn();

  describe("When it receives a response with a 404 status code", () => {
    test("Then it should call the response status method with a 404 status code", () => {
      const errorMessage = "Endpoint not found";
      const expectedStatusCode = 404;
      const customError = new CustomError(errorMessage, expectedStatusCode);

      generalError(
        customError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
  describe("When it receives a response with an error message 'Error'", () => {
    test("Then it should call the response method json with a 'General error' message", () => {
      const expectedStatusCode = 400;
      const errorMessage = "General error";
      const error = new CustomError(errorMessage, expectedStatusCode);

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      const errorResponseBody = {
        message: errorMessage,
      };

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining(errorResponseBody),
      );
    });
  });
});
