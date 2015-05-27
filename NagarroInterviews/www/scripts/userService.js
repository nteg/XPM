angular.module('interview.services', [])

.factory('userService', function(){

    'use strict';

    var localDb = window.localDB,
        remoteDB = window.remoteDB;

    return {

        signUp: function(username, pwd, callback) {
           // remoteDB.signup(username, pwd, callback);
            var todo = {
            _id: new Date().toISOString(),
            username: username,
            password: pwd
       		 };
        remoteDB.put(todo, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a todo!');
            }
        });
        }

    };
});