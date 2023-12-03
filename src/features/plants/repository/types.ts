import { type PlantStructure } from "../types";

export interface PlantsRepository {
  getPlants: () => Promise<PlantStructure[]>;
  getPlantsById: (id: string) => Promise<PlantStructure>;
}
