const Series = require('../models/Series')

exports.FindSeriesbyID = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id).exec()
    res.setHeader('Content-Type', 'application/json')
    res.json(series)
    return series
  } catch {
    res.status(404).json({
      status: false,
      message: 'Something went wrong!'
    })
  }
}
