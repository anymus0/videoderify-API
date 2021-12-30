import mongoose from 'mongoose';
import { Series } from "../models/Series";

const seriesSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true, unique: true },
  description: { type: String, required: false },
  thumb: { type: String, required: true },
  mediaFiles: { type: Array, required: true }
})

export const seriesModel: mongoose.Model<Series, {}, {}, {}> = mongoose.model('Series', seriesSchema);
