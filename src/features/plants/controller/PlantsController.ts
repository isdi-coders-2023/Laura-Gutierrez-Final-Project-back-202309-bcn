import { type NextFunction, type Request, type Response } from "express";
import { type PlantsRepository } from "../repository/types";
import CustomError from "../../../server/CustomError/CustomError";
class PlantsController {
  constructor(private readonly plantsRepository: PlantsRepository) {}

  public getPlants = async (_req: Request, res: Response): Promise<void> => {
    const plants = await this.plantsRepository.getPlants();

    res.status(200).json({ plants });
  };

  public getPlantsById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    try {
      const plant = await this.plantsRepository.getPlantsById(id);

      res.status(200).json(plant);
    } catch {
      const plantError = new CustomError("Sorrt, cannot find this plant.", 404);

      next(plantError);
    }
  };
}

export default PlantsController;
