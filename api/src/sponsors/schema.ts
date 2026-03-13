import { Schema, model } from "mongoose";

const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const sponsorsSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      enum: ["bronze", "silver", "gold", "platinum", "diamond", "elite"],
      required: true,
    },
    image: {
      type: imageSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const Sponsors = model("Sponsors", sponsorsSchema, "sponsors");

export default Sponsors;
