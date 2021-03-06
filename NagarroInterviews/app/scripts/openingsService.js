angular.module('interview.services')

.factory('openingsService', ['$q', 'localStorageService', 'dbService', function($q, localStorageService, dbService){

    'use strict';

    var TYPE = 'opening',
        VIEW = 'openings';

    return {

        getAllOpenings: function() {
            var dfd = $q.defer();
            dbService.getLocalDbInstance().query(VIEW).then(function(res) {
                dfd.resolve(res);
            }, function(res) {
                dfd.reject(res);
            });
            return dfd.promise;
        }

    };

}]);
