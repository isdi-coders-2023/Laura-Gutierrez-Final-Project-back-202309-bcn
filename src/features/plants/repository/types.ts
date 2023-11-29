import { type PlantStructure } from "../types";

export interface PlantsRepository {
  getPlants: () => Promise<PlantStructure[]>;
}
