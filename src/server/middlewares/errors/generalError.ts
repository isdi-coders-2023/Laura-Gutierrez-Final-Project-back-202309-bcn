import chalk from "chalk";
import type CustomError from "../../customError/CustomError";
import { type NextFunction, type Request, type Response } from "express";
import debugCreator from "debug";

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error.privateMessage) {
    const debug = debugCreator(
      `${error.nameSpace ?? "robots:middelwares:errors"}`,
    );
    debug(chalk.red(`error: ${error.privateMessage}`));
  }

  const statusCode = error.statusCode ?? 500;
  res.status(statusCode).json({ message: error.message });
};

export default generalError;
