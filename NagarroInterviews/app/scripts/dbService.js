angular.module('interview.services')

.service('dbService', ['ENV', 'pouchDB', function(ENV, pouchDB){

    'use strict';

    var localDb = pouchDB(ENV.DB.local.name),
        remoteDB = pouchDB(ENV.DB.remote.url + ENV.DB.remote.name);

    return {

        getLocalDbInstance: function() {
            return localDb;
        }

    };
}]);