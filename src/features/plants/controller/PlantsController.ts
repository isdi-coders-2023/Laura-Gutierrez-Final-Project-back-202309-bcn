import { type Request, type Response } from "express";
import { type PlantsRepository } from "../repository/types";

class PlantsController {
  constructor(private readonly plantsRepository: PlantsRepository) {}

  public getPlants = async (_req: Request, res: Response): Promise<void> => {
    const plants = await this.plantsRepository.getPlants();

    res.status(200).json({ plants });
  };
}

export default PlantsController;
