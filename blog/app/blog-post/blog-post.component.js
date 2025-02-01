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

        self.getStars = function() {
            var stars = '★'.repeat(self.post.rating) + '☆'.repeat(5 - self.post.rating);
            return stars.split('').map(function(star) {
                return {text: star};
            });
        };
    }
})(angular);
