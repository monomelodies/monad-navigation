
module.exports = function (grunt) {

    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({pkg: pkg});

    grunt.loadNpmTasks('grunt-angular-gettext');
    grunt.config('nggettext_extract', {
        pot: {
            files: {
                'Locale/template.pot': ['src/**/*.{js,html}', 'index.html']
            }
        },
    });
    grunt.config('nggettext_compile', {
        all: {
            files: {'i18n.js': ['Locale/*.po']}
        }
    });

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
            dest: 'es5/template.js'
        }
    });

    /*
    grunt.loadNpmTasks('grunt-sass');
    grunt.config('sass', {
        monad: {
            options: {
                outputStyle: 'compressed',
                compass: true,
                sourcemap: 'none'
            },
            files: {'dist/admin.css': 'src/_sass/default.scss'}
        }
    });
    */

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
        gettext_extract: {
            files: ['src/**/*.{js,html}', 'index.html'],
            tasks: ['nggettext_extract']
        },
        gettext_compile: {
            files: ['Locale/*.po'],
            tasks: ['nggettext_compile']
        },
        spritesheet: {
            files: ['assets/i18n/**/*.png'],
            tasks: ['spritesheet']
        },
        sass: {
            files: ['src/_sass/**/*.scss'],
            tasks: ['sass']
        },
        templates: {
            files: ['src/**/*.html'],
            tasks: ['ngtemplates']
        },
        includereplace: {
            files: ['src/index.html'],
            tasks: ['includereplace']
        }
    });

    /*
    grunt.loadNpmTasks('grunt-browserify');
    grunt.config('browserify', {
        monad: {
            src: 'src/index.js',
            dest: 'dist/monad.js',
            options: {
                transform: ['babelify'],
                standalone: 'monad',
                watch: true
            }
        }
    });
    */

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['ngtemplates', 'gettext', /*'sass',*/ 'includereplace', 'copy'/*, 'browserify'*/]);
    grunt.registerTask('gettext', ['nggettext_extract', 'nggettext_compile']);
    grunt.registerTask('dev', ['build', 'watch']);
};

