const path = require('path')
const archiver = require('archiver')
const fs = require('fs-extra')
const fetch = require('node-fetch')
const { v4: uuidv4 } = require('uuid')

// define media directory
const mediaDir = path.join(path.resolve(), 'media')

exports.DownloadAll = async (req, res, next) => {
  try {
    const zipFile = path.join(path.resolve(), 'media', `Episodes-${uuidv4()}.zip`)
    // Find series in DB
    const response = await fetch(`http://localhost:3000/series/get/${req.params.id}`)
    const data = await response.json()
    const Files = data.Files

    const output = fs.createWriteStream(zipFile)
    // Create new archive
    const archive = archiver('zip', {
      gzip: true,
      zlib: { level: 0 } // Sets the compression level.
    })

    // When finished, send back the file, then delete it
    output.on('close', async () => {
      output.end()
      await res.status(200).download(zipFile)
      await fs.remove(zipFile)
    })

    // Error handling
    archive.on('error', function (err) {
      throw err
    })

    // pipe archive data to the file
    archive.pipe(output)

    // append all files of the series
    Files.forEach(async File => {
      archive.file(path.join(mediaDir, File.filename), { name: File.filename })
    })

    // finalize the archive
    archive.finalize()
  } catch (err) {
    res.status(507).json({
      status: false,
      message: err
    })
  }
}
