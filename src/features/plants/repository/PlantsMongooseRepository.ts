import { type PlantData, type PlantStructure } from "../types";
import Plant from "../model/Plant.js";
import { type PlantsRepository } from "./types";
import CustomError from "../../../server/CustomError/CustomError.js";

class PlantsMongooseRepository implements PlantsRepository {
  public async getPlants(): Promise<PlantStructure[]> {
    const plants = await Plant.find().limit(10).sort({ _id: -1 });

    return plants;
  }

  public async deletePlant(id: string): Promise<void> {
    await Plant.findByIdAndDelete(id);
  }

  public async getPlantsById(id: string): Promise<PlantStructure> {
    const plant = await Plant.findById(id);

    if (!plant) {
      throw new CustomError("Sorry, cannot find this plant.", 404);
    }

    return plant;
  }

  public async addPlant(plant: PlantData): Promise<PlantStructure> {
    try {
      const newPlant = await Plant.create(plant);

      return newPlant;
    } catch (error) {
      throw new CustomError(
        "Error: Could not add plant. Please try again.",
        400,
      );
    }
  }
}

export default PlantsMongooseRepository;
