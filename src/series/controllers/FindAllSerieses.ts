import { Request, Response } from "express";
import { seriesModel } from "../schemas/Series.js";
import { Series } from "./../models/Series.js";
import fetch from 'node-fetch';
import { SeriesResponse } from './../models/SeriesResponse.js'

export const FindAllSeries = async (req: Request, res: Response) => {
  try {
    const port = process.env.PORT || 3000;
    // find every series
    const seriesesQuery = await seriesModel.find({}).exec();
    // get populated serieses with the 'findSeries' controller
    const serieses: Series[] = [];
    for (const seriesQuery of seriesesQuery) {
      const seriesUrl = `http://localhost:${port}/series/get/${seriesQuery._id}`;
      const seriesResponse = await fetch(seriesUrl);
      const series = (await seriesResponse.json() as SeriesResponse);
      if (series.result !== null) {
        serieses.push(series.result);
      }
    }

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
