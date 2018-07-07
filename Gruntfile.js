module.exports = function (grunt) {
    'use strict';
    var serveStatic = require('serve-static');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {

            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                hostname: 'localhost'
            },

            //[2] Arbitrarily named target
            development: {
                // Target options, overrides task options
                options: {
                    middleware: function () {
                        return [
                            serveStatic('app')
                        ];
                    }
                }
            }
        },
        jshint: {
            // define the files to lint
            files: ['app/*.js', 'app/js/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                jshintrc: '.jshintrc'
            }
        },
        // Configuring the 'watch' task from 'grunt-contrib-watch'
        watch: {
            options: {
                livereload: '<%= connect.options.livereload %>',
            },
            js: {
                files: ['app/*.js'],
                tasks: ['jshint']
            },
            html: {
                files: ['app/html/*.html']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

  // Default Task
grunt.registerTask('default', ['connect:development', 'watch']);

};