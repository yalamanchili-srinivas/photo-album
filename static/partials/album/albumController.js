'use strict';

angular.module('photoAlbumApp.album', [])
       .controller('albumCtrl',
                   ['albumHttpService', 'photoHttpService', 'BASE_URL', '$scope', '$routeParams',
                    '$log', '$location', '$route',
                    function(albumHttpService, photoHttpService, BASE_URL, $scope, $routeParams,
                             $log, $location, $route) {

                        $scope.new_photo_error = "";

                        $scope.album = {};
                        $scope.album.name = $routeParams.album_name;

                        $scope.images = {};

                        $scope.photos = [];


                        $scope.uploadImage = function(newPhoto) {

                            var file = $scope.myFile;
                            let albumName = $scope.album.name;

                            albumHttpService.uploadFileToUrl($scope.album.name, newPhoto, file)
                                            .then(function(response) {
                                                $scope.album = {};
                                                $location.path('/album/' + albumName);
                                                $route.reload();
                                            })
                                            .catch(function(error) {
                                                $log.info(JSON.stringify(error));
                                                $scope.new_photo_error = error.data;
                                            });
                        };

                        albumHttpService.getAlbumByName($scope.album.name)
                                        .then(function(response) {
                                            $log.info("Album with name: " + $scope.album.name);
                                            $scope.album = response[0];
                                        })
                                        .catch(function(error) {
                                            $log.info("Error in getting photos: " + error);
                                        });

                        albumHttpService.getPhotosByAlbumName($scope.album.name)
                                        .then(function(response) {
                                            $scope.photos = response;
                                        })
                                        .catch(function(error) {
                                            $log.info("Error in getting photos: " + error);
                                        });
                    }]);