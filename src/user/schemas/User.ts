import mongoose from 'mongoose';
import { User } from "../models/User.js";

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, require: true, unique: true },
  isAdmin: { type: Boolean, require: true, },
  creationDate: { type: Date, require: true },
  passwordHash: { type: String, require: true },
})

export const userModel: mongoose.Model<User, {}, {}, {}> = mongoose.model('User', userSchema);
