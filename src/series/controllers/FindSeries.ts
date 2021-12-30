import { Request, Response } from "express";
import { seriesModel } from "../schemas/Series.js";

export const FindSeriesbyID = async (req: Request, res: Response) => {
  try {
    const series = await seriesModel.findById(req.params.id).exec();
    if (!series) throw new Error("Series was not found!");
    res.status(200).json({
      status: {
        success: true,
        message: "OK",
        details: null,
      },
      result: series,
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
