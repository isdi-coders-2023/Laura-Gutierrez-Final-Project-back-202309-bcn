import chalk from "chalk";
import { startServer } from "./server/app";
import { connectToDatabase } from "./database";
import "./server/index.js";
import debugCreator from "debug";

const debug = debugCreator(":plants:src:index");

const port = process.env.PORT ?? 4000;
if (!process.env.MONGODB_URL) {
  debug(chalk.red("Missing MongoDB connection string"));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);

startServer(+port);
