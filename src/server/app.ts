import "dotenv/config";
import chalk from "chalk";
import express from "express";
import "./index.js";
import debugCreator from "debug";

const debug = debugCreator(":root:src:index");

const app = express();

app.disable("x-powered-by");

export const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.green(`Listening on http://localhost:${port}`));
  });
};

export default app;
