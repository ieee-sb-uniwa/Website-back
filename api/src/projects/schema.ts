
import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  id: Number,
  title: String,
  url: String,
});

const InfoLangSchema = new mongoose.Schema({
  description: String,
  links: [LinkSchema],
});

const InfoSchema = new mongoose.Schema({
  gr: InfoLangSchema,
  en: InfoLangSchema,
});

const ProjectSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  sg: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  thumbnail: { type: String },
  images: [{ type: String }],
  technologies: [{ type: String }],
  info: InfoSchema,
});

export default mongoose.model('Project', ProjectSchema, 'projects');
