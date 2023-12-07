import { type PlantStructureWithoutId } from "../types";

export const plantMock: PlantStructureWithoutId = {
  name: "Oregano",
  scientificName: "Origanum vulgare",
  use: "Culinary/Medicinal",
  properties:
    "Relieves headaches and throat aches. It's a natural constipation remedy. Relieves cough and asthma symptoms.",
  howToUse:
    "Use it in many savoury dishes as seasoning, also in sauces. You can consume oregano oil in capsules. ",
  imageUrl: "https://www.image.com/fake-one",
  isPoisonous: false,
  habitat: "Grasslands, bushes, rocky areas.",
};
