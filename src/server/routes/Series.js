const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const fs = require('fs-extra')
const { v4: uuidv4 } = require('uuid')
// controllers
const uploadController = require('./../controllers/Upload')
const streamController = require('./../controllers/VideoStream')
const findSeriesController = require('./../controllers/FindSeries')
const findAllSeriesController = require('./../controllers/FindAllSeries')
const downloadSingle = require('./../controllers/DownloadSingle')
const downloadAll = require('./../controllers/DownloadAll')


// define mediaDir
const mediaDir = process.env.MEDIA_DIR || path.join(path.resolve(), 'media')

// create mediaDir if it doesn't exist yet
const checkDir = async (dir) => {
  try {
    await fs.ensureDir(dir)
    console.log(`Full path to your media directory: ${dir}`)
  } catch (err) {
    console.error(err)
  }
}
checkDir(mediaDir)


// define storage for uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, mediaDir)
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}-${file.originalname.replace(/\s/g, '')}`)
  }
})
const upload = multer({ storage: storage })

// Routes

// Downloads all videos in a series
router.get('/download/all/:id', downloadAll.DownloadAll)

// Downloads a selected episode of a series
router.get('/download/episode/:fileName', downloadSingle.DownloadSingle)

// Process a new series uploaded from the client
router.post('/upload', upload.array('Files'), uploadController.uploadSeries)

// Stream a requested video file
router.get('/video/:fileName', streamController.Stream)

// Get a specific object by its id
router.get('/get/:id', findSeriesController.FindSeriesbyID)

// Get all the objects in the "Serieses" array
router.get('/all', findAllSeriesController.FindAllSeries)

router.get('/', (req, res) => {
  res.send('YO! This is the API for videoderify')
})

// Every route that is unused will redirect to page 404
router.get(':file', (req, res) => {
  res.send('ERROR 404!')
})

router.get('*', (req, res) => {
  res.send('ERROR 404!')
})

router.post(':file', (req, res) => {
  res.send('ERROR 404!')
})

router.post('*', (req, res) => {
  res.send('ERROR 404!')
})

module.exports = router
