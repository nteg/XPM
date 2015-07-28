angular.module('interview.services', [])

.factory('userService', ['localStorageService', 'dbService', function(localStorageService, dbService){

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

        createUser: function(data) {
            if (data && !data._id && data.email) {
                data._id = data.email;
            }
            return dbService.getLocalDbInstance().put(data);
        },

        getCurrentUser: function() {
            return dbService.getLocalDbInstance().get('test@test.com');
        },

        isSignedUp: function() {
            return localStorageService.get('isSignedUp');
        },

        isLoggedIn: function() {
            return localStorageService.get('isLoggedIn');
        },

        saveProfileGen: function(data) {
            console.log(data)
            if (data && !data._id && data.email) {
                data._id = data.email;
            }
            return dbService.getLocalDbInstance().post(data);
        }

    };
}]);