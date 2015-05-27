// Ionic Interview App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'interview' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'interview.controllers' is found in controllers.js
angular.module('interview', ['ionic', 'config', 'interview.controllers', 'interview.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, ENV) {

  window.remoteDB = new PouchDB(ENV.remoteDbUrl + ENV.remoteDbName);
  window.localDB = new PouchDB(ENV.localDbName);
  window.localDB.sync(window.remoteDB, {live: true, retry: true}).on('error', console.log.bind(console));

  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'templates/login.html'
    })
    .state('signup', {
      url: '/signup',
      controller: 'SignupCtrl',
      templateUrl: 'templates/signup.html'
    })
    .state('profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      templateUrl: 'templates/profile.html'
    })
    .state('profile.general', {
      url: '/general',
      views: {
        'general-tab': {
          templateUrl: 'templates/profile/general.html',
          controller: 'ProfileGeneralCtrl'
        }
      }
    })
    .state('profile.professional', {
      url: '/professional',
      views: {
        'professional-tab': {
          templateUrl: 'templates/profile/professional.html',
          controller: 'ProfileProffCtrl'
        }
      }
    })
    .state('profile.skills', {
      url: '/skills',
      views: {
        'skills-tab': {
          templateUrl: 'templates/profile/skills.html',
          controller: 'ProfileSkillsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/profile/general');
});