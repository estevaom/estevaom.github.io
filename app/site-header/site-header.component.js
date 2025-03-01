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
        
        // Theme options and current state
        ctrl.themes = [
            { id: 'light', icon: 'brightness_7', label: 'Light' },
            { id: 'dark', icon: 'brightness_3', label: 'Dark' },
            { id: 'starry-night', icon: 'nights_stay', label: 'Starry Night' }
        ];
        ctrl.currentTheme = 'light';
        ctrl.isDarkTheme = false; // Kept for backward compatibility
        
        // Initialize theme from localStorage if available
        ctrl.$onInit = function() {
            var savedTheme = localStorage.getItem('theme') || 'light';
            ctrl.currentTheme = savedTheme;
            ctrl.isDarkTheme = (savedTheme === 'dark'); // Maintain compatibility
            
            // Apply theme with a slight delay to ensure DOM is ready
            setTimeout(function() {
                applyTheme(savedTheme);
            }, 100);
        };
        
        // Toggle through themes
        ctrl.toggleTheme = function() {
            // Find current index and move to next theme
            var currentIndex = ctrl.themes.findIndex(function(theme) {
                return theme.id === ctrl.currentTheme;
            });
            var nextIndex = (currentIndex + 1) % ctrl.themes.length;
            var previousTheme = ctrl.currentTheme;
            ctrl.currentTheme = ctrl.themes[nextIndex].id;
            
            // Update dark theme flag for backward compatibility
            ctrl.isDarkTheme = (ctrl.currentTheme === 'dark');
            
            // Save theme preference
            localStorage.setItem('theme', ctrl.currentTheme);
            localStorage.setItem('previous-theme', previousTheme);
            
            // Apply the theme
            applyTheme(ctrl.currentTheme, previousTheme);
        };
        
        // Apply theme by swapping CSS files
        function applyTheme(theme, previousTheme) {
            // Clean up any previous theme
            if (previousTheme === 'starry-night') {
                var oldScript = document.getElementById('starry-night-script');
                if (oldScript) {
                    oldScript.remove();
                }
                
                var container = document.getElementById('starry-night-container');
                if (container) {
                    container.remove();
                }
                
                var animationStyle = document.getElementById('starry-night-animations');
                if (animationStyle) {
                    animationStyle.remove();
                }
            }
            
            var head = document.getElementsByTagName('head')[0];
            var themeLink = document.getElementById('theme-css');
            
            if (!themeLink) {
                themeLink = document.createElement('link');
                themeLink.id = 'theme-css';
                themeLink.rel = 'stylesheet';
                head.appendChild(themeLink);
            }
            
            themeLink.href = 'app/' + theme + '-theme.css';
            
            // Apply body class for theme-specific styling (do this first)
            document.body.classList.remove('light-theme', 'dark-theme', 'starry-night-theme');
            document.body.classList.add(theme + '-theme');
            
            // Add JavaScript for Starry Night theme if needed
            var starryNightScript = document.getElementById('starry-night-script');
            if (theme === 'starry-night') {
                if (!starryNightScript) {
                    starryNightScript = document.createElement('script');
                    starryNightScript.id = 'starry-night-script';
                    starryNightScript.src = 'app/starry-night-theme.js';
                    head.appendChild(starryNightScript);
                    
                    // If script exists but needs to be reinitialized
                    if (typeof initStarryNightTheme === 'function') {
                        setTimeout(initStarryNightTheme, 100);
                    }
                }
            } else {
                // Remove script if not using starry night theme
                if (starryNightScript) {
                    starryNightScript.remove();
                }
            }
            
            // Dispatch a custom event for theme change (for JavaScript themes)
            var event = new CustomEvent('themeChanged', {
                detail: {
                    theme: theme,
                    previousTheme: previousTheme || localStorage.getItem('previous-theme') || 'light'
                }
            });
            document.dispatchEvent(event);
        }
    }
})(angular);
