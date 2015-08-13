var app = angular.module('ionicApp', ['ionic', 'ngSanitize'])
    
    .directive('viewTitle', function () {
        return {
            restrict: "A",
            link: function (scope, element, attributes) {
                var originalTitle = scope.pagetitle;
                scope.pagetitle = attributes.ViewTitle;
            }
        }
    })

.controller('MainController', function ($scope, $ionicSideMenuDelegate, $http, $stateParams) {

    $scope.toggleProjects = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };



    $scope.changeView = function (name) {
        //console.log(name);
    };

    $scope.getDetails = function (project) {
        $scope.announcement = project;
        console.log($scope.announcement);
    };

    //$scope.menuItems = [{ title: 'Home', id: 1 }, { title: 'Announcement', id: 2 }];

});

app.controller('TodosCtrl', function ($scope, todos) {
    console.log("akjsdnascs");
    console.log(todos);
    $scope.pagetitle = "TODOs";
    $scope.todos = todos
})

app.controller('eventMenuController', function ($rootScope, $scope) {
    console.log("something here");
    console.log($rootScope);
    $scope.pagetitle = "eventemn";
})



app.controller('TodoCtrl', function ($scope, todo) {
    $scope.pagetitle = "TODO";
    $scope.todo = todo
})

//.factory('MenuItems', function () {
//    return {
//        all: function () {
//            var menuItemString = window.localStorage['MenuItems'];
//            if (menuItemString) {
//                return angular.fromJson(menuItemString);
//            }
//            return [];
//        },
//        save: function (projects) {
//            window.localStorage['projects'] = angular.toJson(projects);
//        },

//        getLastActiveIndex: function () {
//            return parseInt(window.localStorage['lastActiveMenuItem']) || 0;
//        },
//        setLastActiveIndex: function (index) {
//            window.localStorage['lastActiveMenuItem'] = index;
//        }
//    }
//})

