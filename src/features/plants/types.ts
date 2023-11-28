import { type Types } from "mongoose";

export interface PlantData {
  name: string;
  scientificName: string;
  use: string;
  properties: string;
  howToUse: string;
  imageUrl: string;
  isPoisonous: boolean;
  habitat: string;
}

export interface PlantStructure extends PlantData {
  _id: string;
}

export interface PlantsRepository {
  getPlants: () => Promise<PlantStructure[]>;
}
