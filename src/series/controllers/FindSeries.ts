import { Request, Response } from "express";
import { seriesModel } from "../schemas/Series.js";
import { Series } from "./../models/Series.js";
import { userModel } from "./../../user/schemas/User.js";
import { UserInfo } from "./../../user/models/User.js";
import { getUserInfo } from "./../../global/getUserInfo.js";
import { commentModel } from "../../comment/schemas/Comment.js";
import { Comment } from "./../../comment/models/Comment.js";

export const findSeries = async (req: Request, res: Response) => {
  try {
    const series = await seriesModel.findById(req.params.id).exec();
    if (!series) throw new Error("Series was not found!");

    // populate comments
    const populatedComments: Comment[] = [];
    for (const commentId of series.comments) {
      // find current comment in DB
      const comment = await commentModel.findById(commentId).exec();
      if (comment === undefined || comment === null)
        throw "Comment was not found in DB!";
      // find current comment's user in DB
      const commentedBy = await userModel.findById(comment.commentedBy).exec();
      // if user is not found the 'commentedBy' field should be null
      if (commentedBy === undefined || commentedBy === null) {
        populatedComments.push({
          _id: comment._id,
          text: comment.text,
          date: comment.date,
          commentedBy: null,
        });
      } else {
        populatedComments.push({
          _id: comment._id,
          text: comment.text,
          date: comment.date,
          commentedBy: getUserInfo(commentedBy),
        });
      }
    }

    // populate uploadedBy field
    // if user is not found the 'uploadedBy' field should be null
    let userInfo: UserInfo | null = null;
    const uploadedBy = await userModel.findById(series.uploadedBy).exec();
    if (uploadedBy !== undefined && uploadedBy !== null) {
      userInfo = getUserInfo(uploadedBy);
    }
    const populatedSeries: Series = {
      _id: series._id,
      name: series.name,
      description: series.description,
      thumb: series.thumb,
      mediaFiles: series.mediaFiles,
      uploadedBy: userInfo,
      comments: populatedComments,
    };
    res.status(200).json({
      status: {
        success: true,
        message: "OK",
        details: null,
      },
      result: populatedSeries,
    });
  } catch (err) {
    res.status(404).json({
      status: {
        success: false,
        message: "Something went wrong!",
        details: err,
      },
      result: null,
    });
    return false;
  }
};
