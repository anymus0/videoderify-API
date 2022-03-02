import mongoose from 'mongoose';
import { UserInfo } from './../../user/models/User.js'

export interface Comment {
  _id: mongoose.Types.ObjectId,
  text: string;
  date: Date;
  commentedBy: mongoose.Types.ObjectId | UserInfo | null;
}