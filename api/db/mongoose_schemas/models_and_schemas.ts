import { Schema, model, InferRawDocType } from "mongoose";

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
} as const);

export type ThirdPartyDocument = InferRawDocType<typeof thirdPartySchema>;
export const ThirdPartyEn = model<ThirdPartyDocument>(
  "ThirdParty",
  thirdPartySchema,
  "third_party_en"
);
export const ThirdPartyGr = model<ThirdPartyDocument>(
  "ThirdParty",
  thirdPartySchema,
  "third_part_gr"
);

// Council schema
const councilSchema = new Schema({
  id: { type: Number, required: true },
  role: { type: String, required: true },
  name: { type: String, required: true },
  photo: { type: String, required: true },
  links: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      url: { type: String, required: true },
    },
  ]
} as const);

export type CouncilDocument = InferRawDocType<typeof councilSchema>;
export const CouncilEn = model<CouncilDocument>(
  "Council",
  councilSchema,
  "council_en"
);
export const CouncilGr = model<CouncilDocument>(
  "Council",
  councilSchema,
  "council_gr"
);

// Counselor schema
const counselorSchema = new Schema({
  id: { type: Number, required: true },
  role: { type: String, required: true },
  name: { type: String, required: true },
  photo: { type: String, required: true },
  links: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      url: { type: String, required: true },
    },
  ]
} as const);

export type CounselorDocument = InferRawDocType<typeof counselorSchema>;
export const CounselorEn = model<CounselorDocument>(
  "Counselor",
  counselorSchema,
  "counselor_en"
);
export const CounselorGr = model<CounselorDocument>(
  "Counselor",
  counselorSchema,
  "counselor_gr"
);

// Department schema
const departmentSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  logo: { type: String, required: true },
  leader: { type: String, required: true },
  description: { type: String, required: true },
} as const);

export type DepartmentDocument = InferRawDocType<typeof departmentSchema>;
export const DepartmentEn = model<DepartmentDocument>(
  "Department",
  departmentSchema,
  "dep_en"
);
export const DepartmentGr = model<DepartmentDocument>(
  "Department",
  departmentSchema,
  "dep_gr"
);

// Event schema
const eventSchema = new Schema({
  id: { type: Number, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  keywords: { type: [String], required: true },
  description: { type: [String], required: true },
  registration_form: { type: String, required: true },
  registration_deadline: { type: String, required: true },
  images: { type: [String], required: true },
  links: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
} as const);

export type EventDocument = InferRawDocType<typeof eventSchema>;
export const EventEn = model<EventDocument>("Event", eventSchema, "events_en");
export const EventGr = model<EventDocument>("Event", eventSchema, "events_gr");

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
} as const);

export type NewsDocument = InferRawDocType<typeof newsSchema>;
export const NewsEn = model<NewsDocument>("News", newsSchema, "news_en");
export const NewsGr = model<NewsDocument>("News", newsSchema, "news_gr");

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
} as const);

export type SGDocument = InferRawDocType<typeof sgSchema>;
export const SG_En = model<SGDocument>("SG", sgSchema, "sg_en");
export const SG_Gr = model<SGDocument>("SG", sgSchema, "sg_gr");
