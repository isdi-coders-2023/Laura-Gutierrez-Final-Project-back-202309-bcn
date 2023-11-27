import "dotenv/config";
import chalk from "chalk";
import express from "express";
import "./server/index.js";
import debugCreator from "debug";

const debug = debugCreator(":plants:src:index");

const app = express();

app.disable("x-powered-by");

export const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.green(`Listening on http://localhost:${port}`));
  });
};

export default app;
