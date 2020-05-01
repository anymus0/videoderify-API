const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const port = 3000
const mongoose = require('mongoose')
app.use(bodyParser.json())

// MongoDB stuff
const mongoDB = 'mongodb+srv://anymus:%5E!2x%24oc9L%24PVB2FSrdTj@cluster0-dgu2j.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const series = require('./routes/Series')
app.use('/series', series)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
