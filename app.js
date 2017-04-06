'use strict';

var morgan = require('morgan');
var express = require('express');
var app = express();

var db = require('./db');

var AlbumController = require('./album/AlbumController');

app.use(morgan('dev'));

app.use(express.static('static'));

app.use('/albums', AlbumController);

module.exports = app;

