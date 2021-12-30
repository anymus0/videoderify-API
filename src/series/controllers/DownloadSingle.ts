import { Request, Response } from "express";
import path from "path";

// define mediaDir
const mediaDir = process.env.MEDIA_DIR || path.join(path.resolve(), "media");

export const DownloadSingle = async (req: Request, res: Response) => {
  try {
    // check for empty params
    const fileName = req.params.fileName;
    if (!fileName) throw new Error("fileName param is empty!");
    const mediaFilePath = path.join(mediaDir, fileName);
    res
      .status(200)
      .json({
        status: {
          success: true,
          message: "OK",
          details: null,
        },
        result: mediaFilePath,
      })
      .download(mediaFilePath);
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
  }
};
