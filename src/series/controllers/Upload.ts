import { Request, Response } from "express";
import { seriesModel } from "../schemas/Series.js";
import { mediaFile } from "../models/Series.js";
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
    const series = await seriesModel.findOne({ name: name }).exec();
    if (series) {
      res.status(400).json({
        status: {
          success: false,
          message: "Already exists!",
          details: null,
        },
        result: series,
      });
      return false;
    } else {
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
      const newSeries = new seriesModel({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        description: description,
        thumb: thumb,
        mediaFiles: mediaFiles,
      });
      // save newSeries document in the Series collection
      await newSeries.save();
      res.status(200).json({
        status: {
          success: true,
          message: "Series was created and saved!",
          details: null,
        },
        result: newSeries,
      });
      return true;
    }
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
