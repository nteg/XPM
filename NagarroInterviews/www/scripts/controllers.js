angular.module('interview.controllers', ['interview.services'])

.controller('AppCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicPopup', 'userService','localStorageService', function($scope, $ionicSideMenuDelegate, $ionicPopup, userService,localStorageService) {

localStorageService.set("LOGIN_SUCCESS",false);
    'use strict';
    if(localStorageService.isSupported) {
    //...
    console.log("chal raha hai");
    }

  $scope.getItem=function (key) {
   return localStorageService.get(key);
  }
  $scope.logOut=function () {
   return localStorageService.set("LOGIN_SUCCESS",false);
  }
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

.controller('ProfileCtrl', ['$scope', 'userService', function($scope, userService) {

}])

.controller('SignupCtrl', ['$scope', '$state', 'userService', function($scope, $state, userService) {

    'use strict';

    // console.log(userService);

    // function to submit the form after all validation has occurred
    $scope.doSignup = function(form) {
        var _this = this;
        $scope.submitted = true;
        $scope.email = '';
        $scope.password = '';

        // check to make sure the form is completely valid
        if (form.$valid) {
            userService.signUp(_this.email, _this.password, function (err, response) {
                console.log(err, response);
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
                    $state.go('profile');
                }
            });
        }
    };

}])

.controller('LoginCtrl', ['$scope', '$state', 'userService','$ionicHistory','localStorageService', function($scope, $state, userService,$ionicHistory,localStorageService) {

    'use strict';
    console.log(userService);
    $scope.signUp = function() {
        $state.go('signup');
        $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
    };

   
    // function to submit the form after all validation has occurred
    $scope.doLogin = function(isValid) {
        var _this = this;
        $scope.submitted = true;
        $scope.email = '';
        $scope.password = '';

        
        // check to make sure the form is completely valid
        if (isValid) {
            userService.login(_this.email, _this.password, function (err, response) {
                console.log(err, response);
                if (err) {
                    if (err.name === 'unauthorized') {
                        // "email" already exists, choose another username
                        $scope.showAlert({
                            title: 'Alert',
                            template: 'Username or password incorrect!'
                        });
                    }else {
                        $scope.showAlert({
                            title: 'Alert',
                            template: 'Oops! Something went wrong.'
                        });
                    }
                } else if (response && response.ok && response.ok === true) {
                    
                     localStorageService.set('EMAIL',_this.email);
                     localStorageService.set('LOGIN_SUCCESS',true);

                    
                    $state.go('profile');
                    $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
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
