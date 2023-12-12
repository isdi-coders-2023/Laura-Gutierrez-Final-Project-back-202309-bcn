import { Router } from "express";
import PlantsController from "../controller/PlantsController.js";
import PlantsMongooseRepository from "../repository/PlantsMongooseRepository.js";
import plantValidation from "../schema/plantSchema.js";

const plantsRouter = Router();

const plantsRepository = new PlantsMongooseRepository();
const plantsController = new PlantsController(plantsRepository);

plantsRouter.get("/", plantsController.getPlants);
plantsRouter.get("/:id", plantsController.getPlantsById);
plantsRouter.delete("/:id", plantsController.deletePlant);
plantsRouter.post("/add", plantValidation, plantsController.addPlant);
plantsRouter.patch("/:id", plantsController.modifyPlant);

export default plantsRouter;
