angular.module('estevaoApp')
  .factory('technologies', ['$http', function($http) {

    return $http.get('./data/technologies.json').then(function(response) {
      return response.data;
    });
}]);