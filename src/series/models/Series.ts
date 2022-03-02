import mongoose from "mongoose";
import { UserInfo } from "./../../user/models/User.js";
import { Comment } from './../../comment/models/Comment.js'

export interface mediaFile {
  mimetype: string;
  size: number;
  filename: string;
}

export interface Series {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  thumb: string;
  mediaFiles: mediaFile[];
  uploadedBy: mongoose.Types.ObjectId | UserInfo | null;
  comments: mongoose.Types.ObjectId[] | Comment[];
}
