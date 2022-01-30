import { Request, Response } from "express";
import { seriesModel } from "../schemas/Series.js";
import { Series } from "./../models/Series.js";
import { userModel } from "./../../user/schemas/User.js";
import { UserInfo } from "./../../user/models/User.js";

export const FindSeriesbyID = async (req: Request, res: Response) => {
  try {
    const series = await seriesModel.findById(req.params.id).exec();
    if (!series) throw new Error("Series was not found!");

    // populate uploadedBy field
    const uploadedBy = await userModel.findById(series.uploadedBy).exec();
    if (uploadedBy === undefined || uploadedBy === null)
      throw "DB error, uploader was not found!";
    const userInfo: UserInfo = {
      _id: uploadedBy._id,
      userName: uploadedBy.userName,
      isAdmin: uploadedBy.isAdmin,
      creationDate: uploadedBy.creationDate,
    };
    const populatedSeries: Series = {
      _id: series._id,
      name: series.name,
      description: series.description,
      thumb: series.thumb,
      mediaFiles: series.mediaFiles,
      uploadedBy: userInfo,
    }; 

    res.status(200).json({
      status: {
        success: true,
        message: "OK",
        details: null,
      },
      result: populatedSeries,
    });
    return true;
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
