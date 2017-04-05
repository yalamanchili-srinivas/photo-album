'use strict';


var express = require('express');
var app = express();

var db = require('./db');

var AlbumController = require('./album/AlbumController');

var validator = function(req, res, next) {
    console.log("Req Url-> " + req.originalUrl);
    return next();
};

app.use(validator);

app.use(express.static('static'));

app.use('/albums', AlbumController);

module.exports = app;

