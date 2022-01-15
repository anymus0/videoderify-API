import { Router } from 'express';
import { mediaFileUpload } from '../../global/storage.js';
import { isAdmin } from './../../user/middlewares/isAdmin.js'

// controller imports //
import { uploadSeries } from '../controllers/Upload.js';
import { DownloadSingle } from '../controllers/DownloadSingle.js';
import { DownloadAll } from '../controllers/DownloadAll.js';
import { FindSeriesbyID } from '../controllers/FindSeries.js';
import { FindAllSeries } from '../controllers/FindAllSerieses.js';
import { Stream } from '../controllers/VideoStream.js';

// create express router
const router = Router();

// Routes //

// Process a new series uploaded from the client
router.post('/upload', mediaFileUpload.array('Files'), isAdmin, (req, res) => {
  uploadSeries(req, res);
})

// Downloads all videos in a series
router.get('/download/all/:id', (req, res) => {
  DownloadAll(req, res)
})

// Downloads a selected episode of a series
router.get('/download/episode/:fileName', (req, res) => {
  DownloadSingle(req, res)
})

// Stream a requested video file
router.get('/video/:fileName', (req, res) => {
  Stream(req, res)
})

// Get a specific object by its id
router.get('/get/:id', (req, res) => {
  FindSeriesbyID(req, res)
})

// Get all the objects in the "Serieses" array
router.get('/all', (req, res) => {
  FindAllSeries(req, res)
})

export default router;