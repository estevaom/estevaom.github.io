/* global angular */

(function(angular) {
    'use strict';

    angular
        .module('blog-post')
        .component('blogPost', {
            templateUrl: 'app/blog-post/blog-post.template.html',
            bindings: {
                post: '<'
            },
            controller: BlogPostController
        });

    function BlogPostController($scope, $window) {
        var self = this;
        var starsCache = null;
        var escHandler = null;

        self.$onInit = function() {
            self.showLightbox = false;
            escHandler = function(event) {
                if (event.key === 'Escape' && self.showLightbox) {
                    $scope.$apply(function() {
                        self.closeLightbox();
                    });
                }
            };
            angular.element($window).on('keydown', escHandler);
        };

        self.$onDestroy = function() {
            if (escHandler) {
                angular.element($window).off('keydown', escHandler);
            }
        };

        self.$onChanges = function(changes) {
            if (changes.post) {
                starsCache = null;
            }
        };

        self.getStars = function() {
            if (!starsCache) {
                var stars = '★'.repeat(self.post.rating) + '☆'.repeat(5 - self.post.rating);
                starsCache = stars.split('').map(function(star) {
                    return {text: star};
                });
            }
            return starsCache;
        };

        self.openLightbox = function() {
            self.showLightbox = true;
        };

        self.closeLightbox = function() {
            self.showLightbox = false;
        };
    }
})(angular);
