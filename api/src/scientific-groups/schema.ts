import { Schema, model } from "mongoose";

const scientificGroupsSchema = new Schema(
  {
    name: { type: String, required: true },
    name_short: { type: String },
    wallpaper: { type: String },
    logo: { type: String },
    info: {
      gr: {
        description: { type: String },
      },
      en: {
        description: { type: String },
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
