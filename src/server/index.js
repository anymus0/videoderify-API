const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const fs = require('fs-extra')
const uuid = require('uuid')
const cors = require('cors')
const port = 3000
const path = require('path')
var multer = require('multer')
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// CORS
app.use(cors())

// Static folder
const mediaDir = path.join(path.resolve(), 'media')
app.use(express.static(mediaDir))

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
