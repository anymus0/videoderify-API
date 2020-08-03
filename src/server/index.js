const express = require('express')
const app = express()
const compression = require('compression')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
const mongoose = require('mongoose')
const xss = require('xss-clean')
const port = 3000
app.use(xss())
app.use(mongoSanitize())
app.use(compression())
app.use(bodyParser.json())
const series = require('./routes/Series')
app.use('/series', series)

const start = async () => {
  try {
    // MongoDB server connection setup
    const mongoDB = ''
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    const db = mongoose.connection
    // Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))

    app.listen(port)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
