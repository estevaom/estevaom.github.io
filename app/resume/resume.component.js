var resume = angular.module('resume');

resume.component('resume', {
  templateUrl: 'app/resume/resume.template.html',
  controller: ['$http',
    function ResumeComponentController($http) {
      var self = this;

      $http.get('./data/employment.json').then(function(response) {
        self.employment = response.data;
      });

      self.technologies = [
        { type: 'Backend', handlers: ['ruby-on-rails', 'node-js'] },
        { type: 'Frontend', handlers: ['angularjs', 'angular-4', 'bootstrap', 'css', 'google-material', 'html5', 'javascript', 'jquery'] },
        { type: 'Database', handlers: ['mysql', 'postgresql', 'amazon-dynamodb', 'amazon-redshift', 'treasure-data', 'google-cloud-datastore'] },
        { type: 'Cache Storage', handlers: ['elasticsearch', 'memcached', 'redis'] },
        { type: 'Test', handlers: ['capybara', 'jasmine', 'karma', 'minitest', 'mocha', 'protractor', 'rspec'] },
        { type: 'CI/CD', handlers: ['jenkins', 'semaphore', 'wercker'] },
        { type: 'Other', handlers: ['amazon-s3', 'capistrano', 'datamapper', 'git', 'new-relic', 'sidekiq', 'typescript', 'vagrant', 'webpack'] }
      ];
    }
  ]
});