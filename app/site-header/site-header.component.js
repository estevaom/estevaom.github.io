var siteHeader = angular.module('site-header');

siteHeader.component('siteHeader', {
  templateUrl: 'app/site-header/site-header.template.html',
  controller: [function SiteHeaderComponentController() {
    this.navigation_links = [
      { title: 'About Me', url: '#about' },
      { title: 'Employment', url: '#employment' },
      { title: 'Technologies', url: '#technologies' },
      { title: 'Objectives', url: '#objectives' },
      { title: 'Education', url: '#education' },
      { title: 'Contact', url: '#contact' }
    ];
  }]
});