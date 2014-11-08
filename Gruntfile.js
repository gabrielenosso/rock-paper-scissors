module.exports = function (grunt) {
    // Source JavaScript files (with dependency order)
    var srcJsFiles = [
        'src/js/modules/utils.js',
        'src/js/modules/game.js',
        'src/js/modules/ai.js',
        'src/js/modules/ui.js',
        'src/js/modules/animations.js',
        'src/js/modules/events.js',
        'src/js/modules/handlers.js',
        'src/js/modules/compatibility.js',
        'src/js/app.js'
    ];

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dist: {
                files: {
                    'dist/css/style.css': ['src/css/style.less']
                }
            }
        },
        csslint: {
            options: {
                ids: false,
                'box-model': false,
                'vendor-prefix': false
            },
            src: ['dist/css/style.css']
        },
        jshint: {
            src: ['src/js/**/*.js', '!src/js/lib/*.js']
        },
        concat: {
            dist: {
                files: {
                    'dist/js/rps.js': srcJsFiles
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/css/style.css': ['dist/css/style.css']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/rps.js': ['dist/js/rps.js']
                }
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: '**/*.{png,jpg,gif}',
                    dest: 'dist/img'
                }]
            }
        },  
        jasmine: {
            src: srcJsFiles,
            options: {
                specs: 'test/jasmine/spec/*.spec.js'
            }
        },
        connect: {
            // Server address: localhost:8000
            src: {
                options: {
                    base: 'src',
                    livereload: true
                } 
            },
            dist: {
                options: {
                    base: 'dist',
                    livereload: true
                } 
            }
        },
        watch: {
            src: {
                files: ['src/**/*.*'],
                options: {
                    livereload: true
                }
            },
            dist: {
                files: ['dist/**/*.*'],
                options: {
                    livereload: true
                }
            }
            
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Tasks
    grunt.registerTask('default', ['less:dist', 'csslint', 'jshint']);
    grunt.registerTask('build',   ['less:dist', 'csslint', 'jshint', 'concat:dist', 'cssmin:dist', 'uglify:dist', 'imagemin:dist']);
    grunt.registerTask('test',    ['jasmine']);
    grunt.registerTask('dev',     ['connect:src',  'watch:src']);
    grunt.registerTask('dist',    ['connect:dist', 'watch:dist']);
};