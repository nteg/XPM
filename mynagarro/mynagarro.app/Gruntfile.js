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
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['copy']);

};