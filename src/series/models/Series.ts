import mongoose from 'mongoose';
import { User } from './../../user/models/User.js'

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
  uploadedBy: mongoose.Types.ObjectId | User;
}