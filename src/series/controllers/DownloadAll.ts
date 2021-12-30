import { env } from "process";
import { Request, Response } from "express";
import path from "path";
import archiver from "archiver";
import fs from "fs-extra";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { Series } from "../models/Series.js";

// define mediaDir
const mediaDir = env.MEDIA_DIR || path.join(path.resolve(), "media");
const port = env.PORT || 3000;

export const DownloadAll = async (req: Request, res: Response) => {
  try {
    // Find series in DB
    const seriesUrl = `http://localhost:${port}/series/get/${req.params.id}`;
    const seriesResponse = await fetch(seriesUrl);
    if (!seriesResponse.ok) throw new Error(seriesResponse.statusText);
    const series = (await seriesResponse.json()) as Promise<Series>;
    const mediaFiles = (await series).mediaFiles;

    // create zip file
    const zipFile = path.join(mediaDir, `Episodes-${uuidv4()}.zip`);
    const output = fs.createWriteStream(zipFile);
    const archive = archiver("zip", {
      gzip: true,
      zlib: { level: 0 }, // Sets the compression level.
    });

    // When finished, send back the file, then delete it
    output.on("close", async () => {
      output.end();
      res.status(200).download(zipFile);
      await fs.remove(zipFile);
      return true;
    });

    archive.on("error", (err) => {
      throw err;
    });

    // append every mediaFile of the series
    mediaFiles.forEach((mediaFile) => {
      archive.file(path.join(mediaDir, mediaFile.filename), {
        name: mediaFile.filename,
      });
    });

    // pipe archive data to the file
    archive.pipe(output);

    // finalize the archive
    await archive.finalize();
  } catch (err) {
    res.status(507).json({
      status: {
        success: false,
        message: "Something went wrong on the server!",
        details: err,
      },
      result: null,
    });
    return false;
  }
};
