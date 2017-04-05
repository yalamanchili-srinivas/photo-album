'use strict';

angular.module('photoAlbumApp.services', [])
       .constant('BASE_URL', 'http://localhost:9000')
       .factory('albumHttpService', ['$http', 'BASE_URL', '$log', function($http, BASE_URL, $log) {

           var data = {
               'getAlbums'           : getAlbums,
               'getAlbumByName'      : getAlbumByName,
               'getPhotosByAlbumName': getPhotosByAlbumName,
               'getPhotoFromAlbum'   : getPhotoFromAlbum,
               'addAlbum'            : addAlbum,
               'uploadFileToUrl'     : uploadFileToUrl
           };

           function makeRequest(url_partial, params) {
               var requestUrl = BASE_URL + '/' + url_partial;

               angular.forEach(params, function(value, key) {
                   requestUrl = requestUrl + '&' + key + '=' + value;
               });

               $log.info("URL: " + requestUrl);

               return $http({
                                'url'    : requestUrl,
                                'method' : 'GET',
                                'headers': {
                                    'Content-Type': 'application/json',
                                    //'Content-Type': 'text/html'
                                },
                                'cache'  : false
                            })
                   .then(function(response) {
                       $log.info("Data: ");
                       $log.info(response);

                       return response.data;
                   })
                   .catch(dataServiceError);
           };

           function getAlbums() {
               return makeRequest('albums', {});
           };

           function getAlbumByName(albumName) {
               return makeRequest('albums/' + albumName, {})
           }

           function getPhotosByAlbumName(albumName) {
               return makeRequest('albums/' + albumName + '/photos', {})
           }

           function getPhotoFromAlbum(photo) {
               $log.info("Photo details");
               $log.info(photo);

               return makeRequest('albums/' + photo.album_name + "/photos/" + photo.name, {})
           }

           function addAlbum(newAlbum) {

               var requestURL = BASE_URL + '/albums';

               return $http({
                                'url'    : requestURL,
                                'method' : 'POST',
                                'headers': {
                                    'Content-Type': 'application/json'
                                },
                                'cache'  : false,
                                'data'   : newAlbum
                            })
                   .then(function(response) {
                       return response.data;
                   })
                   .catch(dataServiceError);
           }


           function uploadFileToUrl(albumName, photoDetails, file) {
               $log.info("Album Name");
               $log.info(albumName);
               $log.info("Photo Details");
               $log.info(photoDetails);
               $log.info("File");
               $log.info(file);

               var requestURL = BASE_URL + '/albums/' + albumName + "/photos";

               var form_data = new FormData();
               form_data.append('file_to_upload', file);

               for(let key in photoDetails) {
                   form_data.append(key, photoDetails[key]);
               }


//               $log.info("Form Data");
//               for (let pair of form_data.entries()) {
//                   console.log(pair[0]+ ', ' + pair[1]);
//               }

               return $http({
                                'url'           : requestURL,
                                'method'        : 'POST',
                                'headers'       : {
                                    'Content-Type': undefined
                                },
                                transformRequest: angular.identity,
                                'cache'         : false,
                                'data'          : form_data
                            })
                   .then(function(response) {
                       $log.info("response to save image");
                       $log.info(response);
                       return response.data;
                   })
                   .catch(dataServiceError);
           }

           function dataServiceError(errorResponse) {
               $log.error('Remote service request failed in viewService');
               //         $log.error("In customerService Error: " + errorResponse.response);
               //         $log.error("Status: " + errorResponse.status);
               throw errorResponse;
           }

           return data;
       }]);