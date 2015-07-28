"use strict";

 angular.module('config', [])
 .constant('ENV', {name:'development',apiEndpoint:'http://dev.yoursite.com:10000/',DB:{local:{name:'yourLocalDBName'},remote:{name:'yourDBName',url:'http://localhost:5984/'}}})

//This Constant is already configured in gruntfile.js as given below, If we change gruntfile.js
//then we dont need to provide actual db here in the configuration
/*ngconstant: {
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
        dest: '<%= yeoman.app %>/<%= yeoman.scripts %>/configuration.js'
      },
      development: {
        constants: {
          ENV: {
            name: 'development',
            apiEndpoint: 'http://dev.yoursite.com:10000/',
            DB: {
              local: {
                name: 'nagInterviews'
              },
              remote: {
                name :'naginterviews',
                url:'http://localhost:5984/'
              }
            }
          }
        }
      },
      production: {
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://api.yoursite.com/'
          }
        }
      }
    },*/

;