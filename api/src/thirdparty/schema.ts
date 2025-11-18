import mongoose from "mongoose";

const infoLangSchema = new mongoose.Schema({
  location: { type: String, required: true },
  title: { type: String, required: true },
  keywords: { type: [String], default: [] },
  description: { type: String, required: true },
  links: { type: [String], default: [] },
});

const infoSchema = new mongoose.Schema({
  gr: { type: infoLangSchema, required: true },
  en: { type: infoLangSchema, required: true },
});

const ThirdPartySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  date: { type: Date, required: true },
  end_date: { type: Date },
  registration_deadline: { type: Date },
  registration_form: { type: String },
  thumbnail: { type: String, required: true },
  images: { type: [String], default: [] },
  info: { type: infoSchema, required: true },
});

export const ThirdParty = mongoose.model(
  "ThirdParty",
  ThirdPartySchema,
  "thirdparty"
);
