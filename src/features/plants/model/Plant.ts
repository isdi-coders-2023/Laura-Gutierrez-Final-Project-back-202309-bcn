import { Schema, model } from "mongoose";
import { type PlantStructure } from "../types";

const plantSchema = new Schema<PlantStructure>({
  name: {
    type: String,
    required: true,
  },
  scientificName: {
    type: String,
    required: true,
  },
  use: {
    type: String,
    required: true,
  },
  properties: {
    type: String,
    required: true,
  },
  howToUse: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isPoisonous: {
    type: Boolean,
    required: true,
  },
  habitat: {
    type: String,
    required: true,
  },
});

const Plant = model("Plant", plantSchema, "plants");

export default Plant;
