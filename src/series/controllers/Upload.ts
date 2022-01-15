import { Request, Response } from "express";
import { seriesModel } from "../schemas/Series.js";
import { userModel } from './../../user/schemas/User.js'
import { mediaFile, Series } from "../models/Series.js";
import mongoose from "mongoose";

export const uploadSeries = async (req: Request, res: Response) => {
  try {
    // process 'req.body'
    const name: string = req.body.name;
    const description: string = req.body.description;
    const thumb: string = req.body.thumb;
    const Files = req.files;
    if (!Files && !name && !description && !thumb) {
      throw "req.body is missing data";
    }
    if (!Array.isArray(Files)) {
      throw "Files should be an array";
    }
    // find if the series already exists in the DB
    const seriesDuplicate = await seriesModel.findOne({ name: name }).exec();
    if (seriesDuplicate) throw "Already exists!";

    // process files
    const mediaFiles: mediaFile[] = [];
    Files.forEach((file) => {
      const mediaFile: mediaFile = {
        mimetype: file.mimetype,
        size: file.size,
        filename: file.filename,
      };
      mediaFiles.push(mediaFile);
    });

    // find the user uploading the files
    const userId: string = req.body.userId;
    const user = await userModel.findById(userId).exec();
    if (user === undefined || user === null) throw "User was not defined or not found!";

    // create new series instance
    const series: Series = {
      _id: new mongoose.Types.ObjectId(),
      name: name,
      description: description,
      thumb: thumb,
      mediaFiles: mediaFiles,
      uploadedBy: user._id,
    }
    const newSeries = new seriesModel(series);
    // save newSeries document in the Series collection
    await newSeries.save();
    res.status(200).json({
      status: {
        success: true,
        message: "Series was created and saved!",
        details: null,
      },
      result: series,
    });
    return true;
  } catch (err) {
    res.status(507).json({
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
