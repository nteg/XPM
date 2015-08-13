//var app = angular.module('ionicApp', []);
angular.module('ionicApp', ['ionic'])
    .factory('Projects', function () {
        return {
            all: function () {
                var projectString = window.localStorage['projects'];
                if (projectString) {
                    return angular.fromJson(projectString);
                }
                return [];
            },
            save: function (projects) {
                window.localStorage['projects'] = angular.toJson(projects);
            },
            newProject: function (projectTitle) {
                // Add a new project
                return {
                    title: projectTitle,
                    tasks: []
                };
            },
            getLastActiveIndex: function () {
                return parseInt(window.localStorage['lastActiveProject']) || 0;
            },
            setLastActiveIndex: function (index) {
                window.localStorage['lastActiveProject'] = index;
            }
        }
    })



.controller('TodoCtrl', function ($scope, $ionicModal, $timeout, Projects, $ionicSideMenuDelegate) {
    $scope.data = {
        showDelete: false
    };

    $scope.edit = function (item) {
        alert('Edit Item: ' + item.id);
    };
    $scope.share = function (item) {
        alert('Share Item: ' + item.id);
    };

    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    $scope.onItemDelete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.items = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
      { id: 16 },
      { id: 17 },
      { id: 18 },
      { id: 19 },
      { id: 20 },
      { id: 21 },
      { id: 22 },
      { id: 23 },
      { id: 24 },
      { id: 25 },
      { id: 26 },
      { id: 27 },
      { id: 28 },
      { id: 29 },
      { id: 30 },
      { id: 31 },
      { id: 32 },
      { id: 33 },
      { id: 34 },
      { id: 35 },
      { id: 36 },
      { id: 37 },
      { id: 38 },
      { id: 39 },
      { id: 40 },
      { id: 41 },
      { id: 42 },
      { id: 43 },
      { id: 44 },
      { id: 45 },
      { id: 46 },
      { id: 47 },
      { id: 48 },
      { id: 49 },
      { id: 50 }
    ];
    // no need for testing data anymore
    $scope.tasks = [];

     //create and load the modal
        // Create and load the Modal
        $ionicModal.fromTemplateUrl('new-task.html', function (modal) {
            $scope.taskModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });


    // A utility function for creating a new project
    // with the given projectTitle
    var createProject = function (projectTitle) {
        var newProject = Projects.newProject(projectTitle);
        $scope.projects.push(newProject);
        Projects.save($scope.projects);
        $scope.selectProject(newProject, $scope.projects.length - 1);
    }


    // Load or initialize projects
    $scope.projects = Projects.all();

    // Grab the last active, or the first project
    $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

    // Called to create a new project
    $scope.newProject = function () {
        var projectTitle = "title"; //prompt('Project name');
        if (projectTitle) {
            createProject(projectTitle);
        }
    };

    // Called to select the given project
    $scope.selectProject = function (project, index) {
        $scope.activeProject = project;
        Projects.setLastActiveIndex(index);
        $ionicSideMenuDelegate.toggleLeft(false);
    };

    // Create our modal
    $ionicModal.fromTemplateUrl('new-task.html', function (modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope
    });


    $scope.createTask = function (task) {
        if (!$scope.activeProject || !task) {
            return;
        }
        $scope.activeProject.tasks.push({
            title: task.title
        });
        $scope.taskModal.hide();

        // Inefficient, but save all the projects
        Projects.save($scope.projects);

        task.title = "";
    };

    $scope.newTask = function () {
        $scope.taskModal.show();
    };

    $scope.closeNewTask = function () {
        $scope.taskModal.hide();
    }

    $scope.toggleProjects = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };


    // Try to create the first project, make sure to defer
    // this by using $timeout so everything is initialized
    // properly
    $timeout(function () {
        if ($scope.projects.length == 0) {
            while (true) {
                var projectTitle = prompt('Your first project title:');
                if (projectTitle) {
                    createProject(projectTitle);
                    break;
                }
            }
        }
    });

});

////.controller('TodoCtrl', function ($scope, $ionicModal) {
////    // No need for testing data anymore
////    $scope.tasks = [];

////    // Create and load the Modal
////    $ionicModal.fromTemplateUrl('new-task.html', function (modal) {
////        $scope.taskModal = modal;
////    }, {
////        scope: $scope,
////        animation: 'slide-in-up'
////    });

////    // Called when the form is submitted
////    $scope.createTask = function (task) {
////        $scope.tasks.push({
////            title: task.title
////        });
////        $scope.taskModal.hide();
////        task.title = "";
////    };

////    // Open our new task modal
////    $scope.newTask = function () {
////        $scope.taskModal.show();
////    };

////    // Close the new task modal
////    $scope.closeNewTask = function () {
////        $scope.taskModal.hide();
////    };
////});

//.controller('TodoCtrl', function ($scope) {
//    $scope.tasks = [
//      { title: 'Collect coins' },
//      { title: 'Eat mushrooms' },
//      { title: 'Get high enough to grab the flag' },
//      { title: 'Find the Princess' }
//    ];
//});
