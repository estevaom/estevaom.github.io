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
            return '★'.repeat(self.post.rating) + '☆'.repeat(5 - self.post.rating);
        };
    }
})(angular);
