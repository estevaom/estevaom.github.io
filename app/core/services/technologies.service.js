/* global angular */

(function(angular) {
    'use strict';

    angular
        .module('estevaoApp')
        .factory('technologies', TechnologiesService);

    TechnologiesService.$inject = ['$http'];

    function TechnologiesService($http) {
        return $http.get('./data/technologies.json');
    }
})(angular);
