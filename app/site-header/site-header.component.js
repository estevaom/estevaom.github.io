/* global angular */

(function(angular) {
    'use strict';

    angular
        .module('site-header')
        .component('siteHeader', {
            templateUrl: 'app/site-header/site-header.template.html',
            controller: SiteHeaderComponentController
        });

    function SiteHeaderComponentController() {
        this.navigation_links = [
            { title: 'About Me', url: '#about' },
            { title: 'Employment', url: '#employment' },
            { title: 'Technologies', url: '#technologies' },
            { title: 'Objectives', url: '#objectives' },
            { title: 'Education', url: '#education' },
            { title: 'Contact', url: '#contact' }
        ];
    }
})(angular);
