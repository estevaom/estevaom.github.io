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

    function BlogPostController() {
        var self = this;
        var starsCache = null;

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
    }
})(angular);
