var resume = angular.module('resume');

resume.component('resume', {
  templateUrl: 'app/resume/resume.template.html',
  controller: ['$http',
    function ResumeComponentController($http) {
      var self = this;

      $http.get('./data/employment.json').then(function(response) {
        self.employment = response.data;
      })

      self.technologies = [
        { type: 'Backend', titles: ['Ruby on Rails', 'Node.js'] },
        { type: 'Frontend', titles: ['Angular 1.5', 'Angular 4', 'Bootstrap', 'CSS', 'Google Material', 'HTML5', 'Javascript', 'jQuery'] },
        { type: 'Database', titles: ['Mysql', 'Postgresql', 'Amazon DynamoDB', 'Amazon Redshift', 'Treasure Data'] },
        { type: 'Cache Storage', titles: ['ElasticSearch', 'Memcached', 'Redis'] },
        { type: 'Test', titles: ['Capybara', 'Jasmine', 'Karma', 'Minitest', 'Mocha', 'Protractor', 'Rspec'] },
        { type: 'CI/CD', titles: ['Jenkins', 'Semaphore', 'Wercker'] },
        { type: 'Other', titles: ['Apotomo', 'Amazon S3', 'Capistrano', 'Datamapper', 'Git', 'New Relic', 'Sidekiq', 'Typescript', 'Vagrant', 'Webpack'] }
      ];
    }
  ]
});