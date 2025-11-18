import { Schema, model } from "mongoose";

const scientificGroupsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      description: "The name of the scientific group",
    },
    name_short: {
      type: String,
      description: "The short name of the scientific group",
    },
    wallpaper: {
      type: String,
      description: "The wallpaper image URL of the scientific group",
    },
    logo: {
      type: String,
      description: "The logo image URL of the scientific group",
    },
    info: {
      gr: {
        description: {
          type: String,
          description: "The description of the scientific group in Greek",
        },
      },
      en: {
        description: {
          type: String,
          description: "The description of the scientific group in English",
        },
      },
    },
  },
  { timestamps: true }
);

const ScientificGroups = model(
  "ScientificGroups",
  scientificGroupsSchema,
  "scientific_groups"
);

export default ScientificGroups;
