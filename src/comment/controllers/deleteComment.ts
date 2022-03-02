import { Request, Response } from "express";
import { commentModel } from "./../schemas/Comment.js";

export const deleteComment = async (req: Request, res: Response) => {
  try {
    // input process
    if (!req.params.commentId) throw "Missing variables!";
    const deletedComment = await commentModel.findByIdAndDelete(req.params.commentId).exec();
    if (deletedComment === null || deletedComment === undefined) throw "Deletion was unsuccessfull!"; 
    res.status(200).json({
      status: {
        success: true,
        message: "Deletion was successfull!",
        details: null,
      },
      result: null,
    });
    return true;
  } catch (error) {
    res.status(500).json({
      status: {
        success: false,
        message: "Could not delete comment!",
        details: error,
      },
      result: null,
    });
    return false;
  }
}