import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { commentModel } from './../schemas/Comment.js'

export const isSameUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.commentId || !req.body.jwtUserId) throw "Missing variables!";
    const comment = await commentModel.findById(req.params.commentId).exec();
    if (!comment || !comment.commentedBy) throw "Comment was not found!";
    if (req.body.jwtUserId !== comment.commentedBy.toString()) throw "User IDs don't match!";
    next();
    return true;
  } catch (error) {
    res
      .status(401)
      .json({
        status: {
          success: false,
          message: "Unauthorized! Can't do operation on someone else's data!",
          details: error,
        },
        result: null,
      })
      .end();
    return false;
  }
};
