const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const port = 3000
const mongoose = require('mongoose')
app.use(bodyParser.json())

const series = require('./routes/Series')
app.use('/series', series)

// MongoDB server connection setup
const mongoDB = 'your_mongoDB_URL'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
