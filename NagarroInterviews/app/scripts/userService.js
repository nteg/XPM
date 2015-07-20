angular.module('interview.services', [])

.factory('userService', ['localStorageService', function(localStorageService){

    'use strict';

    var localDb = window.localDB,
        remoteDB = window.remoteDB;

    return {

        signUp: function(username, pwd, callback) {
            remoteDB.signup(username, pwd, callback);
        },

        logIn: function(username, pwd, callback) {
            remoteDB.login(username, pwd, callback);
        },

        logOut: function(callback) {
            localStorageService.remove('isLoggedIn', 'userInfo', 'isSignedUp');
            remoteDB.logout(callback);
        },

        getCurrentUser: function() {
            return localStorageService.get('userInfo');
        },

        isSignedUp: function() {
            return localStorageService.get('isSignedUp');
        },

        isLoggedIn: function() {
            return localStorageService.get('isLoggedIn');
        }

    };
}]);