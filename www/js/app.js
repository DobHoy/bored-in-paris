// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngSanitize', 'google-maps'.ns()])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyCRgqpDaTZSoduDo8cghCMflVeNycTNdpI',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    })
  })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.universes', {
      url: "/universes",
      views: {
        'menuContent' :{
          templateUrl: "templates/universes.html",
          controller: 'UniverseCtrl'
        }
      }
    })

    .state('app.events', {
      url: "/events/:id",
      resolve: {
        events: function ($stateParams, Event, position) {
          return Event.getList({tag: $stateParams.id, cid: 0, created: 0, start: 0,
            end: 0, offset: 0, limit: 10, radius: 5000, lat: position.lat, lon: position.lon});
        }
      },
      views: {
        'menuContent' :{
          templateUrl: "templates/events.html",
          controller: 'EventCtrl'
        }
      }
    })
    .state('app.map', {
      resolve: {
        events: function ($stateParams, Event, position) {
          return Event.getList({tag: $stateParams.id, cid: 0, created: 0, start: 0,
            end: 0, offset: 0, limit: 10, radius: 5000, lat: position.lat, lon: position.lon});
        }
      },
      url: "/map/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/map.html",
          controller: 'MapCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/universes');
});

