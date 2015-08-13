(function () {
    angular.module('nagarroApp')
          .controller('MainController', function ($scope, $ionicSideMenuDelegate, $state) {

              $scope.toggleLeft = function () {
                  $ionicSideMenuDelegate.toggleLeft();
              };
              $scope.create = function (stateName) {
                  $state.go(stateName);
              };

          });

})();