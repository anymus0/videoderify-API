import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";

export const Stream = async (req: Request, res: Response) => {
  try {
    // define mediaDir
    const mediaDir =
      process.env.MEDIA_DIR || path.join(path.resolve(), "media");
    const Path = path.join(mediaDir, req.params.fileName);
    const stat = await fs.stat(Path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res
          .status(416)
          .send(
            "Requested range not satisfiable\n" + start + " >= " + fileSize
          );
        return;
      }

      const chunksize = end - start + 1;
      const file = fs.createReadStream(Path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(Path).pipe(res);
    }
  } catch (err) {
    res.status(404).json({
      status: {
        status: false,
        message: "Something went wrong!",
        details: err,
      },
      result: null,
    });
  }
};
