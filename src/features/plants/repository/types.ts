import { type PlantStructure } from "../types";

export interface PlantsRepository {
  getPlants: () => Promise<PlantStructure[]>;
  deletePlant: (plantId: string) => Promise<void>;
  getPlantsById: (id: string) => Promise<PlantStructure>;
}
