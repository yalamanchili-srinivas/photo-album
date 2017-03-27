/**
 * Created by srini on 23/3/17.
 */
'use strict';


var mongoose = require('mongoose');
var AlbumSchema = new mongoose.Schema(
    {
        name       : String,
        title      : String,
        description: String,
        date       : Date
    });

mongoose.model('Album', AlbumSchema);
module.exports = mongoose.model('Album');
