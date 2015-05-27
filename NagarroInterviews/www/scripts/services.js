angular.module('interview.services', [])

.service('userFactory', function(){

    'use strict';

    return {
        hello: function() {
            return "Hello World";
        }
    };
});