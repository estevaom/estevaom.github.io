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
        var ctrl = this;
        
        ctrl.navigation_links = [
            { title: 'About Me', url: '#about' },
            { title: 'Employment', url: '#employment' },
            { title: 'Technologies', url: '#technologies' },
            { title: 'Objectives', url: '#objectives' },
            { title: 'Education', url: '#education' },
            { title: 'Contact', url: '#contact' }
        ];
        
        // Theme state
        ctrl.isDarkTheme = false;
        
        // Initialize theme from localStorage if available
        ctrl.$onInit = function() {
            var savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                ctrl.isDarkTheme = true;
                applyTheme('dark');
            } else {
                applyTheme('light');
            }
        };
        
        // Toggle theme function
        ctrl.toggleTheme = function() {
            ctrl.isDarkTheme = !ctrl.isDarkTheme;
            var theme = ctrl.isDarkTheme ? 'dark' : 'light';
            
            // Save theme preference
            localStorage.setItem('theme', theme);
            
            // Apply the theme
            applyTheme(theme);
        };
        
        // Apply theme by swapping CSS files
        function applyTheme(theme) {
            var head = document.getElementsByTagName('head')[0];
            var themeLink = document.getElementById('theme-css');
            
            if (!themeLink) {
                themeLink = document.createElement('link');
                themeLink.id = 'theme-css';
                themeLink.rel = 'stylesheet';
                head.appendChild(themeLink);
            }
            
            themeLink.href = 'app/' + theme + '-theme.css';
        }
    }
})(angular);
