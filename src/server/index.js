const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs-extra')
const uuid = require('uuid')
const cors = require('cors')
const port = 3000
const path = require('path')
var multer = require('multer')
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// CORS
app.use(cors())

const mediaDir = path.join(path.resolve(), 'media')

// Data modell MOCK
// TODO: MongoDB
const Serieses = [
  { name: 'KonoSuba', id: '22GfdbdanUWDd2D', thumb: 'https://blacknerdproblems.com/wp-content/uploads/2016/04/Konosuba.jpg', VideoFiles: [] },
  { name: 'Steins;Gate', id: 'llA2D32kd@', thumb: 'https://i.redd.it/dvm703m3baf01.jpg', VideoFiles: [] }
]

// STORAGE UPLOAD
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, mediaDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

// Routes

// Process a new series uploaded from the client
app.post('/upload/add', upload.array('Files'), (req, res) => {
  // get the json from the client
  const newSeries = req.body
  const Files = req.files

  // create new obj to store
  const obj = {
    name: newSeries.name,
    description: newSeries.description,
    id: uuid.v4(),
    thumb: newSeries.thumb,
    Files: []
  }
  // save every files into the obj.Files array in order to store the files' data
  Files.forEach(file => {
    // remove server paths the client shouldn't know
    delete file.path
    delete file.destination
    obj.Files.push(file)
  })

  Serieses.push(obj)
  res.json(obj)
})

// Stream a requested video file
app.get('/video/:fileName', (req, res) => {
  const Path = path.join(mediaDir, req.params.fileName)
  const stat = fs.statSync(Path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1

    if (start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize)
      return
    }

    const chunksize = (end - start) + 1
    const file = fs.createReadStream(Path, { start, end })
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    }
    res.writeHead(200, head)
    fs.createReadStream(Path).pipe(res)
  }
})

// Get a specific object by its id
app.get('/serieses/:id', (req, res) => {
  const id = req.params.id
  const obj = Serieses.find(obj => obj.id === id)
  res.setHeader('Content-Type', 'application/json')
  res.json(obj)
})

// Get all the objects in the "Serieses" array
app.get('/serieses', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.json(Serieses)
})

app.get('/', (req, res) => {
  res.send('YO! This is the API for videoderify')
})

// Every route that is unused will redirect to page 404
app.get(':file', (req, res) => {
  res.send('ERROR 404!')
})

app.get('*', (req, res) => {
  res.send('ERROR 404!')
})

app.post(':file', (req, res) => {
  res.send('ERROR 404!')
})

app.post('*', (req, res) => {
  res.send('ERROR 404!')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
