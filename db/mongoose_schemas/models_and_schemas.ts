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

export const ThirdPartyEn = model("ThirdParty", thirdPartySchema, "third_party_en");
export const ThirdPartyGr = model("ThirdParty", thirdPartySchema, "third_part_gr");

// Council schema
const councilSchema = new Schema({
  id: { type: Number, required: true },
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: true },
});

export const CouncilEn = model("Council", councilSchema, "council_en");
export const CouncilGr = model("Council", councilSchema, "council_gr");

// Counselor schema
const counselorSchema = new Schema({
  id: { type: Number, required: true },
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: true },
});

export const CounselorEn = model("Counselor", counselorSchema, "counselor_en");
export const CounselorGr = model("Counselor", counselorSchema, "counselor_gr");


// Department schema
const departmentSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  logo: { type: String, default: "" },
  leader: { type: String, required: true },
  description: { type: String, required: true },
});

export const DepartmentEn = model("Department", departmentSchema, "dep_en");
export const DepartmentGr = model("Department", departmentSchema, "dep_gr");

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

export const EventEn = model("Event", eventSchema, "events_en");
export const EventGr = model("Event", eventSchema, "events_gr");

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

export const NewsEn = model("News", newsSchema, "news_en");
export const NewsGr = model("News", newsSchema, "news_gr");

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

export const SG_En = model("SG", sgSchema, "sg_en");
export const SG_Gr = model("SG", sgSchema, "sg_gr");
