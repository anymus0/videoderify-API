import mongoose from 'mongoose';
import { Comment } from './../models/Comment.js'

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: { type: String, required: true },
  date: { type: Date, required: true },
  commentedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

export const commentModel: mongoose.Model<Comment, {}, {}, {}> = mongoose.model('Comment', commentSchema);
