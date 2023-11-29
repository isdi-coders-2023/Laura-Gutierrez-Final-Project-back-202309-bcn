import type { Request, Response, NextFunction } from "express";
import CustomError from "../../CustomError/CustomError.js";
import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator("src:final-project:server:middlewares:errors");

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  debug(chalk.redBright("Endpoint not found"));
  const customError = new CustomError("Endpoint not found", 404);

  next(customError);
};

const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  const privateMessage = error.customMessage ?? error.message;
  debug(chalk.bgRedBright("Error:", privateMessage));

  res.status(statusCode).json({ message: privateMessage });
};

export default generalError;
