'use strict';


var express = require('express');
var app = express();

var db = require('./db');

var AlbumController = require('./album/AlbumController');

app.use(express.static('public'));

app.use('/albums', AlbumController);

module.exports = app;

