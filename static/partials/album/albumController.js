'use strict';

angular.module('photoAlbumApp.album', [])
       .controller('albumCtrl',
                   ['albumHttpService', 'BASE_URL', '$scope', '$routeParams',
                    '$log', '$location', '$route',
                    function(albumHttpService, BASE_URL, $scope, $routeParams,
                             $log, $location, $route) {

                        $scope.new_photo_error = "";

                        $scope.album = {};

                        let albumName = $routeParams.album_name;

                        $scope.photos = [];

                        albumHttpService.getAlbumByName(albumName)
                                        .then(function(response) {
                                            $scope.album = response;
                                        })
                                        .catch(function(error) {
                                            $log.info("Error in getting photos: " + error);
                                        });

                        albumHttpService.getPhotosByAlbumName(albumName)
                                        .then(function(response) {

                                            let photos = response;

                                            for(let photo of photos) {
                                                photo.imageSRC = 'albums/' + photo.album_name +
                                                                 '/photos/' + photo.name
                                            }
                                            $scope.photos = photos;

                                        })
                                        .catch(function(error) {
                                            $log.error("Error in getting photos: " + error);
                                        });

                        $scope.uploadImage = function(newPhoto) {

                            let file = $scope.myFile;

                            albumHttpService.uploadPhoto(albumName, newPhoto, file)
                                            .then(function(response) {

                                                let photo = response;

                                                photo.imageSRC = 'albums/' + photo.album_name +
                                                                 '/photos/' + photo.name;

                                                $scope.photos.push(photo);
                                                $scope.myFile = "";
                                                $scope.uploadImage = "";
                                                $scope.new_photo_error = "";

//                                                $location.path('/album/' + albumName);
                                                $route.reload();
                                            })
                                            .catch(function(error) {
                                                $log.error(JSON.stringify(error));
                                                $scope.new_photo_error = error.data;
                                            });
                        };

                    }]);