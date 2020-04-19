const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
var cors = require('cors')
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// CORS
app.use(cors())

// Static folder
const clientDir = path.join(__dirname, './../../assets')
// const mediaAdress = path.join(`http://localhost:${port}/`, clientDir)
app.use(express.static(clientDir))

// Data modell MOCK
// TODO: MongoDB
const Serieses = [
  { name: 'KonoSuba', id: 2, thumb: 'https://blacknerdproblems.com/wp-content/uploads/2016/04/Konosuba.jpg' },
  { name: 'Steins;Gate', id: 3, thumb: 'https://i.redd.it/dvm703m3baf01.jpg' }
]

// Routes

// Get a specific object by its id
app.get('/serieses/:id', (req, res) => {
  const id = parseInt(req.params.id)
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
