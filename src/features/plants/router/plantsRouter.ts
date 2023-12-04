import { Router } from "express";
import PlantsController from "../controller/PlantsController.js";
import PlantsMongooseRepository from "../repository/PlantsMongooseRepository.js";
import { type PlantsRepository } from "../repository/types.js";

const plantsRouter = Router();

const plantsRepository: PlantsRepository = new PlantsMongooseRepository();
const plantsController = new PlantsController(plantsRepository);

plantsRouter.get("/", plantsController.getPlants);
plantsRouter.get("/:id", plantsController.getPlantsById);
export default plantsRouter;
