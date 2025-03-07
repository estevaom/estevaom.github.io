/* global angular */

(function(angular) {
    'use strict';

    angular
        .module('resume')
        .component('resume', {
            templateUrl: 'app/components/resume/resume.template.html',
            controller: ResumeComponentController
        });

    ResumeComponentController.$inject = ['$http'];

    function ResumeComponentController($http) {
        var self = this;

        $http.get('./app/data/employment.json').then(function(response) {
            self.employment = response.data;
        });

        self.technologies = [
            { type: 'AI Developer Tools', handlers: ['github-copilot', 'cursor-ide', 'windsurf-ide', 'claude-3', 'ai-agents', 'cline', 'roo-code'] },
            { type: 'Backend', handlers: ['ruby-on-rails', 'node-js'] },
            { type: 'Frontend', handlers: ['angularjs', 'angular-4', 'bootstrap', 'css', 'google-material', 'html5', 'hotwire', 'javascript', 'jquery'] },
            { type: 'Database / Cache Storage', handlers: ['mysql', 'postgresql', 'amazon-dynamodb', 'amazon-redshift', 'treasure-data', 'google-cloud-datastore', 'elasticsearch', 'memcached', 'redis'] },
            { type: 'Test', handlers: ['capybara', 'jasmine', 'karma', 'minitest', 'mocha', 'protractor', 'rspec'] },
            { type: 'Other', handlers: ['amazon-s3', 'capistrano', 'datamapper', 'git', 'jenkins', 'new-relic', 'semaphore', 'sidekiq', 'typescript', 'vagrant', 'webpack', 'wercker'] }
        ];
    }
})(angular);
