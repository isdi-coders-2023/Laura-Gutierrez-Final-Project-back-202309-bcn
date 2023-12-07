import { Joi, validate } from "express-validation";
import { type PlantStructureWithoutId } from "../types";

const plantSchema = {
  body: Joi.object<PlantStructureWithoutId>({
    name: Joi.string().required(),
    scientificName: Joi.string().required(),
    use: Joi.string().required(),
    properties: Joi.string().required(),
    howToUse: Joi.string().required(),
    imageUrl: Joi.string().required(),
    isPoisonous: Joi.boolean().required(),
    habitat: Joi.string().required(),
  }),
};

const plantValidation = validate(plantSchema, {}, { abortEarly: false });

export default plantValidation;
