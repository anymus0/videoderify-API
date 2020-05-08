const express = require('express')
const router = express.Router()
const path = require('path')
const cors = require('cors')
const multer = require('multer')
// controllers
const uploadController = require('./../controllers/Upload')
const streamController = require('./../controllers/VideoStream')
const findSeriesController = require('./../controllers/FindSeries')
const findAllSeriesController = require('./../controllers/FindAllSeries')
const downloadSingle = require('./../controllers/DownloadSingle')
const downloadAll = require('./../controllers/DownloadAll')

router.use(cors())

// define media directory
const mediaDir = path.join(path.resolve(), 'media')
// define storage for uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, mediaDir)
  },
  filename: function (req, file, cb) { // space_stripped_str = original_str.replace(/\s/g,'')
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '')}`)
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