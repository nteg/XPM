app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('eventmenu', {
          url: "/event",
          abstract: true,
          templateUrl: "templates/event-menu.html",
          controller: 'eventMenuController'
      })
      .state('eventmenu.home', {
          url: "/home",
          views: {
              'menuContent': {
                  templateUrl: "templates/home.html",
                  controller: 'HomeController'
              }
          },
          controller: function ($stateParams) {
              console.log("stateparams=>");
              console.log($stateParams);
          }
      })
      .state('eventmenu.notification', {
          url: "/notification",
          cache: false,
          views: {
              'menuContent': {
                  templateUrl: "templates/notification.html",
                  controller: "NotificationController",
                  resolve: {
                      notifications: function ($stateParams, NotificationService) {
                          return NotificationService.getNotificationsAsync();
                      }
                  }
              }
          }
      })
      .state('eventmenu.attendees', {
          url: "/attendees",
          views: {
              'menuContent': {
                  templateUrl: "templates/attendees.html",
                  controller: 'TodosCtrl',
                  resolve: {
                      todos: function (TodosService) {
                          return TodosService.getTodos()
                      }
                  }
              }
          }
      })
      .state('todo', {
          url: '/todos/:todoId',
          controller: 'TodoCtrl',
          templateUrl: 'templates/todo.html',
          resolve: {
              todo: function ($stateParams, TodosService) {
                  return TodosService.getTodo($stateParams.todoId)
              }
          }
      })
     .state('eventmenu.details', {
         url: "/details/:id",
         cache: false,
         resolve: {
             details: function ($stateParams, NotificationService) {
                 return NotificationService.getDetails($stateParams.id)
             }
         },
         views: {
             'menuContent': {
                 templateUrl: "templates/details.html",
                 controller: 'DetailsController',
             }
         }
     })

    $urlRouterProvider.otherwise("/event/home");
})