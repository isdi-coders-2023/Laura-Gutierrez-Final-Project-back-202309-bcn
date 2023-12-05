import { type PlantStructure } from "../types";
import Plant from "../model/Plant.js";
import { type PlantsRepository } from "./types";
import CustomError from "../../../server/CustomError/CustomError";

class PlantsMongooseRepository implements PlantsRepository {
  public async getPlants(): Promise<PlantStructure[]> {
    const plants = await Plant.find().limit(10);

    return plants;
  }

  public async deletePlant(plantId: string): Promise<void> {
    try {
      await Plant.findByIdAndDelete(plantId);
    } catch (error) {
      throw new Error(
        "There's been an error deleting this plant." + (error as Error).message,
      );
    }
  }

  public async getPlantsById(id: string): Promise<PlantStructure> {
    const plant = await Plant.findById(id);

    if (!plant) {
      throw new CustomError("Sorry, cannot find this plant.", 404);
    }

    return plant;
  }
}

export default PlantsMongooseRepository;
