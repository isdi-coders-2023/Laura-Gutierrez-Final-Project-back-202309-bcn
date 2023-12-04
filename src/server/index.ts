import "dotenv/config";
import express from "express";
import app from "./app.js";
import cors from "cors";
import morgan from "morgan";
import { pingRouter } from "../features/ping/router/pingRouter.js";
import generalError, {
  notFoundError,
} from "./middlewares/errors/errorMiddleware.js";
import plantsRouter from "../features/plants/router/plantsRouter.js";

const corsOrigin = [
  process.env.ALLOWED_ORIGIN!,
  process.env.ALLOWED_ORIGIN_PROD!,
];
const corsOptions: cors.CorsOptions = { origin: corsOrigin };

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/plants", plantsRouter);
app.use("/", pingRouter);
app.use(notFoundError);
app.use(generalError);
