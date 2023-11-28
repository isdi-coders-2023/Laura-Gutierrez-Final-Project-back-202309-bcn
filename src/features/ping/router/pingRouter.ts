import { Router } from "express";
import PingController from "../controller/pingController.js";

export const pingRouter = Router();

const pingController = new PingController();

pingRouter.get("/", pingController.getPong);
