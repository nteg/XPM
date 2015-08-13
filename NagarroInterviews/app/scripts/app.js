// Ionic Interview App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'interview' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'interview.controllers' is found in controllers.js
angular.module('interview', ['ionic', 'config', 'interview.controllers', 'interview.directives', 'LocalStorageModule', 'ionMdInput', 'pouchdb'])

.run(['$rootScope', '$ionicPlatform', '$location', '$state', 'userService', function($rootScope, $ionicPlatform, $location, $state, userService) {

  $ionicPlatform.ready(function() {

    'use strict';

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

    $rootScope.$on( '$stateChangeStart', function(e, toState , toParams, fromState, fromParams) {
        var isLogin = toState.name === 'login',
            isSignUp = toState.name === 'signup',
            isAbout = toState.name === 'about';
        if (isLogin || isSignUp || isAbout) {
          return; // no need to redirect
        }

        // now, redirect only not authenticated
        var isLoggedIn = userService.isLoggedIn();

        if (!isLoggedIn) {
            e.preventDefault(); // stop current execution
            $state.go('login'); // go to login
        }
    });
}])

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', 'localStorageServiceProvider', 'ENV', function($stateProvider, $urlRouterProvider, $ionicConfigProvider, localStorageServiceProvider, ENV) {

  'use strict';

  window.remoteDB = new PouchDB(ENV.DB.remote.url + ENV.DB.remote.name);
  window.localDB = new PouchDB(ENV.DB.local.name);
  // window.localDB.sync(window.remoteDB, {live: true, retry: true}).on('error', console.log.bind(console));

  localStorageServiceProvider
    .setPrefix('ngInt');


    $ionicConfigProvider.backButton.text(' ').icon('ion-chevron-left').previousTitleText(false);

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html"
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          controller: 'LoginCtrl',
          templateUrl: 'templates/login.html'
        }
      }
    })
    .state('app.signup', {
      url: '/signup',
      views: {
        'menuContent': {
          controller: 'SignupCtrl',
          templateUrl: 'templates/signup.html'
        }
      }
    })
    .state('app.chpwd', {
      url: '/chpwd',
      views: {
        'menuContent': {
          controller: 'ChpwdCtrl',
          templateUrl: 'templates/chpwd.html'
        }
      }
    })
    .state('app.openings', {
      url: '/openings',
      views: {
        'menuContent': {
          controller: 'OpeningsCtrl',
          templateUrl: 'templates/openings.html'
        }
      }
    })
    .state('app.openings-detail', {
      url: '/openings/:openingId',
      views: {
        'menuContent': {
          controller: 'OpeningDetailCtrl',
          templateUrl: 'templates/openings/opening-details.html'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          controller: 'ProfileCtrl',
          templateUrl: 'templates/profile.html'
        }
      }
    })
    .state('app.profile.general', {
      url: '/general',
      views: {
        'general-tab': {
          templateUrl: 'templates/profile/general.html',
          controller: 'ProfileGeneralCtrl'
        }
      }
    })
    .state('app.profile.professional', {
      url: '/professional',
      views: {
        'professional-tab': {
          templateUrl: 'templates/profile/professional.html',
          controller: 'ProfileProffCtrl'
        }
      }
    })
    .state('app.profile.skills', {
      url: '/skills',
      views: {
        'skills-tab': {
          templateUrl: 'templates/profile/skills.html',
          controller: 'ProfileSkillsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/profile/general');
}])
;