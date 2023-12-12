import { type PlantStructureWithoutId, type PlantStructure } from "../types";

export interface PlantsRepository {
  getPlants: () => Promise<PlantStructure[]>;
  deletePlant: (plantId: string) => Promise<void>;
  getPlantsById: (id: string) => Promise<PlantStructure>;
  addPlant: (plant: PlantStructureWithoutId) => Promise<PlantStructure>;
  modifyPlant: (
    id: string,
    plant: PlantStructure,
  ) => Promise<PlantStructure | undefined>;
}
