import { Schema, model } from "mongoose";

const sponsorsSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      required: true,
    },
    tier: {
      type: String,
      enum: ["bronze", "silver", "gold", "platinum", "diamond", "elite"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Sponsors = model("Sponsors", sponsorsSchema, "sponsors");

export default Sponsors;
