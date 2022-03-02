import { ResponseStatus } from './../../global/models/ResponseStatus.js';
import { Series } from './../models/Series.js'

export interface SeriesResponse {
  status: ResponseStatus;
  result: Series | null;
}