// import the model (tmp database)
const Series = require('../models/Series')
const mongoose = require('mongoose')

exports.uploadSeries = async (req, res, next) => {
  try {
    const Files = req.files
    // search if the series already exists or not
    const series = await Series.findOne({ name: req.body.name })
    if (series) {
      return res.status(400).json({
        status: false,
        message: 'Already exists!'
      })
      // if it doesn't exist create a new one, populate it and save it
    } else {
      const newSeries = new Series({
        id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        thumb: req.body.thumb,
        Files: []
      })
      // save all files into the newSeries.Files array in order to store the files' meta data
      Files.forEach(file => {
        // remove server paths the client shouldn't know
        delete file.path
        delete file.destination
        newSeries.Files.push(file)
      })
      await newSeries.save()
      res.status(200).json({
        status: true,
        message: 'Series was created and saved!'
      })
    }
  } catch (error) {
    return next(error)
  }
}
