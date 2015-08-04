angular.module('interview.services')

.service('dbService', ['$rootScope', 'ENV', 'pouchDB', function($rootScope, ENV, pouchDB){

    'use strict';

    var localDb = pouchDB(ENV.DB.local.name),
        remoteDB = pouchDB(ENV.DB.remote.url + ENV.DB.remote.name);

    function sync() {
	    var opts = {
	        	live: true,
	        	retry: true
	        };
	    	// sync = pouchDB.sync(localDb, remoteDB, opts);

		/*sync.$promise
			.then(null, null, function(data) {
				console.log(data);
				$scope.$emit('update', {data: data});
			})
			.then(function(data) {
				console.log(data);
			})
			.catch(function() {

			});*/

		var sync = PouchDB.sync(ENV.DB.local.name, ENV.DB.remote.url + ENV.DB.remote.name, opts)
		sync
			.on('change', function (info) {
				console.log(info);
				$rootScope.$emit('db:change', {data: info});
			}).on('paused', function () {
			// replication paused (e.g. user went offline)
			}).on('active', function () {
			// replicate resumed (e.g. user went back online)
			}).on('denied', function (info) {
			// a document failed to replicate, e.g. due to permissions
			}).on('complete', function (info) {
				console.log(info);
			// handle complete
			}).on('error', function (err) {
			// handle error
			});
		return sync;
    }
    sync();


    return {

        getLocalDbInstance: function() {
            return localDb;
        },

        sync: function() {
        	return this.sync();
        }

    };
}]);
