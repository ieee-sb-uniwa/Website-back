import mongoose, { model } from 'mongoose';

const scientificGroupsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  name_short: { type: String },
  meetings: {
    room: { type: String },
    day: { type: String },
    time: { type: String }
  },
  wallpaper: { type: String },
  wallpaper_caption: { type: String },
  logo: { type: String },
  info: {
    gr: {
      description: { type: String }
    },
    en: {
      description: { type: String }
    }
  }
}, { timestamps: true });

export const ScientificGroups = model('ScientificGroups', scientificGroupsSchema, 'scientific_groups');
