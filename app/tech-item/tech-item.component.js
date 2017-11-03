var techItem = angular.module('tech-item');

techItem.component('techItem', {
  templateUrl: 'app/tech-item/tech-item.template.html',
  bindings: {
    handler: '@'
  },
  controller: ['$http', 'technologies',
    function TechItemComponentController($http, technologies) {
      var self = this;

      technologies.then(function(tech) {
        self.item = tech.data.find(techByHandler);
      });

      function techByHandler(techlist) {
        return techlist.handler === self.handler;
      };
    }
  ]
});