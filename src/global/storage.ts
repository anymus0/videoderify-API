import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';


export const mediaDir = process.env.MEDIA_DIR || path.join(path.resolve(), 'media')

export const checkMediaDir = async () => {
  try {
    await fs.ensureDir(mediaDir)
    console.log(`Full path to your media directory: ${mediaDir}`);
  } catch (err) {
    console.error(err);
  }
}

// define storage for uploading
const mediaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, mediaDir)
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}-${file.originalname.replace(/\s/g, '')}`)
  }
})
export const mediaFileUpload = multer({ storage: mediaStorage });
