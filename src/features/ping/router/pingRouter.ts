import { Router } from "express";
import PingController from "../controller/pingController";

export const pingRouter = Router();

const pingController = new PingController();

pingRouter.get("/", pingController.getPong);
