'use strict';

angular.module('photoAlbumApp.albums', [])
   .controller('albumsCtrl', ['albumHttpService', '$scope', '$log', '$location', function (albumHttpService, $scope, $log, $location) {
   $scope.adding_album = {};
   $scope.add_album_error = "";

   albumHttpService.getAlbums()
      .then(function (response) {
         $scope.albums = response;
      })
      .catch(function (error) {

      });

   $scope.addAlbum = function (newAlbum) {

      newAlbum.name = (newAlbum.title) ? newAlbum.title.replace(/ /g, '') : "";

      albumHttpService.addAlbum(newAlbum)
         .then(function (response) {
            $scope.adding_album = {};
            $location.path('/album/' + response.id);
         })
         .catch(function (error) {
            for (var eachTag in error.data.errors) {
               $scope.add_album_error = eachTag.toUpperCase() + ": " + error.data.errors[eachTag][0].message;
            }
         });

      $scope.cancel = function () {
         $location.path('/');
      }

   }
         }]);