'use strict';

angular.module('photoAlbumApp.albums', [])
   .controller('albumsCtrl', ['albumHttpService', '$scope', '$log', '$location', function (albumHttpService, $scope, $log, $location) {
   $scope.new_album = {};
   $scope.new_album_error = "";

   albumHttpService.getAlbums()
      .then(function (response) {
         $scope.albums = response;
      })
      .catch(function (error) {

      });

   $scope.addAlbum = function (newAlbum) {

//       $log.info("New Album");
//       $log.info(newAlbum);

      newAlbum.name = (newAlbum.name) ? newAlbum.name.replace(/ /g, '') : "";

       albumHttpService.addAlbum(newAlbum)
         .then(function (response) {
             $log.info("New Album Saved Response");
             $log.info(response);
            $scope.new_album = {};
            $location.path('/album/' + response.name);
         })
         .catch(function (error) {
            for (var eachTag in error.data.errors) {
               $scope.new_album_error = eachTag.toUpperCase() + ": " + error.data.errors[eachTag][0].message;
            }
         });

      $scope.cancel = function () {
         $location.path('/');
      }

   }
         }]);