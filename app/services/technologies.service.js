angular.module('estevaoApp')
  .factory('technologies', ['$http', function($http) {
    return $http.get('./data/technologies.json');
}]);