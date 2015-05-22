angular.module('interview.controllers', [])

.controller('ProfileCtrl', function($scope, $ionicSideMenuDelegate) {

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.topNav = 'templates/topNav.html';

})

.controller('ProfileGeneralCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.profileData = {
    firstName: 'Arvind',
    lastName: 'Bhardwaj',
    email: 'bhardwajsonheight@gmail.com',
    experience: {
      years: 5,
      months: 2
    }
  };

})

.controller('ProfileProffCtrl', function($scope, $ionicSideMenuDelegate) {

})

.controller('ProfileSkillsCtrl', function($scope, $ionicSideMenuDelegate) {

})
;
