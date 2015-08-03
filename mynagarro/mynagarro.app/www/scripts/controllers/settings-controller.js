(function () {

    "use strict";

    angular.module('nagarroApp')
          .controller('SettingsController', function ($scope, $ionicSideMenuDelegate, $ionicHistory, $state, $localStorage) {

              $scope.pushNotification = { checked: true };

              $scope.pushNotificationChange = function () {

                  console.log($localStorage);

                  console.log('Push Notification Change', $scope.pushNotification.checked);
                  console.log(angular.fromJson(window.localStorage['deviceDetails']));
                  var deviceDetails = angular.fromJson(window.localStorage['deviceDetails']);
                  switch (deviceDetails.platform.toLowerCase()) {
                      case 'windows':
                          console.log('Its Windows');
                          break;
                      case 'android':
                          console.log('Its Android');
                          break;
                      default:
                          console.log('Dont know');
                  }

              };

          });

})();