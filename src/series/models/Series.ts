import mongoose from 'mongoose';

export interface mediaFile {
  mimetype: string;
  size: number;
  filename: string;
}

export interface Series {
  _id: mongoose.Types.ObjectId,
  name: string;
  description: string;
  thumb: string;
  mediaFiles: mediaFile[];
}