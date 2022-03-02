import mongoose from 'mongoose';
import { UserInfo } from './../../user/models/User.js'

export interface Comment {
  body: string;
  commentedBy: mongoose.Types.ObjectId | UserInfo;
}