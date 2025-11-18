import { Schema, model } from 'mongoose';

const socialSchema = new Schema({
  id: { type: Number, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
}, { _id: false });

const localizedInfoSchema = new Schema({
  role: { type: String, required: true },
  name: { type: String, required: true },
}, { _id: false });

const infoSchema = new Schema({
  gr: { type: localizedInfoSchema, required: true },
  en: { type: localizedInfoSchema, required: true },
}, { _id: false });

const councilSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  photo: { type: String, required: true },
  socials: { 
    type: [socialSchema], 
    default: [] 
  },
  info: { type: infoSchema, required: true },
}, { timestamps: true });

export const Council = model('Council', councilSchema, 'council')


