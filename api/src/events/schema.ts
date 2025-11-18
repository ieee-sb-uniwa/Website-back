import { Schema, model } from 'mongoose';

const infoLangSchema = new Schema({
  location: { type: String, required: true },
  title: { type: String, required: true },
  keywords: { type: [String], default: [] },
  description: { type: String, required: true },
  links: { type: [String], default: [] }
});

const infoSchema = new Schema({
  gr: { type: infoLangSchema, required: true },
  en: { type: infoLangSchema, required: true }
});

const eventSchema = new Schema({
  id: { type: Number, required: true },
  date: { type: Date, required: true },
  end_date: { type: Date },
  registration_deadline: { type: Date },
  registration_form: { type: String },
  thumbnail: { type: String, required: true },
  images: { type: [String], default: [] },
  info: { type: infoSchema, required: true }
});

const Events = model('Events', eventSchema, 'events');

export default Events;
