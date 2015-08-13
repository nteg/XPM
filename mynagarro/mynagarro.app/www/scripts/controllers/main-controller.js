(function () {
    angular.module('nagarroApp')
          .controller('MainController', function ($scope, $ionicSideMenuDelegate, $ionicHistory, $state) {

              $scope.toggleLeft = function () {
                  $ionicSideMenuDelegate.toggleLeft();
              };
              $scope.create = function (stateName) {

                  $ionicHistory.nextViewOptions({
                      disableBack: false
                  });

                  if (stateName == 'mainmenu.home') {
                      $ionicHistory.nextViewOptions({
                          disableBack: true
                      });
                  }
                  
                  $state.go(stateName);
              };

          });

})();