/* global angular */

(function(angular) {
    'use strict';

    angular
        .module('tech-item')
        .component('techItem', {
            templateUrl: 'app/tech-item/tech-item.template.html',
            bindings: {
                handler: '@'
            },
            controller: TechItemComponentController
        });

    TechItemComponentController.$inject = ['$http', 'technologies'];

    function TechItemComponentController($http, technologies) {
        var self = this;

        technologies.then(function(tech) {
            self.item = tech.data.find(techByHandler);
        });

        function techByHandler(techlist) {
            return techlist.handler === self.handler;
        }
    }
})(angular);
