/**
 * Created by srini on 24/3/17.
 */
'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');

var Album = require('./Album');
var Photo = require('./Photo');

var file_system = require('../myutil/file-system');
var mime_type = require('../myutil/mime-type');

const SEP = path.sep;

const ALBUM_DIRECTORY = os.homedir() + SEP + "Photos";

console.log('Album Directory: ', ALBUM_DIRECTORY);

var AlbumService = {};

AlbumService.saveAlbum = (req, res) => {
    let newAlbum = req.body;

    let albumPath = ALBUM_DIRECTORY + SEP + newAlbum.name;

    fs.stat(albumPath, function(err, stat) {
        if(stat && stat.isDirectory()) {
            return sendFailure(res, 409,
                               {code: "album_already_exists", message: "Album already exists"});
        } else {
            console.log("Album Path: ", albumPath);
            fs.mkdir(albumPath, function(err) {

                if(err) {
                    return sendFailure(res, 500, {
                        code   : "error_creating_album",
                        message: "Error in creating album " + err.message
                    });
                }
                Album.create(newAlbum,
                             function(err, album) {
                                 if(err) {
                                     return res.status(500)
                                               .send(
                                                   "There was a problem creating a album.");
                                 }
                                 res.status(200)
                                    .send(album);
                             });
            });

        }
    });
};

AlbumService.savePhoto = (req, res) => {
    let albumName = req.params.album_name;
    let newPhoto = req.body;
    let fileInfo = req.file;
    newPhoto.album_name = albumName;

//    console.log(newPhoto);
    console.log("File Info: ", fileInfo);

    let albumPath = ALBUM_DIRECTORY + SEP + albumName;
    let destinationFilePath = albumPath + SEP + newPhoto.name;

    let mimeType = mime_type.findMimeType(fileInfo.path);

    if(fileInfo.mimetype === 'image/jpeg' && mimeType && mimeType.mime === 'image/jpeg') {
        destinationFilePath += '.jpeg';
        console.log(destinationFilePath);
    } else {
        fs.unlinkSync(fileInfo.path);
        return res.status(500)
                  .send(
                      "Accepts only jpeg files");
    }

    if(fs.existsSync(albumPath)) {
        if(fs.existsSync(destinationFilePath)) {

            return res.status(500)
                      .send(
                          "Already photo exists with " + newPhoto.name + " name");
        } else {
            try {
                file_system.move_file_sync(fileInfo.path, destinationFilePath);
            } catch(e) {
                console.error("Error copying file:");
                return res.status(500)
                          .send(
                              "Error saving the photo " + newPhoto.name + " name");
            }
            Photo.create(newPhoto, function(err, photo) {
                if(err) {
                    return res.status(500)
                              .send(
                                  "There was a problem storing a photo.");
                }
                res.status(200)
                   .send(photo);
            });
        }
    }
    else {
        return res.status(500)
                  .send(
                      "There was a problem finding " + albumName + " album");
    }
};

AlbumService.getAlbums = (req, res) => {
    Album.find({}, function(err, albums) {
        if(err) {
            return res.status(500)
                      .send("There was a problem finding the albums.");
        }
        res.status(200)
           .send(albums);
    });
};

AlbumService.getAlbumByID = function(req, res) {
    Album.findById(req.params.album_id, function(err, album) {
        if(err) {
            return res.status(500)
                      .send("There was a problem finding the album.");
        }
        if(!album) {
            return res.status(404)
                      .send("No album with that id found.");
        }
        res.status(200)
           .send(album);
    });
};

AlbumService.getPhotosByAlbum = function(req, res) {
    let albumName = req.params.album_name;

    Photo.find({album_name: albumName}, function(err, photos) {
        console.log('Photos: ' + photos);
        console.log();
        return res.status(200)
                  .send(photos);
    });
};

AlbumService.deleteAlbum = function(req, res) {
    Album.findByIdAndRemove(req.params.album_id, function(err, album) {
        if(err) {
            return res.status(500)
                      .send("There was a problem deleting the album.");
        }
        res.status(200)
           .send("Album " + album.name + " was deleted.");
    });
};

AlbumService.updateAlbum = function(req, res) {
    Album.findByIdAndUpdate(req.params.album_id, req.body, {new: true}, function(err, album) {
        if(err) {
            return res.status(500)
                      .send("There was a problem updating the album.");
        }
        res.status(200)
           .send(album);
    });
};

function sendFailure(res, server_code, err) {
    var respMessage = JSON.stringify({
                                         code   : (err.code) ? err.code : err.name,
                                         message: err.message
                                     });

    res.writeHead(server_code, {"Content-Type": "application/json"});
    res.end(respMessage);
}

module.exports = AlbumService;
