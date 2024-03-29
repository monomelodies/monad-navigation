
const sass = require('node-sass');

module.exports = function (grunt) {

    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({pkg});

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.config('ngtemplates', {
        'monad.navigation.templates': {
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: false,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                standalone: true,
                prefix: 'Monad/Navigation/'
            },
            cwd: 'src',
            src: ['**/*.html', '!index.html'],
            dest: 'lib/template.js'
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.config('sass', {
        monad: {
            options: {
                style: 'compressed',
                implementation: sass,
                sourcemap: 'none'
            },
            files: {'dist/monad-navigation.css': 'src/style.scss'}
        }
    });

    grunt.loadNpmTasks('@lodder/grunt-postcss');
    grunt.config('postcss', {
        options: {
            map: {
                inline: false,
                annotation: 'dist/maps/'
            },
            processors: [
                require('autoprefixer')(),
                require('postcss-preset-env')(),
                require('precss')(),
                require('cssnano')()
            ]
        },
        dist: {
            src: 'dist/monad-navigation.css'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
        lib: {
            files: ['src/**/*.js'],
            tasks: ['shell:lib']
        },
        sass: {
            files: ['src/_sass/**/*.scss'],
            tasks: ['sass']
        },
        templates: {
            files: ['src/**/*.html'],
            tasks: ['ngtemplates']
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.config('browserify', {
        monad: {
            src: 'src/index.js',
            dest: 'dist/monad-navigation.js',
            options: {
                transform: ['babelify'],
                standalone: 'monad',
                watch: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.config('shell', {
        lib: { command: 'node_modules/.bin/babel src --out-dir lib' },
        clean: { command: 'rm -rf dist/* && rm -rf lib/*' }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.config('uglify', {
        js: {
            src: 'dist/monad-navigation.js',
            dest: 'dist/monad-navigation.min.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
        lib: {
            files: ['src/**/*.js'],
            tasks: ['shell:lib']
        },
        sass: {
            files: ['src/style.scss'],
            tasks: ['sass']
        },
        templates: {
            files: ['src/**/*.html'],
            tasks: ['ngtemplates']
        }
    });

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['sass', 'postcss', 'ngtemplates', 'shell:lib', 'browserify']);
    grunt.registerTask('dev', ['build', 'watch']);
    grunt.registerTask('prod', ['shell:clean', 'build', 'uglify']);
};

