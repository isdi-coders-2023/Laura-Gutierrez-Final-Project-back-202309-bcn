import { type PlantStructure } from "../types";

export const plantsMock: PlantStructure[] = [
  {
    _id: "6566158cd11a3f8f1075c7a1",
    name: "Oregano",
    scientificName: "Origanum vulgare",
    use: "Culinary/Medicinal",
    properties:
      "Relieves headaches and throat aches. It's a natural constipation remedy. Relieves cough and asthma symptoms.",
    howToUse:
      "Use it in many savoury dishes as seasoning, also in sauces. You can consume oregano oil in capsules. ",
    imageUrl: "https://www.image.com/fake-one",
    isPoisonous: "false",
    habitat: "Grasslands, bushes, rocky areas.",
  },
  {
    _id: "6566158cd11a3f8f1075c7a2",
    name: "Salvia",
    scientificName: "Salvia Officinalis",
    use: "Medicinal",
    properties: "Antimigratory and  antiangiogenic effects",
    howToUse:
      "used for the treatment of different kinds of disorders including seizure, ulcers, gout, rheumatism, inflammation, dizziness, tremor, paralysis, diarrhea, and hyperglycemia.",
    imageUrl: "https://www.image.com/fake-two",
    isPoisonous: "false",
    habitat: "Mediterranean warm arid areas.",
  },
  {
    _id: "6576e802d2b53ad62f2217a6",
    name: "Foxglove",
    scientificName: "Digitalis purpurea",
    use: "Medicinal/Poison",
    properties:
      "Contains cardiac glycosides used in heart medications but can be toxic if misused.",
    howToUse:
      "Used in controlled doses in modern medicine; do not use without medical supervision.",
    imageUrl:
      "https://i.ibb.co/7gQbr6J/1-digitalis-purpurea-purple-foxglove-english-school.webp",
    isPoisonous: "true",
    habitat: "Tundras.",
  },
];
