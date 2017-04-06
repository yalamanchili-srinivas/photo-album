'use strict';

angular.module('photoAlbumApp.albumService', [])
       .constant('BASE_URL', 'http://localhost:9000')
       .factory('albumHttpService', ['$http', 'BASE_URL', '$log', function($http, BASE_URL, $log) {


//           var stringToGoIntoTheRegex = "abc";
//           var regex = new RegExp("#" + stringToGoIntoTheRegex + "#", "g");
//// at this point, the line above is the same as: var regex = /#abc#/g;
//
//           var input = "Hello this is #abc# some #abc# stuff.";
//           var output = input.replace(regex, "!!");
//           alert(output); // Hello this is !! some !! stuff.

           const albumNameRegex = new RegExp("#" + "albumName" + "#", "g");

           const URL_ALBUMS = BASE_URL + '/albums';
           const URL_ADD_ALBUM = BASE_URL + '/albums';

           const URL_ALBUM_BY_NAME = BASE_URL + '/albums/#albumName#';
           const URL_PHOTOS_BY_ALBUM = BASE_URL + '/albums/#albumName#/photos';

           const URL_UPLOAD_PHOTO = BASE_URL + '/albums/#albumName#/photos';

           let makeRequest = (url, params) => {
               angular.forEach(params, function(value, key) {
                   url = url + '&' + key + '=' + value;
               });

               $log.info("URL: " + url);

               return $http({
                                'url'    : url,
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

           let getAlbums = () => {
               return makeRequest(URL_ALBUMS, {});
           };

           let getAlbumByName = (albumName) => {
               let finalURL = URL_ALBUM_BY_NAME.replace(albumNameRegex, albumName);
               return makeRequest(finalURL, {})
           };

           function getPhotosByAlbumName(albumName) {
               let finalURL = URL_PHOTOS_BY_ALBUM.replace(albumNameRegex, albumName);

               return makeRequest(finalURL, {})
           }

           function addAlbum(newAlbum) {

               return $http({
                                'url'    : URL_ADD_ALBUM,
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


           let uploadPhoto = (albumName, photoDetails, file) => {

               let finalURL = URL_UPLOAD_PHOTO.replace(albumNameRegex, albumName);

               $log.info("Album Name");
               $log.info(albumName);
               $log.info("Photo Details");
               $log.info(photoDetails);
               $log.info("File");
               $log.info(file);

               var form_data = new FormData();
               form_data.append('file_to_upload', file);

               for(let key in photoDetails) {
                   form_data.append(key, photoDetails[key]);
               }

               return $http({
                                'url'           : finalURL,
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
           };

           let dataServiceError = (errorResponse) => {
               $log.error('Remote service request failed in viewService');
               //         $log.error("In customerService Error: " + errorResponse.response);
               //         $log.error("Status: " + errorResponse.status);
               throw errorResponse;
           };

           return {
               'getAlbums'           : getAlbums,
               'getAlbumByName'      : getAlbumByName,
               'getPhotosByAlbumName': getPhotosByAlbumName,
               'addAlbum'            : addAlbum,
               'uploadPhoto'         : uploadPhoto
           };

       }]);