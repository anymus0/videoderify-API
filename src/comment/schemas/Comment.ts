import mongoose from 'mongoose';
import { Comment } from '../models/Comment';

const commentSchema: mongoose.Schema<Comment> = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  text: { type: String, required: true },
  date: { type: Date, required: true },
  commentedBy: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export const commentModel = mongoose.model('Comment', commentSchema);
