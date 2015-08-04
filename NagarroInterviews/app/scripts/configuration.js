"use strict";

 angular.module('config', [])

.constant('ENV', {name:'development',apiEndpoint:'http://dev.yoursite.com:10000/',DB:{local:{name:'nagInterviews'},remote:{name:'naginterviews',url:'http://localhost:5984/'}}})

;