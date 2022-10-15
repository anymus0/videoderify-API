import mongoose from "mongoose";
import { Series } from "../models/Series";
import { mediaFile } from "../models/Series";

const mediaFileSchema: mongoose.Schema<mediaFile> = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  filename: { type: String, required: true },
});

const seriesSchema: mongoose.Schema<Series> = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, require: true, unique: true },
  description: { type: String, required: false },
  thumb: { type: String, required: true },
  mediaFiles: { type: [mediaFileSchema], required: true },
  uploadedBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  comments: { type: [mongoose.Types.ObjectId], ref: "Comment" },
});

export const seriesModel: mongoose.Model<Series> = mongoose.model(
  "Series",
  seriesSchema
);
