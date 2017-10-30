angular.
  module('resume').
  component('resume', {
    templateUrl: 'app/resume/resume.template.html',
    controller: function ResumeComponentController() {
      this.navigation_links = [
        { title: 'About Me', url: '#about' },
        { title: 'Employment', url: '#employment' },
        { title: 'Technologies', url: '#technologies' },
        { title: 'Objectives', url: '#objectives' },
        { title: 'Education', url: '#education' },
        { title: 'Contact', url: '#contact' }
      ];

      this.employment = [
        {
          name: 'DashBid Media (2015 ~ present)',
          title: 'Senior Web Developer @ Dashbid ~ New York (remote)',
          url: 'https://www.dashbid.com/',
          description: [
            'Developed countless features in an agile environment',
            'Planned and carried out daily scrums, weekly estimations and retrospectives and pair programming',
            'Developed and tested customer facing apps and internal dashboards using Google Material',
            'Created Treasure Data and RedShift big data services queries to feed our database',
            'Built and tested REST APIs and their docs to be used by our many customers',
            'Set up and maintained applications on Amazon Web Services'
          ],
          technologies: [
            { url: "https://nodejs.org/en/", name: 'Node.js' },
            { url: "https://angular.io/", name: 'Angular 4' },
            { url: "https://aws.amazon.com/dynamodb/", name: 'Amazon DynamoDB' },
            { url: "http://rubyonrails.org/", name: 'Ruby on Rails' },
            { url: "https://jquery.com/", name: 'JQuery' },
            { url: "https://developer.mozilla.org/en-US/docs/Web/CSS", name: 'CSS' },
            { url: "https://www.mysql.com/", name: 'MySQL' },
            { url: "https://aws.amazon.com/elasticache/", name: 'Amazon ElastiCache' },
            { url: "https://aws.amazon.com/redshift/", name: 'Amazon Redshift' },
            { url: "https://www.treasuredata.com/", name: 'Treasure Data' },
          ]
        },
        {
          name: 'XL Solutions (2012 ~ 2015)',
          title: 'Web Developer @ XL Solutions ~ Rio de Janeiro',
          url: 'http://www.xlsol.com/',
          description: [
            'Built e-commerces for the biggest phone carriers in Brazil (Claro, Tim, Vivo, Oi, Porto Seguro)',
            'Often worked in a support role answering tickets, fixing bugs, talking to customers, going to meetings and creating new features on demand for our many projects',
            'Developed and tested APIs and high traffic websites like real time auction, e-learning school and e-commerces',
            'Developed a mobile web app to be opened on specific tablets and be used as interface for selling mobile phones in stores in Angular 1.5',
            'Full implementation and maintenance of marketplaces with millions of items parsed from XMLs or Json APIs loaded to ElasticSearch',
            'Ported legacy applications from Ruby 1.8 and Rails 2.3 to Ruby 2 and Rails 4',
          ],

          technologies: [
            { url: "http://rubyonrails.org/", name: "Ruby on Rails" },
            { url: "https://jquery.com/", name: "JQuery" },
            { url: "https://developer.mozilla.org/en-US/docs/Web/CSS", name: "CSS" },
            { url: "https://www.mysql.com/", name: "MySQL" },
            { url: "https://angular.io/", name: "Angular 1.5" },
            { url: "https://aws.amazon.com/s3/", name: "Amazon S3" },
            { url: "http://sidekiq.org/", name: "Sidekiq" },
            { url: "https://www.elastic.co/products/elasticsearch", name: "Elasticsearch" },
          ]
        },
        {
          name: 'Kissy (2012 ~ 2014)',
          title: 'Web Developer, DevOps @ Kissy ~ Rio de Janeiro',
          url: '#',
          description: [
            'Created and maintained an iphone and android webview dating app with push notification and html5 geolocation',
            'Set up all services on Amazon Web Services to host the app',
            'Interacted with many social network APIs like Gmail, Google Maps, Facebook and Foursquare'
          ],
          technologies: [
            { url: "http://rubyonrails.org/", name: 'Ruby on Rails' },
            { url: "https://jquery.com/", name: 'JQuery' },
            { url: "https://developer.mozilla.org/en-US/docs/Web/CSS", name: 'CSS' },
            { url: "https://www.mysql.com/", name: 'MySQL' },
            { url: "https://aws.amazon.com/ec2/", name: 'Amazon EC2' },
            { url: "https://aws.amazon.com/rds/", name: 'Amazon RDS' },
            { url: "https://aws.amazon.com/s3/", name: 'Amazon S3' },
          ]
        },
        {
          name: 'Hands S.A. (2007 ~ 2012)',
          title: 'Software Developer @ Hands ~ Rio de Janeiro',
          url: 'http://www.hands.com.br/',
          description: [
            'Maintained a crawler that saved websites news to be displayed in a mobile environment',
            'Released the first mobile portal in Brazil the same day the first iPhone was',
            'Planned and executed the codebase migration from C# to Ruby on Rails',
            'Developed mobile websites',
            'Developed and maintained a CMS in Ruby on Rails'
          ],
          technologies: [
            { url: "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)", name: 'C#' },
            { url: "https://www.w3.org/XML/", name: 'XML' },
            { url: "https://www.w3.org/TR/html5/", name: 'HTML5' },
            { url: "https://www.ruby-lang.org/en/", name: 'Ruby' },
            { url: "http://rubyonrails.org/", name: 'Ruby on Rails' },
            { url: "https://developer.mozilla.org/en-US/docs/Web/CSS", name: 'CSS' },
            { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", name: 'Javascript' },
          ]
        }
      ]

      this.technologies = [
        { type: 'Backend', titles: ['Ruby on Rails', 'Node.js'] },
        { type: 'Frontend', titles: ['Angular 1.5', 'Angular 4', 'Bootstrap', 'CSS', 'Google Material', 'HTML5', 'Javascript', 'jQuery'] },
        { type: 'Database', titles: ['Mysql', 'Postgresql', 'Amazon DynamoDB', 'Amazon Redshift', 'Treasure Data'] },
        { type: 'Cache Storage', titles: ['ElasticSearch', 'Memcached', 'Redis'] },
        { type: 'Test', titles: ['Capybara', 'Jasmine', 'Karma', 'Minitest', 'Mocha', 'Protractor', 'Rspec'] },
        { type: 'CI/CD', titles: ['Jenkins', 'Semaphore', 'Wercker'] },
        { type: 'Other', titles: ['Apotomo', 'Amazon S3', 'Capistrano', 'Datamapper', 'Git', 'New Relic', 'Sidekiq', 'Typescript', 'Vagrant', 'Webpack'] }
      ]
    }
  });