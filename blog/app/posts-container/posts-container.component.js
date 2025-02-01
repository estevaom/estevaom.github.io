/* global angular */

(function(angular) {
    'use strict';

    angular
        .module('posts-container')
        .component('postsContainer', {
            templateUrl: 'app/posts-container/posts-container.template.html',
            controller: PostsContainerController
        });

    PostsContainerController.$inject = ['$http'];

    function PostsContainerController($http) {
        var self = this;

        self.$onInit = function() {
            $http.get('data/posts.json').then(function(response) {
                self.posts = response.data;
            });
        };
    }
})(angular);
