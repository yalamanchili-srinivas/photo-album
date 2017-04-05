'use strict';

angular.module('photoAlbumApp.routes', ['ngRoute']).config(routes);

function routes($routeProvider) {
   $routeProvider
      .when('/', {
         redirectTo: '/album/all'
      })
      .when('/index.html', {
         redirectTo: '/album/all'
      })
      .when('/album/all', {
         controller: 'albumsCtrl',
         //controllerAs: 'albums',
         templateUrl: '/partials/albums/albumsPartial.html'
      })
      .when('/album/:album_name', {
         controller: 'albumCtrl',
         //controllerAs: 'album',
         templateUrl: '/partials/album/albumPartial.html'
      })

   .when('/404_page', {
         controller: 'Controller404',
         templateUrl: '/error/404_page.html'
      })
      .otherwise({
         redirectTo: '/404_page'
      });
}