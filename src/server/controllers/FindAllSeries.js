const Series = require('../models/Series')

exports.FindAllSeries = async (req, res) => {
  try {
    const objArr = await Series.find({}).exec()
    res.setHeader('Content-Type', 'application/json')
    res.json(objArr)
    return objArr
  } catch (error) {
    return error
  }
}
