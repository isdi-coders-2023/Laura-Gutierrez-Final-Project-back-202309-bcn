import type { Request, Response, NextFunction } from "express";
import CustomError from "../../CustomError/CustomError";
import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator("root:src:server:middlewares:error");

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const customError = new CustomError(
    "Endpoint not found",
    404,
    "root:errorMiddlewWare:notFound",
  );

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
