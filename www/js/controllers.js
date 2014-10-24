angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

  .controller('PlaylistCtrl', function($scope, $stateParams, EquipmentCategory, EventCategory, $http) {
    //EquipmentCategory.getList().then(function (res) {
    //  $scope.equipments = res;
    //}, function (err) {
    //  $scope.error = err;
    //});
    //
    //EventCategory.getList().then(function (res) {
    //  $scope.eventCategories = res;
    //}, function (err) {
    //  $scope.error = err;
    //});



    var url = 'https://api.paris.fr/api/data/1.4/QueFaire/get_geo_activities/?token=d0a2b407b51e9852ffdfe5f3c36dc8d6243110b76e225ad9d8d6cfd513a30d7c';
    url += "&tag=6&cid=0&created=0&start=0&end=0&lat=48.8&lon=2.35&radius=5000&offset=0&limit=100"
    $http.get(url).then(function (res) {
      $scope.data = res;
    }, function (error) {
      $scope.error = error;
    })
  })

  .controller('UniverseCtrl', function($scope, Universe) {
    console.log('UniverseCtrl');
    Universe.getList().then(function (res) {
      $scope.model = { universes: res };
    }, function (err) {
      $scope.error = err;
    });
  })

  .controller('EventCtrl', function ($scope, events, decoder, $sce) {
    console.log('EventCtrl');
    events.forEach(function (elem) {
      //elem.description = $sce.trustAsHtml(decoder.decode(elem.description));
      elem.description = decoder.decode(elem.description);
      elem.small_description = decoder.decode(elem.small_description);
    });
    $scope.events = events;
    console.log(events);
  })

  .controller('MapCtrl', ['$scope', 'GoogleMapApi'.ns(), 'events', 'position', function ($scope, GoogleMapApi, events, position) {
    $scope.markers = [];
    $scope.events = events;

    $scope.openEvent = function (event) {
      console.log('open', $scope.currentEvent, event);
      //$scope.currentEvent = event;
      return;

      if ($scope.currentEvent) {
        $scope.currentEvent.show = false;
        //$scope.currentEvent.control.hideWindow();
      }

      $scope.currentEvent.show = true;
    };

    events.forEach(function (elem) {
      //elem.description = $sce.trustAsHtml(decoder.decode(elem.description));
      elem.position = {latitude: elem.lat, longitude: elem.lon};
      elem.show = false;
      elem.onClick = function () {
        $scope.openEvent(elem);
      };
      elem.control = {elem: true};
    });

    $scope.control = {ctrl: true};

    $scope.map = {
      center: {latitude: position.lat, longitude: position.lon},
      zoom: 14
    };
    GoogleMapApi.then(function (gmap) {
      console.log('maps alive', gmap);
      $scope.gmap = gmap;
    });
  }])
;
