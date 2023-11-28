import "dotenv/config.js";
import chalk from "chalk";
import mongoose from "mongoose";
import debugCreator from "debug";

const debug = debugCreator("root:database:connectToDatabase");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    debug(chalk.green("Connected to database."));
  } catch (error) {
    debug(chalk.red("Impossible to connect to database."));
  }
};
