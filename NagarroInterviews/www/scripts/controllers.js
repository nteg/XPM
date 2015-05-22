angular.module('interview.controllers', [])

.controller('TabsCtrl', function($scope, $ionicSideMenuDelegate) {

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

})

.controller('HomeTabCtrl', function($scope, $ionicSideMenuDelegate) {

})

.controller('AboutCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }
});
