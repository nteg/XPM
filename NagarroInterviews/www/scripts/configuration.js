'use strict';

angular.module('config', [])
.constant('ENV', {
    localDbName: 'naginterviews',
    remoteDbUrl: 'http://localhost:5984/',
    remoteDbName: 'naginterviews'
});