'use strict';

//const express     = require('express'),
//      logger      = require('morgan'),
//      bodyParser  = require('body-parser'),
//      uuid        = require('uuid'),
//      fs          = require('fs'),
//      async       = require('async'),
//      path        = require('path'),
//      MongoClient = require("mongodb").MongoClient;
//
//const albums = require('./lib/albums');
//
//const SEP = path.sep;
//
//const DB_URL = 'mongodb://localhost:27017/photo_app';
//const ROOT_DIRECTORY = __dirname + "/Photos";
//const ALBUM_DETAILS = ROOT_DIRECTORY + SEP + "album_details.js";
//const PHOTO_DETAILS = ROOT_DIRECTORY + SEP + "photo_details.js";
//
//var albumsData = [{
//    "id"         : "a50fd54e-4648-4ff2-8f2c-f653ae66081a",
//    "name"       : "album1",
//    "title"      : "A trip to Kyoto and Tokyo",
//    "description": "What a funcountry!",
//    "date"       : "2010-04-15"
//}, {
//    "id"         : "88c6f621-052f-4b49-99b7-447d05603567",
//    "name"       : "album2",
//    "title"      : "A trip to Kyoto and Tokyo",
//    "description": "What a funcountry!",
//    "date"       : "2010-04-15"
//}, {
//    "name"       : "album4",
//    "title"      : "A trip to Kyoto and Tokyo",
//    "description": "What a funcountry!",
//    "date"       : "2010-04-15",
//    "id"         : "fd5e69e7-a3f9-4a18-87fd-5b09cb92ae3d"
//}];
//
//var photosData = [
//    {
//        id         : "photo1",
//        name       : "photo1",
//        album_name : "album1",
//        description: "asdufio",
//        date       : "2010/10/22 22:15:40"
//    },
//    {
//        id         : "photo2",
//        name       : "photo2",
//        album_name : "album1",
//        description: "asdufio",
//        date       : "2010/10/22 22:15:40"
//    },
//    {
//        id         : "photo3",
//        name       : "photo3",
//        album_name : "album2",
//        description: "asdufio",
//        date       : "2010/10/22 22:15:40"
//    },
//    {
//        id         : "photo4",
//        name       : "photo4",
//        album_name : "album1",
//        description: "asdufio",
//        date       : "2010/10/22 22:15:40"
//    },
//    {
//        id         : "photo5",
//        name       : "photo5",
//        album_name : "album1",
//        description: "asdufio",
//        date       : "2010/10/22 22:15:40"
//    },
//    {
//        id         : "photo6",
//        name       : "photo6",
//        album_name : "album1",
//        description: "asdufio",
//        date       : "2010/10/22 22:15:40"
//    }];
//
//var app = express();
//
//app.use(logger('dev'));
//app.use(bodyParser.json());
//
//app.get("/", function(req, res) {
//    sendResponse(res, {message: "Welcome to Photo Album App"});
//
//});
//
//app.get("/albums", function(req, res) {
//
////    var buffer = new Buffer(1024);
////    fs.stat(ALBUM_DETAILS, function(err, stat) {
////        if(err) {
////            sendFailure(res, 500, {
////                code   : "albums_details_does_not_exist",
////                message: "Albums does not exists"
////            });
////            return;
////        }
////        fs.open(ALBUM_DETAILS, 'r+', function(err, fd) {
////            if(err) {
////                sendFailure(res, 500, {
////                    code   : "error_opening_albums",
////                    message: "Error in opening albums"
////                });
////                return;
////            }
////            fs.read(fd, buffer, 0, buffer.length, 0, function(err, bytes) {
////                if(err) {
////                    sendFailure(res, 500, {
////                        code   : "error_opening_albums",
////                        message: "Error in opening albums"
////                    });
////                    return;
////                }
////
////                if(bytes > 0) {
////                    let fileDetails = buffer.slice(0, bytes)
////                                            .toString('utf8');
////                    albumsData = JSON.parse(fileDetails);
////                    sendResponse(res, albumsData);
////                }
////            })
////        });
////    });
////
//
//});
//
//app.get("/albums/:albumID", function(req, res) {
//
//    let albumID = req.params.albumID;
//    console.log("Album ID: ", albumID);
//
//    let anAlbum;
//    albumsData.forEach(
//        function(album) {
//            if(album && album.id == albumID) {
//                anAlbum = album;
//            }
//        }
//    );
//    sendResponse(res, anAlbum);
//});
//
//app.post("/albums", function(req, res) {
//    let newAlbum = req.body;
//    newAlbum.id = uuid.v4();
//    albumsData.push(newAlbum);
//
//    let albumPath = ROOT_DIRECTORY + SEP + newAlbum.name;
//
//    let db;
//
//    let albums_collection;
//
//    async.waterfall([function(cb) {
//                        MongoClient.connect(DB_URL,
//                                            {
//                                                poolSize: 3,
//                                                w       : 1
//                                            },
//                                            (err, dbase) => {
//                                                if(err) {
//                                                    console.log('bad database connection: ' + err);
//                                                    cb(err);
//                                                }
//                                                db = dbase;
//                                                console.info("Connected to database: " + db.databaseName);
//                                                cb(null);
//                                            });
//                    },
//                     function(cb) {
//                         db.collection("albums", cb);
//                     },
//                     function(albums_obj, cb) {
//                         console.log("Created or opened a collection");
////                         console.log(albums_obj);
//                         albums_collection = albums_obj;
//                         cb(null);
//                     },
//                     function(cb) {
//                         albums_collection.insertOne(newAlbum, cb);
//                     },
//                     function(inserted_albums, cb) {
//                         console.log("Inserted Albums");
////                         console.log(inserted_albums);
//                         cb(null);
//                     }
//                    ],
//                    function(err, results) {
//                        console.log("Done");
//                        console.log(err);
//                        console.log(results);
//                        db.close();
//                    });
//
//    fs.stat(albumPath, function(err, stat) {
//        if(stat && stat.isDirectory()) {
//            sendFailure(res, 409, {code: "album_already_exists", message: "Album already exists"});
//        } else {
//            console.log("Album Path: ", albumPath);
//            fs.mkdir(albumPath, function(err) {
//
//                if(err) {
//                    sendFailure(res, 500, {
//                        code   : "error_opening_albums",
//                        message: "Error in opening albums"
//                    });
//                    return;
//                }
//
////                fs.writeFile(ALBUM_DETAILS, JSON.stringify(albumsData), function(err) {
////                    if(err) {
////                        sendFailure(res, 500, {
////                            code   : "error_opening_albums",
////                            message: "Error in opening albums"
////                        });
////                        return;
////                    }
////                });
//
//                sendResponse(res, {url: "/albums/" + newAlbum.id});
//            });
//        }
//    });
//
//});
//
//app.get("/photos", function(req, res) {
//    sendResponse(res, photosData);
//});
//
//app.post("/photos", function(req, res) {
//
//    let newPhoto = req.body;
//    photosData.push(newPhoto);
//
//    let photoPath = ROOT_DIRECTORY + SEP + newPhoto.album_name + SEP + newPhoto.name;
//
//    console.log("Photo path: " + photoPath);
//
//    console.log("Photo Details: ", PHOTO_DETAILS);
//
//    fs.stat(PHOTO_DETAILS, function(err, stat) {
//        if(stat && stat.isFile()) {
//
//            var tempFile = fs.createWriteStream(PHOTO_DETAILS, {flags: 'w'});
//
//            tempFile.on('open', function(fd) {
//                tempFile.write(JSON.stringify(photosData));
//            })
//                    .on('end', function() {
//                        tempFile.end();
//                    });
//
//
////                fs.writeFile(PHOTO_DETAILS, JSON.stringify(photosData), function(err) {
////                    if(err) {
////                        sendFailure(res, 500, {
////                            code   : "error_saving_photo",
////                            message: "Error in saving photo"
////                        });
////                        return;
////                    }
////                });
//
////                res.redirect("/albums/" + newAlbum.id);
//        }
//    });
//
//    sendResponse(res, {code: "success", message: "Successfully added a photo to Album"});
//});
//
//app.get("*", function(req, res) {
//    sendFailure(res, 404, {code: "no_such_page", message: "No such page"});
//});
//
//app.listen(9000);
//
//function sendResponse(res, jsonObject) {
//    res.writeHead(200, {"Content-Type": "application/json"});
//    res.end(JSON.stringify(jsonObject));
//}
//
//function sendFailure(res, server_code, err) {
//    var respMessage = JSON.stringify({
//                                         code   : (err.code) ? err.code : err.name,
//                                         message: err.message
//                                     });
//
//    res.writeHead(server_code, {"Content-Type": "application/json"});
//    res.end(respMessage);
//}
