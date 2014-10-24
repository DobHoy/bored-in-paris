angular.module('starter.services', ['restangular'])
  .constant('BASE_URL', 'https://api.paris.fr/api/data')
  .constant('API_TOKEN', 'd0a2b407b51e9852ffdfe5f3c36dc8d6243110b76e225ad9d8d6cfd513a30d7c')

  .config(function (RestangularProvider, $httpProvider, BASE_URL, API_TOKEN) {
    RestangularProvider.setBaseUrl(BASE_URL);
    RestangularProvider.setDefaultRequestParams({token: API_TOKEN});

    // add a response intereceptor
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      // .. to look for getList operations
      console.log(data);

      if (operation === "getList") {
        // .. and handle the data and meta data
        extractedData = data.data;
      } else {
        extractedData = data.data;
      }
      return extractedData;
    });

    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
  })

  .factory('_', function($window) {
    return $window._;
  })

  .factory('EquipmentCategory', function (Restangular) {
    var restangular = Restangular.withConfig(function (config) {
      config.setRestangularFields({id: 'idcategories'});
    });
    return restangular.all('1.0/Equipements/get_categories');
  })

  .factory('EventCategory', function (Restangular) {
    return Restangular.all('1.2/QueFaire/get_categories');
  })

  .factory('Event', function (Restangular) {
    return Restangular.all('1.4/QueFaire/get_geo_activities');
  })

  .factory('Universe', function (Restangular) {
    return Restangular.all('1.0/QueFaire/get_univers');
  })

  .service('position', function () {
    this.lat = 48.85;
    this.lon = 2.35;
  })

  .service('decoder', function ($window) {
    var html = new $window.Html5Entities();
    this.decode = function (text) {
      return html.decode(text);
    }
  })
;
