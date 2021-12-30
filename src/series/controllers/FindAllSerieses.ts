import { Request, Response } from "express";
import { seriesModel } from "../schemas/Series.js";

export const FindAllSeries = async (req: Request, res: Response) => {
  try {
    const serieses = await seriesModel.find({}).exec();
    res.status(200).json({
      status: {
        success: true,
        message: "OK",
        details: null,
      },
      result: serieses,
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
