import { Request, Response } from "express";
import mongoose from "mongoose";
import { Comment } from "./../models/Comment.js";
import { commentModel } from "./../schemas/Comment.js";
import { userModel } from "./../../user/schemas/User.js";
import { seriesModel } from "./../../series/schemas/Series.js";

export const addComment = async (req: Request, res: Response) => {
  try {
    // process inputs
    if (!req.body.text || !req.body.jwtUserId || !req.params.seriesId) {
      throw "Missing variables!";
    }

    // find the user uploading the comment
    const user = await userModel.findById(req.body.jwtUserId).exec();
    if (user === undefined || user === null)
      throw "User was not defined or not found!";

    // save comment into 'comments' collection
    const comment: Comment = {
      _id: new mongoose.Types.ObjectId(),
      text: req.body.text,
      date: new Date(),
      commentedBy: user._id,
    };

    const newComment = new commentModel(comment);
    await newComment.save();

    // add newComment's refernce into the specific series
    const series = await seriesModel.findById(req.params.seriesId).exec();
    if (series === undefined || series === null)
      throw "Specific series was not found!";
    await seriesModel
      .updateOne(
        { _id: req.params.seriesId },
        { $push: { comments: [newComment._id] } }
      )
      .exec();      

    // get populated newComment for response
    const populatedNewComment: Comment = {
      _id: newComment._id,
      text: newComment.text,
      date: newComment.date,
      commentedBy: user,
    }

    res.status(200).json({
      status: {
        success: true,
        message: "Comment was posted successfully!",
        details: null,
      },
      result: populatedNewComment,
    });
    return true;
  } catch (error) {
    res.status(500).json({
      status: {
        success: false,
        message: "Could not post comment!",
        details: error,
      },
      result: null,
    });
    return false;
  }
};
