"use strict";
exports.__esModule = true;
exports.seriesModel = void 0;
var mongoose_1 = require("mongoose");
var seriesSchema = new mongoose_1["default"].Schema({
    id: mongoose_1["default"].Schema.Types.ObjectId,
    name: { type: String, require: true, unique: true },
    description: { type: String, required: false },
    thumb: { type: String, required: true },
    mediaFiles: { type: Array, required: true }
});
exports.seriesModel = mongoose_1["default"].model('Series', seriesSchema);
