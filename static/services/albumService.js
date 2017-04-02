'use strict';

angular.module('photoAlbumApp.services', [])
   .constant('BASE_URL', 'http://localhost:9000')
   .factory('albumHttpService', ['$http', 'BASE_URL', '$log', function ($http, BASE_URL, $log) {

      var data = {
         'getAlbums': getAlbums,
         'getAlbumById': getAlbumById,
         'addAlbum': addAlbum
      };

      function makeRequest(url, params) {
         var requestUrl = BASE_URL + '/' + url;

         angular.forEach(params, function (value, key) {
            requestUrl = requestUrl + '&' + key + '=' + value;
         });

         $log.info("URL: " + requestUrl);

         return $http({
            'url': requestUrl,
            'method': 'GET',
            'headers': {
               'Content-Type': 'application/json',
               //'Content-Type': 'text/html'
            },
            'cache': false
         }).then(function (response) {
            $log.info("Data: " + response.data);

            return response.data;
         }).catch(dataServiceError);
      };

      function getAlbums() {
         return makeRequest('albums', {});
      };

      function getAlbumById(albumId) {
         $log.info("Album id: " + albumId);
         return makeRequest('album/all', {})
      }

      function addAlbum(newAlbum) {

         var requestURL = BASE_URL + '/album';

         return $http({
            'url': requestURL,
            'method': 'POST',
            'headers': {
               'Content-Type': 'application/json'
            },
            'catche': false,
            'data': newAlbum
         }).then(function (response) {
            return response.data;
         }).catch(dataServiceError);
      }

      function dataServiceError(errorResponse) {
         $log.error('Remote service request failed in viewService');
         //         $log.error("In customerService Error: " + errorResponse.response);
         //         $log.error("Status: " + errorResponse.status);
         throw errorResponse;
      }

      return data;
         }]);