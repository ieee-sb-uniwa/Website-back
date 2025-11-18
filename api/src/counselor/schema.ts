import { Schema, model } from 'mongoose';

const socialSchema = new Schema({
  id: Number,
  type: { type: String, required: true },
  url: { type: String, required: true }
});

const infoLangSchema = new Schema({
  role: { type: String, required: true },
  name: { type: String, required: true }
});

const infoSchema = new Schema({
  gr: { type: infoLangSchema, required: true },
  en: { type: infoLangSchema, required: true }
});

const counselorSchema = new Schema({
  id: { type: Number, required: true },
  photo: { type: String, required: true },
  socials: { type: [socialSchema], default: [] },
  info: { type: infoSchema, required: true }
});

export const Counselor = model('Counselor', counselorSchema, 'counselor');

