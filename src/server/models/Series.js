const mongoose = require('mongoose')

const seriesSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true, unique: true },
  description: { type: String, required: false },
  thumb: { type: String, required: true },
  Files: { type: Array, required: true }
})

module.exports = mongoose.model('Series', seriesSchema, 'series')
