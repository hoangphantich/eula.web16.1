/// <binding />
module.exports = function (grunt) {
    'use strict';

    var jit = require('jit-grunt')(grunt);
    var project = require('./Gruntproject.js');
    var helpers = require('./GruntHelpers.js')(false);
    var path = require('path');
    var requireConfig = require('./' + path.join(project.dirs.scripts.main, 'require-config.js'));
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: project,
        assemble: {
            options: {
                layoutdir: '<%= project.dirs.views.layouts %>',
                partials: '<%= project.dirs.views.partials %>/**/*.hbs',
                plugins: ['handlebars-helpers'],
                data: '<%= project.dirs.base %>/data/**/*.json'
            },
            static: {
                options: {
                    layout: 'static.hbs'
                },
                files: [{
                    cwd: '<%= project.dirs.base %>',
                    dest: '<%= project.dirs.static.main %>',
                    expand: true,
                    src: ['index.hbs']
                }]
            },
            views: {
                options: {
                    layout: 'view.hbs'
                },
                files: [{
                    cwd: '<%= project.dirs.views.main %>',
                    dest: '<%= project.dirs.static.views %>',
                    expand: true,
                    src: [
						'*.hbs',
						'!_*'
                    ]
                }]
            },
            partials: {
                options: {
                    layout: 'component.hbs'
                },
                files: [{
                    flatten: true,
                    cwd: '<%= project.dirs.views.partials %>',
                    dest: '<%= project.dirs.static.partials %>',
                    expand: true,
                    src: [
						'**/*.hbs',
						'!**/_*',
						'!**/precompile/**'
                    ]
                }]
            }
        },
        
        autoprefixer: {
            screen: {
                options: {
                    browsers: ['last 2 version']
                },
                src: '<%= project.dirs.styles.out %>/<%= project.stylesheets.screen %>',
                dest: '<%= project.dirs.styles.out %>/<%= project.stylesheets.screen %>'
            }
        },
        
        bowercopy: {
            options: {
                clean: false
            },
            deps: {
                files: {
                    '<%= project.dirs.scripts.bower %>/require.js': 'requirejs/require.js',
                    '<%= project.dirs.scripts.bower %>/velocity.js': 'velocity/velocity.js',
                    '<%= project.dirs.scripts.bower %>/velocity.ui.js': 'velocity/velocity.ui.js',
                    '<%= project.dirs.scripts.bower %>/jquery.form.js': 'jquery-form/jquery.form.js',
                    '<%= project.dirs.scripts.bower %>/jquery.validate.js': 'jquery-validation/dist/jquery.validate.js',
                    '<%= project.dirs.scripts.bower %>/jquery.validate.additional.js': 'jquery-validation/dist/additional-methods.js',
                    '<%= project.dirs.scripts.bower %>/underscore.js': 'underscore/underscore.js',
                    //'<%= project.dirs.scripts.bower %>/handlebars.js': 'handlebars/handlebars.js',
                    //'<%= project.dirs.scripts.bower %>/handlebars-helpers.js': 'handlebars-helpers/src/helpers.js',
                    //'<%= project.dirs.scripts.bower %>/async.js': 'requirejs-plugins/src/async.js',
                    '<%= project.dirs.scripts.bower %>/fastclick.js': 'fastclick/lib/fastclick.js',
                    '<%= project.dirs.scripts.bower %>/backbone.js': 'backbone/backbone.js',
                    '<%= project.dirs.scripts.bower %>/picturefill.js': 'picturefill/src/picturefill.js',
                    '<%= project.dirs.scripts.bower %>/history.js': 'history.js/scripts/bundled-uncompressed/html5/jquery.history.js'
                }
            },
            fallbacks: {
                files: {
                    '<%= project.dirs.scripts.out %>/jquery.js': 'jquery/dist/jquery.js'
                }
            }
        },
        
        sass: {
            options: {
                includePaths: [
					'<%= project.dirs.styles.main %>',
					'<%= project.dirs.styles.partials %>'
                ],
            },
            dev: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= project.dirs.styles.main %>',
                    src: ['*.scss'],
                    dest: '<%= project.dirs.styles.out %>',
                    ext: '.css'
                }]
            },
            deploy: {
                options: {
                    sourceMap: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= project.dirs.styles.main %>',
                    src: ['*.scss'],
                    dest: '<%= project.dirs.styles.out %>',
                    ext: '.css'
                }]
            }
        },
        
        cssmin: {
            all: {
                expand: true,
                cwd: '<%= project.dirs.styles.out %>',
                src: ['**/*.css'],
                dest: '<%= project.dirs.styles.out %>',
                ext: '.css'
            }  
        },
        
        copy: {
            images: {
                expand: true,
                cwd: '<%= project.dirs.images.main %>',
                src: ['**/*.{png,jpg,gif,svg,ico}', '!icons/**', '!sprite/**'],
                dest: '<%= project.dirs.images.out %>'
            },
            fonts: {
                expand: true,
                cwd: '<%= project.dirs.fonts.main %>',
                src: ['**/*{eot,svg,ttf,woff,woff2}'],
                dest: '<%= project.dirs.fonts.out %>'
            },
            videos: {
                expand: true,
                cwd: '<%= project.dirs.videos.main %>',
                src: ['**'],
                dest: '<%= project.dirs.videos.out %>'
            }
        },
        
        requirejs: {
            options: {
                baseUrl: '<%= project.dirs.scripts.main %>',
                mainConfigFile: '<%= project.dirs.scripts.main %>/require-config.js',
                optimize: 'none',
                wrap: true
            },
            deploy: {
                options: {
                    out: '<%= project.dirs.scripts.out %>/scripts.js',
                    name: '../../node_modules/almond/almond',
                    include: ['require-config', 'main'].concat(helpers.getIncludeAliases(helpers.getIncludes(requireConfig, project.dirs.scripts.main))),
                    //include: ['require-config', 'main'],
                    insertRequire: ['main'],
                    paths: {
                        'jquery': 'lib/jquery',
                        'videojs': 'lib/videojs',
                        'moment':'lib/moment'
                    }
                }
            },
            dev: {
                options: {
                    dir: '<%= project.dirs.scripts.out %>',
                    paths: {
                        'jquery': 'empty',
                        //'videojs': 'empty',
                        //'moment': 'empty'
                    }
                }
            }
        },
        
        handlebars: {
            options: {
                amd: ['vendor/handlebars', 'vendor/handlebars-helpers', 'base/modules/handlebars-extension'],
                namespace: false,
                processPartialName: function (filePath) {
                    var pieces = filePath.split("/");
                    return pieces[pieces.length - 1].replace('.hbs', '');
                }
            },
            templates: {
                files: [{
                    flatten: true,
                    cwd: '<%= project.dirs.views.partials %>',
                    dest: '<%= project.dirs.scripts.templates %>',
                    expand: true,
                    src: ['**/precompile/*.hbs'],
                    ext: '.js'
                }]
            }
        },
        
        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                preserveComments: false
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= project.dirs.scripts.out %>',
                    src: ['**/*.js'],
                    dest: '<%= project.dirs.scripts.out %>',
                    ext: '.js'
                }]
            }
        },
        
        clean: {
            static: ['<%= project.dirs.static.main %>/*'],
            styles: ['<%= project.dirs.styles.out %>/*'],
            images: ['<%= project.dirs.images.out %>/*'],
            scripts: ['<%= project.dirs.scripts.out %>/**/*'],
            templates: ['<%= project.dirs.scripts.templates %>/*'],
            fonts: ['<%= project.dirs.fonts.out %>/*']
            //videos: ['<%= project.dirs.videos.out %>/*']
        },
        
        watch: {
            options: {
                interrupt: true,
                interval: parseInt('<%= project.options.watchInterval %>')
            },
            static: {
                files: [
                	'<%= project.dirs.base %>/**/*.hbs',
                    '<%= project.dirs.static.data %>/**/*.json'
                ],
                tasks: ['static']
            },
            styles: {
                files: [
					'<%= project.dirs.styles.main %>/**/*.scss',
					'<%= project.dirs.styles.partials %>/**/*.scss'
                ],
                tasks: ['css']
            },
            scripts: {
                files: [
					'<%= project.dirs.scripts.main %>/**/*.js',
					'!<%= project.dirs.scripts.lib %>/**'
                ],
                tasks: ['js']
            },
            images: {
                files: [
					'<%= project.dirs.images.main %>/**/*'
                ],
                tasks: ['img']
            }
        }
    });
    
    // CSS Tasks
    grunt.registerTask('css', ["sass:dev"]);

    // JavaScript Tasks
    grunt.registerTask('js', ["handlebars", "requirejs:dev"]);

    // Image Tasks
    grunt.registerTask('img', ["copy"]);

    // Static Tasks
    grunt.registerTask('static', ['assemble']);


    grunt.registerTask('install', ["bowercopy:deps"]);
    
    grunt.registerTask('deployjs', ["requirejs:deploy", "uglify"]);
    grunt.registerTask('deploycss', ["cssmin"]);

    //grunt.registerTask('build', ['clean', 'assemble', "sass:dev", "cssmin", "requirejs:dev", "copy","watch"]);
    grunt.registerTask('build', ['clean', 'static', "css", "js", "copy"]);

    // default task when calling "grunt" => call task build
    grunt.registerTask('default', ['build']);

    grunt.registerTask('deploy', ['deployjs', 'deploycss']);
};