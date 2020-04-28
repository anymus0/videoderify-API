const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs-extra')
const uuid = require('uuid')
const cors = require('cors')
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
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

// fs methods
const selectDirbyName = (name) => {
  const __dirname = path.join(path.resolve(), 'media', name)
  return __dirname
}

const newSeriesDir = async dirName => {
  try {
    await fs.ensureDir(dirName)
  } catch (err) {
    console.error(err)
  }
}

// Routes

app.post('/upload/add', (req, res) => {
  // get the json from the client
  const newSeries = req.body

  // define directory paths for the new series
  const NewDirPath = selectDirbyName(newSeries.name)
  const DirPathToStore = path.join('media', newSeries.name)

  // create new obj to store
  const obj = {
    name: newSeries.name,
    description: newSeries.description,
    id: uuid.v4(),
    thumb: newSeries.thumb,
    mediaDirectory: DirPathToStore
  }

  // create new dir and save obj if dir does not exist
  fs.pathExists(NewDirPath).then(exists => {
    if (exists) {
      obj.mediaDirectory = false
    } else {
      newSeriesDir(NewDirPath)
      Serieses.push(obj)
    }
    // send back the obj, if dir could not be crated then let the client handle the error
    res.json(obj)
  })
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
