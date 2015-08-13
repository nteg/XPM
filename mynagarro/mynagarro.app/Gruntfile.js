module.exports = function (grunt) {

    // project configuration
    grunt.initConfig({
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/ionic/release/',
                    src: ['**'],
                    dest: 'www/bower_components/ionic'
                },
                {
                    expand: true,
                    cwd: 'bower_components/ionicons/',
                    src: ['css', 'fonts'],
                    dest: 'www/bower_components/ionicons'
                },
                {
                    expand: true,
                    cwd: 'bower_components/ngCordova/',
                    src: ['dist/**'],
                    dest: 'www/bower_components/ngCordova'
                },
                {
                    expand: true,
                    cwd: 'node_modules/ngstorage/',
                    src: ['**'],
                    dest: 'www/node_modules/ngstorage'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['copy']);

};