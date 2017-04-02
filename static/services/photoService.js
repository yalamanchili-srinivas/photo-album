'use strict';

angular.module('photoAlbumApp.services1', [])

.factory('photoHttpService', ['$http', 'BASE_URL', '$log', function ($http, BASE_URL, $log) {

   var data = {
      'getPhotos': getPhotos,
      'uploadFileToUrl': uploadFileToUrl,
      'savePhotoToDB': savePhotoToDB
   };

   function savePhotoToDB(photo) {

      var requestURL = BASE_URL + '/photo';

      return $http({
         'url': requestURL,
         'method': 'POST',
         'headers': {
            'Content-Type': 'application/json'
         },
         'catche': false,
         'data': photo
      }).then(function (response) {
         return response.data;
      }).catch(dataServiceError);
   }

   function makeRequest(url, params) {
      var requestUrl = BASE_URL + '/' + url;

      var count = 0;
      angular.forEach(params, function (value, key) {
         if (count == 0) {
            requestUrl = requestUrl + '?' + key + '=' + value;
         } else {
            requestUrl = requestUrl + '&' + key + '=' + value;
         }
         count++;

      });

      $log.info("URL: " + requestUrl);

      return $http({
         'url': requestUrl,
         'method': 'GET',
         'headers': {
            'Content-Type': 'image/jpg'
         },
         'cache': false
      }).then(function (response) {
         return response.data;
      }).catch(dataServiceError);
   };

   function printToConsole(data) {
      for (var property in data) {
         {
            $log.info(property + " : " + data[property]);
            $log.info(data.hasOwnProperty(property));
         }
      }
   };

   function getPhotos(directoryName, fileName) {
      $log.info("In Photo Service " + "Directory Name: " + directoryName + " and File Name: " + fileName);

      return makeRequest('photo/download', {
         'directoryName': directoryName,
         'name': fileName
      });
   };

   function uploadFileToUrl(directoryName, file) {

      var requestUrl = BASE_URL + '/' + 'photo/upload';

      $log.info("URL: " + requestUrl);

      $log.info("File: " + file);


      var fd = new FormData();
      fd.append('name', directoryName);
      fd.append('file', file);
      $log.info(fd);

      return $http.post(requestUrl, fd, {
            transformRequest: angular.identity,
            headers: {
               'Content-Type': undefined
            }
         })
         .success(function (response) {
            return response;

         })
         .error(function () {});
   }

   function dataServiceError(errorResponse) {
      $log.error('Remote service request failed in viewService');
      $log.error("In photoService Error: " + errorResponse.response);
      $log.error("Status: " + errorResponse.status);
      throw errorResponse;
   }

   return data;
}]);