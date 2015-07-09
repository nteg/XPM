"use strict";

 angular.module('config', [])

.constant('ENV', {name:'development',url:'http://localhost:5984/test/'})
.constant('DB', {
	local: {
		name: 'nagInterviews'
	},
	remote: {
		name :'nagInterviews',
		url:'http://localhost:5984/'
	}
});
