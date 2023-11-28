import { type PlantsRepository, type PlantStructure } from "../types";
import Plant from "../model/Plant";

class PlantsMongooseRepository implements PlantsRepository {
  public async getPlants(): Promise<PlantStructure[]> {
    const plants = await Plant.find();

    return plants;
  }
}

export default PlantsMongooseRepository;
