/**
 * Created by srini on 24/3/17.
 */
'use strict';

var mongoose = require('mongoose');
var AlbumSchema = new mongoose.Schema(
    {
        id         : String,
        name       : String,
        album_name : String,
        description: String,
        date       : Date
    });

mongoose.model('Photo', AlbumSchema);

module.exports = mongoose.model('Photo');
