import { Schema, model } from "mongoose";

// Third party schema
export const thirdPartySchema = new Schema({
  id: { type: Number, required: true },
  date: { type: String, required: true },
  keywords: { type: [String], default: [] },
  title: { type: String, required: true },
  images: { type: [String], default: [] },
  description: { type: String, required: true },
  links: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
});

export const ThirdParty = model("ThirdParty", thirdPartySchema);

// Council schema
const councilSchema = new Schema({
  id: { type: Number, required: true },
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: true },
});

export const Council = model("Council", councilSchema);

// Counselor schema
const counselorSchema = new Schema({
  id: { type: Number, required: true },
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: true },
});

export const Counselor = model("Counselor", counselorSchema);

// Department schema
const departmentSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  logo: { type: String, default: "" },
  leader: { type: String, required: true },
  description: { type: String, required: true },
});

export const Department = model("Department", departmentSchema);

// Event schema
const eventSchema = new Schema({
  id: { type: Number, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  title: { type: String, required: true },
  images: { type: [String], default: [] },
  keywords: { type: [String], default: [] },
  description: { type: String, required: true },
  links: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
});

export const Event = model("Event", eventSchema);

// News schema
const newsSchema = new Schema({
  id: { type: Number, required: true },
  date: { type: String, required: true },
  title: { type: String, required: true },
  keywords: { type: [String], default: [] },
  images: { type: [String], default: [] },
  description: { type: String, required: true },
  links: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
});

export const News = model("News", newsSchema);

// SG schema
const sgSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  logo: { type: String, default: "" },
  leader: { type: String, required: true },
  description: { type: String, required: true },
  projects: [
    {
      title: { type: String, required: true },
      image: { type: String, default: "" },
      description: { type: String, required: true },
      keys: { type: [String], default: [] },
    },
  ],
});

export const SG = model("SG", sgSchema);
