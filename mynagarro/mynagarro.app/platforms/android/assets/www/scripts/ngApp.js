(function () {

    angular.module('nagarroApp', ['ionic'])
           .config(function ($stateProvider, $urlRouterProvider) {

               $stateProvider
                   .state('signin', {
                       url: '/sign-in',
                       templateUrl: 'templates/login.html',
                       controller: 'SignInController'
                   })
                 .state('mainmenu', {
                     url: "/main",
                     abstract: true,
                     templateUrl: "templates/main-menu.html"
                 })
                 .state('mainmenu.home', {
                     url: "/home",
                     views: {
                         'menuContent': {
                             templateUrl: "templates/home.html"
                         }
                     }
                 })
                .state('mainmenu.settings', {
                    url: "/settings",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/settings.html"
                        }
                    }
                })
               .state('mainmenu.people', {
                   url: "/people",
                   views: {
                       'menuContent': {
                           templateUrl: "templates/people.html"
                       }
                   }
               })
                .state('mainmenu.announcements', {
                    url: "/announcements",
                    cache: false,
                    views: {
                        'menuContent': {
                            templateUrl: "templates/announcements.html",
                            controller: "AnnouncementController"
                        }
                    }
                })
                   .state('mainmenu.detail', {
                       url: "/detail/:id",
                       views: {
                           'menuContent': {
                               templateUrl: "templates/detail.html",
                               controller: "DetailController"
                           }
                       }
                   })
                .state('mainmenu.quora', {
                    url: "/quora",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/quora.html",
                            controller: "QuoraController"
                        }
                    }
                })

               $urlRouterProvider.otherwise("/sign-in");
           });

})();