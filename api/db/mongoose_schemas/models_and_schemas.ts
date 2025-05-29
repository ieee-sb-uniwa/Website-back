import { Schema, model, InferRawDocType } from "mongoose";

// Council schema
const councilSchema = new Schema({
  id: { type: Number, required: true },
  photo: { type: String, required: true },
  socials: [
    {
      id: { type: Number, required: true },
      type: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  info: {
    gr: {
      role: { type: String, required: true },
      name: { type: String, required: true },
    },
    en: {
      role: { type: String, required: true },
      name: { type: String, required: true },
    },
  },
} as const);

export type CouncilDocument = InferRawDocType<typeof councilSchema>;

export const Council = model<CouncilDocument>(
  "Council",
  councilSchema,
  "council"
);

// Counselor schema
const counselorSchema = new Schema({
  id: { type: Number, required: true },
  photo: { type: String, required: true },
  socials: [
    {
      id: { type: Number, required: true },
      type: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  info: {
    gr: {
      role: { type: String, required: true },
      name: { type: String, required: true },
    },
    en: {
      role: { type: String, required: true },
      name: { type: String, required: true },
    },
  },
} as const);;

export type CounselorDocument = InferRawDocType<typeof counselorSchema>;
export const Counselor = model<CounselorDocument>(
  "Counselor",
  counselorSchema,
  "counselor"
);

// Department schema
// const departmentSchema = new Schema({
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   logo: { type: String, required: true },
//   leader: { type: String, required: true },
//   description: { type: String, required: true },
// } as const);

// export type DepartmentDocument = InferRawDocType<typeof departmentSchema>;
// export const DepartmentEn = model<DepartmentDocument>(
//   "Department",
//   departmentSchema,
//   "dep_en"
// );
// export const DepartmentGr = model<DepartmentDocument>(
//   "Department",
//   departmentSchema,
//   "dep_gr"
// );

// Event schema
const eventSchema = new Schema({
  id: { type: Number, required: true },
  date: { type: String, required: true },
  end_date: { type: String, required: true },
  registration_form: { type: String, required: true },
  registration_deadline: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  info: {
    gr: {
      location: { type: String, required: true },
      title: { type: String, required: true },
      keywords: { type: [String], required: true },
      description: { type: String, required: true },
      links: [
        {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
    },
    en: {
      location: { type: String, required: true },
      title: { type: String, required: true },
      keywords: { type: [String], required: true },
      description: { type: String, required: true },
      links: [
        {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
    },
  },
} as const);

export type EventDocument = InferRawDocType<typeof eventSchema>;
export const Event = model<EventDocument>("Event", eventSchema, "events");

// Third party schema
export const thirdPartySchema = new Schema({
  id: { type: Number, required: true },
  date: { type: String, required: true },
  end_date: { type: String, required: true },
  registration_form: { type: String, required: true },
  registration_deadline: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  info: {
    gr: {
      location: { type: String, required: true },
      title: { type: String, required: true },
      keywords: { type: [String], required: true },
      description: { type: String, required: true },
      links: [
        {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
    },
    en: {
      location: { type: String, required: true },
      title: { type: String, required: true },
      keywords: { type: [String], required: true },
      description: { type: String, required: true },
      links: [
        {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
    },
  },
} as const);

export type ThirdPartyDocument = InferRawDocType<typeof thirdPartySchema>;
export const ThirdParty = model<ThirdPartyDocument>(
  "ThirdParty",
  thirdPartySchema,
  "thirdparty"
);

// News schema
// const newsSchema = new Schema({
//   id: { type: Number, required: true },
//   date: { type: String, required: true },
//   title: { type: String, required: true },
//   keywords: { type: [String], default: [] },
//   images: { type: [String], default: [] },
//   description: { type: String, required: true },
//   links: [
//     {
//       title: { type: String, required: true },
//       url: { type: String, required: true },
//     },
//   ],
// } as const);

// export type NewsDocument = InferRawDocType<typeof newsSchema>;
// export const NewsEn = model<NewsDocument>("News", newsSchema, "news_en");
// export const NewsGr = model<NewsDocument>("News", newsSchema, "news_gr");

// // SG schema
// const sgSchema = new Schema({
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   logo: { type: String, default: "" },
//   leader: { type: String, required: true },
//   description: { type: String, required: true },
//   projects: [
//     {
//       title: { type: String, required: true },
//       image: { type: String, default: "" },
//       description: { type: String, required: true },
//       keys: { type: [String], default: [] },
//     },
//   ],
// } as const);

// export type SGDocument = InferRawDocType<typeof sgSchema>;
// export const SG_En = model<SGDocument>("SG", sgSchema, "sg_en");
// export const SG_Gr = model<SGDocument>("SG", sgSchema, "sg_gr");
