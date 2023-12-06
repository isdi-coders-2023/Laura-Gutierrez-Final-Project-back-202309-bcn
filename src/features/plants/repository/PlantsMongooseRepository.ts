import { type PlantStructure } from "../types";
import Plant from "../model/Plant.js";
import { type PlantsRepository } from "./types";
import CustomError from "../../../server/CustomError/CustomError.js";

class PlantsMongooseRepository implements PlantsRepository {
  public async getPlants(): Promise<PlantStructure[]> {
    const plants = await Plant.find().limit(10);

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
}

export default PlantsMongooseRepository;
