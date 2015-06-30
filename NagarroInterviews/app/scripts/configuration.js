"use strict";

 angular.module('config', [])

.constant('ENV', {
    remoteDbName: 'naginterviews',
    remoteDbUrl: 'http://localhost:5984/',
    localDbName: 'naginterviews'
})

;