import { type NextFunction, type Request, type Response } from "express";
import { type PlantsRepository } from "../repository/types";
import CustomError from "../../../server/CustomError/CustomError.js";
import { type PlantRequestWithId, type PlantRequestWithoutId } from "../types";
class PlantsController {
  constructor(private readonly plantsRepository: PlantsRepository) {}

  public getPlants = async (_req: Request, res: Response): Promise<void> => {
    const plants = await this.plantsRepository.getPlants();

    res.status(200).json({ plants });
  };

  deletePlant = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await this.plantsRepository.deletePlant(id);

      res.status(200).json({});
    } catch {
      const error = new CustomError(
        "There's been an error deleting this plant.",
        400,
      );
      next(error);
    }
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
      const plantError = new CustomError("Sorry, cannot find this plant.", 404);

      next(plantError);
    }
  };

  public addPlant = async (
    req: PlantRequestWithoutId,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const newPlant = req.body;

      const addedPlant = await this.plantsRepository.addPlant(newPlant);

      res
        .status(201)
        .json({ message: "Plant added successfully!", addedPlant });
    } catch (error) {
      next(error);
    }
  };

  modifyPlant = async (
    req: PlantRequestWithId,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const plant = req.body;
      const { plantId } = req.params;

      const modifiedPlant = await this.plantsRepository.modifyPlant(
        plantId,
        plant,
      );

      res.status(200).json({ plant: modifiedPlant });
    } catch (error) {
      const customError = new CustomError(
        "Error. Couldn't modify the plant.",
        400,
      );

      next(customError);
    }
  };
}

export default PlantsController;
