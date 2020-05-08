const path = require('path')
// define media directory
const mediaDir = path.join(path.resolve(), 'media')

exports.DownloadSingle = async (req, res, next) => {
  try {
    // The path to the file to download
    const VideoPath = path.join(mediaDir, req.params.fileName)
    res.download(VideoPath)
  } catch {
    res.status(507).json({
      status: false,
      message: 'Something went wrong!'
    })
  }
}
