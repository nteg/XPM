angular.module('interview.services', [])

.factory('userService', ['$q', 'localStorageService', 'dbService', function($q, localStorageService, dbService){

    'use strict';

    var localDb = window.localDB,
        remoteDB = window.remoteDB,
        TYPE_PROFILE = 'profile';

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

        getCurrentUserId: function() {
            var userData = localStorageService.get('userInfo');
            return userData.name;
        },

        changePassword: function(username, pwd, callback) {
            remoteDB.changePassword(username, pwd, callback);
        },

        getCurrentUser: function() {
            var dfd = $q.defer();
            var username = this.getCurrentUserId();
            if (!username) {
                dfd.reject({name:'not_found', message: 'User not found.'});
            } else {
                dbService.getLocalDbInstance().get(username).then(function(res) {
                    dfd.resolve(res);
                }, function(res) {
                    dfd.reject(res);
                });
            }
            return dfd.promise;
        },

        isSignedUp: function() {
            return localStorageService.get('isSignedUp');
        },

        isLoggedIn: function() {
            return localStorageService.get('isLoggedIn');
        },

        saveProfile: function(data) {
            if (data && !data._id && data.email) {
                data._id = data.email;
            }
            data.type = TYPE_PROFILE;
            return dbService.getLocalDbInstance().post(data);
        }

    };
}]);