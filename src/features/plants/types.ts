import { type Types } from "mongoose";

export interface PlantData {
  name: string;
  scientificName: string;
  use: string;
  properties: string;
  howToUse: string;
  imageURL: string;
  isPoisonous: boolean;
  habitat: string;
}

export interface PlantStructure extends PlantData {
  _id: Types.ObjectId;
}
