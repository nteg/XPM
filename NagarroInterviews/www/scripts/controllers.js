angular.module('interview.controllers', ['interview.services'])

.controller('AppCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicPopup', 'userService', function($scope, $ionicSideMenuDelegate, $ionicPopup, userService) {

    'use strict';

    $scope.isLoggedIn = userService.isLoggedIn();
    $scope.isSignedUp = userService.isSignedUp();

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.showAlert = function(options) {
        var alertPopup = $ionicPopup.alert({
            title: options.title || 'Alert',
            template: options.template || 'It might taste good.'
        });
        alertPopup.then(function(res) {
            // console.log('Thank you for not eating my delicious ice cream cone');
        });
    };

    /*$ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.openPopover = function(options) {
        $scope.popOverOptions = {};
        $scope.popOverOptions.title = options.title || 'Alert';
        $scope.popOverOptions.message = options.message || '';
        $scope.popover.show();
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    // Execute action on hide modal
    $scope.$on('popover.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('popover.removed', function() {
        // Execute action
    });*/
}])

.controller('ProfileCtrl', ['$scope', '$state', 'localStorageService', 'userService', function($scope, $state, localStorageService, userService) {

}])

.controller('SignupCtrl', ['$scope', '$state', 'localStorageService', 'userService', function($scope, $state, localStorageService, userService) {

    'use strict';

    // function to submit the form after all validation has occurred
    $scope.doSignup = function(form) {
        var _this = this;
        $scope.submitted = true;
        $scope.email = '';
        $scope.password = '';

        // check to make sure the form is completely valid
        if (form.$valid) {
            userService.signUp(_this.email, _this.password, function (err, response) {
                if (err) {
                    if (err.name === 'conflict') {
                        // "email" already exists, choose another username
                        $scope.showAlert({
                            title: 'Alert',
                            template: 'This user is already registered!'
                        });
                    } else if (err.name === 'forbidden') {
                        // invalid username
                        $scope.showAlert({
                            title: 'Alert',
                            template: 'This is invalid username.'
                        });
                    } else {
                        $scope.showAlert({
                            title: 'Alert',
                            template: 'Oops! Something went wrong.'
                        });
                    }
                } else if (response && response.ok && response.ok === true) {
                    localStorageService.set('isSignedUp', 1);
                    userService.logIn(_this.email, _this.password, function(err, response) {
                        if (err) {
                            if (err.name === "unauthorized") {
                                $scope.showAlert({
                                    title: 'Alert',
                                    template: 'Incorrect email or password.'
                                });
                            } else {
                                $scope.showAlert({
                                    title: 'Alert',
                                    template: 'Oops! Something went wrong.'
                                });
                            }
                        } else if (response && response.ok && response.ok === true) {
                            localStorageService.set('isLoggedIn', 1);
                            $state.go('profile');
                        }
                    });
                }
            });
        }
    };

}])

.controller('LoginCtrl', ['$scope', '$state', 'localStorageService', 'userService', function($scope, $state, localStorageService, userService) {

    'use strict';

    // function to submit the form after all validation has occurred
    $scope.doLogin = function(form) {
        $scope.submitted = true;
        var _this = this;

        // check to make sure the form is completely valid
        if (form.$valid) {
            userService.logIn(_this.email, _this.password, function(err, response) {
                console.log(err, response);
                if (err) {
                    if (err.name === "unauthorized") {
                        $scope.showAlert({
                            title: 'Alert',
                            template: 'Incorrect email or password.'
                        });
                    } else {
                        $scope.showAlert({
                            title: 'Alert',
                            template: 'Oops! Something went wrong.'
                        });
                    }
                } else if (response && response.ok && response.ok === true) {
                    localStorageService.set('isLoggedIn', 1);
                    localStorageService.set('userInfo', response);
                    $state.go('profile');
                }
            });
        }
    };

}])

.controller('ProfileGeneralCtrl', function($scope) {

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
