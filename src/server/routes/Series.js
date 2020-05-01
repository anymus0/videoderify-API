const uploadController = require('./../controllers/Upload')
const express = require('express')
const router = express.Router()
const path = require('path')
const cors = require('cors')
const multer = require('multer')

router.use(cors())

// define media directory
const mediaDir = path.join(path.resolve(), 'media')

// define storage for uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, mediaDir)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}`)
  }
})
const upload = multer({ storage: storage })

// Routes

// Process a new series uploaded from the client
router.post('/upload/add', upload.array('Files'), uploadController.uploadSeries)

module.exports = router

// // Stream a requested video file
// router.get('/video/:fileName', (req, res) => {
//   const Path = path.join(mediaDir, req.params.fileName)
//   const stat = fs.statSync(Path)
//   const fileSize = stat.size
//   const range = req.headers.range

//   if (range) {
//     const parts = range.replace(/bytes=/, '').split('-')
//     const start = parseInt(parts[0], 10)
//     const end = parts[1]
//       ? parseInt(parts[1], 10)
//       : fileSize - 1

//     if (start >= fileSize) {
//       res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize)
//       return
//     }

//     const chunksize = (end - start) + 1
//     const file = fs.createReadStream(Path, { start, end })
//     const head = {
//       'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': chunksize,
//       'Content-Type': 'video/mp4'
//     }

//     res.writeHead(206, head)
//     file.pipe(res)
//   } else {
//     const head = {
//       'Content-Length': fileSize,
//       'Content-Type': 'video/mp4'
//     }
//     res.writeHead(200, head)
//     fs.createReadStream(Path).pipe(res)
//   }
// })

// // Get a specific object by its id
// router.get('/serieses/:id', (req, res) => {
//   const id = req.params.id
//   const obj = Serieses.find(obj => obj.id === id)
//   res.setHeader('Content-Type', 'application/json')
//   res.json(obj)
// })

// // Get all the objects in the "Serieses" array
// router.get('/serieses', (req, res) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.json(Serieses)
// })

// router.get('/', (req, res) => {
//   res.send('YO! This is the API for videoderify')
// })

// // Every route that is unused will redirect to page 404
// router.get(':file', (req, res) => {
//   res.send('ERROR 404!')
// })

// router.get('*', (req, res) => {
//   res.send('ERROR 404!')
// })

// router.post(':file', (req, res) => {
//   res.send('ERROR 404!')
// })

// router.post('*', (req, res) => {
//   res.send('ERROR 404!')
// })
