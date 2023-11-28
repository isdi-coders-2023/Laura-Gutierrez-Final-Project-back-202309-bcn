import type { Request, Response, NextFunction } from "express";
import CustomError from "../../customError/CustomError";
import chalk from "chalk";
import debugCreator from "debug";

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
  if (error.privateMessage) {
    const debug = debugCreator(`${error.nameSpace ?? "root:errorMiddleWare"}`);
    debug(chalk.red(`error: ${error.privateMessage}`));
  }

  const statusCode = error.statusCode ?? 500;
  res.status(statusCode).json({ message: error.message });
};

export default generalError;
