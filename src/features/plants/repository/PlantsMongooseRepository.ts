import { type PlantStructureWithoutId, type PlantStructure } from "../types";
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

    return plant!;
  }

  public async addPlant(
    plant: PlantStructureWithoutId,
  ): Promise<PlantStructure> {
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

  public async modifyPlant(
    id: string,
    plant: PlantStructure,
  ): Promise<PlantStructure | undefined> {
    try {
      const modifiedPlant = await Plant.findByIdAndUpdate(
        id,
        { ...plant },
        { returnDocument: "after" },
      );

      return modifiedPlant!;
    } catch (error) {
      throw new Error("Error modifying plant" + (error as Error).message);
    }
  }
}

export default PlantsMongooseRepository;
