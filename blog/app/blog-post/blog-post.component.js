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
            self.currentImageIndex = 0;
            self.currentImage = self.post.images[0];

            escHandler = function(event) {
                if (!self.showLightbox) return;
                
                if (event.key === 'Escape') {
                    $scope.$apply(function() {
                        self.closeLightbox();
                    });
                } else if (event.key === 'ArrowLeft' && self.post.images.length > 1) {
                    $scope.$apply(function() {
                        self.prevImage(event);
                    });
                } else if (event.key === 'ArrowRight' && self.post.images.length > 1) {
                    $scope.$apply(function() {
                        self.nextImage(event);
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
                self.currentImageIndex = 0;
                self.currentImage = self.post.images[0];
            }
        };

        self.nextImage = function($event) {
            if ($event) {
                $event.stopPropagation();
            }
            self.currentImageIndex = (self.currentImageIndex + 1) % self.post.images.length;
            self.currentImage = self.post.images[self.currentImageIndex];
        };

        self.prevImage = function($event) {
            if ($event) {
                $event.stopPropagation();
            }
            self.currentImageIndex = (self.currentImageIndex - 1 + self.post.images.length) % self.post.images.length;
            self.currentImage = self.post.images[self.currentImageIndex];
        };

        self.setImage = function(index, $event) {
            if ($event) {
                $event.stopPropagation();
            }
            self.currentImageIndex = index;
            self.currentImage = self.post.images[self.currentImageIndex];
        };

        self.handleLightboxClick = function($event) {
            if ($event.target.tagName.toLowerCase() === 'img' ||
                $event.target.tagName.toLowerCase() === 'button') {
                return;
            }
            self.closeLightbox();
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
