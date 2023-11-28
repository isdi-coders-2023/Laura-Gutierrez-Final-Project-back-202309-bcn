import { type Request, type Response } from "express";
import type PlantsMongooseRepository from "../repository/PlantsMongooseRepository";

class PlantsController {
  constructor(private readonly plantsRepository: PlantsMongooseRepository) {}

  public getPlants = async (_req: Request, res: Response): Promise<void> => {
    const plants = await this.plantsRepository.getPlants();

    res.status(200).json({ plants });
  };
}

export default PlantsController;
