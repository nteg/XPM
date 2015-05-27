angular.module('interview.services', [])

.factory('userService', function(){

    'use strict';

    var localDb = window.localDB,
        remoteDB = window.remoteDB;

    return {

        signUp: function(username, pwd, callback) {
            remoteDB.signup(username, pwd, callback);
        }

    };
});