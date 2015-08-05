angular.module('interview.controllers', ['interview.services'])

.controller('AppCtrl', ['$rootScope', '$scope', '$ionicSideMenuDelegate', '$state', '$ionicPopup', 'userService', function($rootScope, $scope, $ionicSideMenuDelegate, $state, $ionicPopup, userService) {

    'use strict';

    $scope.isLoggedIn = userService.isLoggedIn();
    $scope.isSignedUp = userService.isSignedUp();

    $scope.system = {};
    $scope.system.platform = 'ios';

    $scope.theme = {
        name: 'positive',
        header: {
            name: 'positive',
            button: {
                name: 'positive'
            }
        },
        sidebar: {
            header: {
                name: 'calm',
                button: {
                    name: 'calm'
                }
            }
        },
        showPadding: false
    };

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

    $scope.logOut = function() {
        userService.logOut(function (err, response) {
            if (err) {
                $scope.showAlert({
                    title: 'Alert',
                    template: 'Oops! Something went wrong.'
                });
            } else if (response && response.ok && response.ok === true) {
                $scope.$emit('logoutAfter', {});
                $state.go('login');
            }
        });
    };

    /**
     * Global events
     */
    $scope.$on('signupAfter', function(event, data) {
        $scope.isSignedUp = true;
    });

    $scope.$on('loginAfter', function(event, data) {
        $scope.isLoggedIn = true;
    });

    $scope.$on('logoutAfter', function(event, data) {
        $scope.isLoggedIn = false;
    });

    $rootScope.$on('db:change', function(e, data) {
        $scope.$broadcast('db:change', data);
    });


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
                    $scope.$emit('signupAfter', {userInfo: response});

                    userService.createUser({email: _this.email}).then(function(res) {
                        if (res.ok) {
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
                                    $scope.$emit('loginAfter', {userInfo: response});
                                    $state.go('profile');
                                }
                            });
                        } else {
                            $scope.showAlert({
                                title: 'Alert',
                                template: 'Oops! Something went wrong.'
                            });
                        }
                    }, function(err) {
                        $scope.showAlert({
                            title: 'Alert',
                            template: 'Oops! Something went wrong.'
                        });
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
                    $scope.$emit('loginAfter', {userInfo: response});
                    $state.go('profile');
                }
            });
        }
    };

}])

.controller('ChpwdCtrl', ['$scope', '$state', 'localStorageService', 'userService', function($scope, $state, localStorageService, userService) {

    'use strict';

    // function to submit the form after all validation has occurred
    $scope.chPwd = function(form) {
        var _this = this;

        // check to make sure the form is completely valid
        if (form.$valid) {
            userService.changePassword(userService.getCurrentUserId(), _this.newpassword, function(err, response) {
                console.log(err, response);
                if (err) {
                    if (err.name === 'not_found') {
                        $scope.showAlert({
                            title: 'Alert',
                            template: 'You are not authorized to do this.'
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

.controller('ProfileGeneralCtrl', ['$scope', '$state', 'userService', function($scope, $state, userService) {

    $scope.profileData = {};
    $scope.progress = false;

    // Update the profile data when the database is changed
    $scope.$on('db:change', function(e, info) {
        if (info.data.direction === 'pull') {
            $scope.setProfileData();
        }
    });

    $scope.setProfileData = function() {
        userService.getCurrentUser().then(function(res) {
            $scope.profileData = angular.extend($scope.profileData, res);
        }, function(res) {
            $scope.profileData.email = userService.getCurrentUserId();
        });
    };

    $scope.saveProfGen = function(form) {
        var _this = this;
        $scope.progress = !$scope.progress;

        // check to make sure the form is completely valid
        if (form.$valid) {
            $scope.profileData = angular.extend($scope.profileData, _this.profileData);
            var promise = userService.saveProfile($scope.profileData);
            promise.then(function(res) {
                console.log(res);
                if (!res.ok) {
                }
            }).finally(function() {
                $scope.progress = !$scope.progress;
            });
        }
    };

    // Get user profile data
    $scope.setProfileData();

}])

.controller('ProfileProffCtrl', ['$scope', '$state', 'userService', function($scope, $state, userService) {
    $scope.profileData = {};
    $scope.progress = false;

    // Update the profile data when the database is changed
    $scope.$on('db:change', function(e, info) {
        if (info.data.direction === 'pull') {
            $scope.setProfileData();
        }
    });

    $scope.setProfileData = function() {
        userService.getCurrentUser().then(function(res) {
            $scope.profileData = angular.extend($scope.profileData, res);
        }, function(res) {
            $scope.profileData.email = userService.getCurrentUserId();
        });
    };

    $scope.saveProfProf = function(form) {
        var _this = this;
        $scope.progress = !$scope.progress;

        // check to make sure the form is completely valid
        if (form.$valid) {
            $scope.profileData = angular.extend($scope.profileData, _this.profileData);
            var promise = userService.saveProfile($scope.profileData);
            promise.then(function(res) {
            }).finally(function() {
                $scope.progress = !$scope.progress;
            });
        }
    };

    // Get user profile data
    $scope.setProfileData();

}])

.controller('ProfileSkillsCtrl', ['$rootScope', '$scope', '$state', 'userService', function($rootScope, $scope, $state, userService) {
    $scope.profileData = {};
    $scope.profileData.skills = [];
    $scope.profileData.newSkill = "";

    $scope.progress = false;
    
    // We should set the shouldShowDelete on rootScope otherwise
    // it will not be available in the <ion-content>
    $rootScope.shouldShowDelete = false;

    // Update the profile data when the database is changed
    $scope.$on('db:change', function(e, info) {
        if (info.data.direction === 'pull') {
            $scope.setProfileData();
        }
    });

    $scope.setProfileData = function() {
        userService.getCurrentUser().then(function(res) {
            $scope.profileData = angular.extend($scope.profileData, res);
        }, function(res) {
            $scope.profileData.email = userService.getCurrentUserId();
        });
    };

    $scope.saveProf = function(form) {
        var _this = this;
        $scope.progress = !$scope.progress;

        // check to make sure the form is completely valid
        if (form.$valid) {
            $scope.profileData = angular.extend($scope.profileData, _this.profileData);
            console.log($scope.profileData)
            var promise = userService.saveProfile($scope.profileData);
            promise.then(function(res) {
                console.log(res);
                if (!res.ok) {
                }
            }).finally(function() {
                $scope.progress = !$scope.progress;
            });
        }
    };

    $scope.addSkill = function() {
        if ($scope.profileData.newSkill) {
            var newSkill = $scope.profileData.newSkill;
            $scope.profileData.skills.push(newSkill);
        }
        $scope.profileData.newSkill = "";
    };

    $scope.onItemDelete = function(item) {
        $scope.profileData.skills.splice($scope.profileData.skills.indexOf(item), 1);
    };

    // Get user profile data
    $scope.setProfileData();

}])

.controller('OpeningsCtrl', ['$scope', '$state', 'openingsService', function($scope, $state, openingsService) {
    $scope.data = {};
    $scope.data.openings = {};

    openingsService.getAllOpenings().then(function(res) {
        $scope.data.openings = angular.extend($scope.data.openings, res.rows);
    }, function() {

    });

}])

.controller('OpeningDetailCtrl', ['$scope', '$state', 'openingsService', function($scope, $state, openingsService) {
    $scope.opening = {};

    var openingId = $state.params.openingId;

    $scope.getOpeningDetails = function() {
        if (openingId) {
            openingsService.getOpeningById(openingId).then(function(res) {
                $scope.opening = angular.extend($scope.opening, res);
            }, function() {

            });
        }
    };

    $scope.getOpeningDetails();

}])
;
