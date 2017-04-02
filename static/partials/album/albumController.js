'use strict';

angular.module('photoAlbumApp.album', []).controller('albumCtrl', ['albumHttpService', 'photoHttpService', 'BASE_URL', '$scope', '$routeParams', '$log', '$location', '$route', function (albumHttpService, photoHttpService, BASE_URL, $scope, $routeParams, $log, $location, $route) {

    $scope.new_photo_error = "";

    $scope.album = {};
    $scope.album.id = $routeParams.album_id;

    $scope.images = {};


    $scope.uploadImage = function (newPhoto) {
        var file = $scope.myFile;

        $log.info("In file Upload Method........ " + JSON.stringify($scope.myFile));
        $log.info("Album Name: " + $scope.album.name);
        photoHttpService.uploadFileToUrl($scope.album.name, file).then(function (response) {
            newPhoto.fileName = response.data;
            newPhoto.album_id = $scope.album.id;
            addPhoto(newPhoto);
        }).catch(function (error) {

        });

    }

    function addPhoto(newPhoto) {
        $log.info(JSON.stringify(newPhoto));
        photoHttpService.savePhotoToDB(newPhoto)
            .then(function (response) {
                $scope.new_photo = {};
                $scope.new_photo_error = "";
                $scope.myFile = "";
                $location.path('/album/' + $scope.album.id);
                $route.reload();
            })
            .catch(function (error) {
                $log.info(JSON.stringify(error));
                $scope.new_photo_error = error.data;
            });

    }

    albumHttpService.getAlbumById($scope.album.id)
        .then(function (response) {

            var albums = response;

            for (var i = 0; i < albums.length; i++) {
                if (albums[i].id == $scope.album.id) {
                    $scope.photos = albums[i].photos;
                    $scope.album.name = albums[i].name;
                    $scope.album.title = albums[i].title;
                    $scope.album.description = albums[i].description;
                }
            }

            var numberOfImages = $scope.photos.length;
            $log.info("Number of images:" + numberOfImages);

            for (var i = 0; i < numberOfImages; i++) {

                $log.info($scope.photos[i].fileName + "  " + $scope.album.name);
                getImage($scope.album.name, $scope.photos[i].fileName);
            }
        })
        .catch(function (error) {
            $log.info("Error in getting photos: " + error);
        });

    function getImage(directoryName, fileName) {
        $scope.images[fileName] = BASE_URL + '/' + 'photo/download?directoryName=' + directoryName + '&name=' + fileName;
    }
}]);