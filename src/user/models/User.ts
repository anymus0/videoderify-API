import mongoose from 'mongoose';

export interface User {
  _id: mongoose.Types.ObjectId;
  userName: string;
  isAdmin: boolean;
  creationDate: Date;
  passwordHash: string;
}