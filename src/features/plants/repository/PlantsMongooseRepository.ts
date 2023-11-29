import { type PlantsRepository, type PlantStructure } from "../types";
import Plant from "../model/Plant.js";

class PlantsMongooseRepository implements PlantsRepository {
  public async getPlants(): Promise<PlantStructure[]> {
    const plants = await Plant.find().limit(10);

    return plants;
  }
}

export default PlantsMongooseRepository;
