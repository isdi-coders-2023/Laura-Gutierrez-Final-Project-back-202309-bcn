import { type Request } from "express";

export interface PlantStructureWithoutId {
  name: string;
  scientificName: string;
  use: string;
  properties: string;
  howToUse: string;
  imageUrl: string;
  isPoisonous: boolean;
  habitat: string;
}

export interface PlantStructure extends PlantStructureWithoutId {
  _id: string;
  name: string;
  scientificName: string;
  use: string;
  properties: string;
  howToUse: string;
  imageUrl: string;
  isPoisonous: boolean;
  habitat: string;
}

export interface CustomRequest extends Request {
  body: PlantStructureWithoutId;
}

export type PlantRequestWithoutId = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  PlantStructureWithoutId
>;
