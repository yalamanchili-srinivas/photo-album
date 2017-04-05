/**
 * Created by srini on 23/3/17.
 */
'use strict';

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer');

//router.use(bodyParser.urlencoded({extended: true}));

router.use(bodyParser.json());

var upload = multer({dest: "uploads/"});

var AlbumService = require('./AlbumService');

//  CREATES A NEW ALBUM
router.post('/', function(req, res) {
    AlbumService.saveAlbum(req, res);
});

//  CREATES A NEW PHOTO in a specific album
router.post('/:album_name/photos', upload.single('file_to_upload'), function(req, res) {
    console.log("Saving image ");

    AlbumService.savePhoto(req, res);
});

// RETURNS ALL THE ALBUMS IN THE DATABASE
router.get('/', function(req, res) {
    AlbumService.getAlbums(req, res);
});


//// GETS A SINGLE ALBUM FROM THE DATABASE
//router.get('/:album_id', function(req, res) {
//    AlbumService.getAlbumByID(req, res);
//});

// GETS A SINGLE ALBUM with album name FROM THE DATABASE
router.get('/:album_name', function(req, res) {
    AlbumService.getAlbumByName(req, res);
});

// GETS ALL PHOTOS from a specific ALBUM FROM THE DATABASE
router.get('/:album_name/photos', function(req, res) {
    AlbumService.getPhotosByAlbum(req, res);
});

// GETS A PHOTO from a specific ALBUM FROM THE DATABASE
router.get('/:album_name/photos/:photo_name', function(req, res) {
    AlbumService.getPhotoFromAlbumByName(req, res);
});

// DELETES A ALBUM FROM THE DATABASE
router.delete('/:album_id', function(req, res) {
    AlbumService.deleteAlbum(req, res);
});


// UPDATES A SINGLE ALBUM IN THE DATABASE
router.put('/:album_id', function(req, res) {
    AlbumService.updateAlbum(req, res);
});

module.exports = router;