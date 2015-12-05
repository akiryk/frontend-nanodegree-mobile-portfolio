/*
 * https://medium.com/@verpixelt/get-started-with-grunt-76d29dc25b01
 */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
            'dev/js/*.js'
        ],
        dest: 'prod/js/unminified.js',
      }
    },
    jshint: {
      files: ['Gruntfile.js','js/*.js'],
    },
    connect: {
      server: {
        options: {
          port: 8000,
          livereload: false
        }
      }
    },
    uglify: {
      build: {
        src: 'prod/js/production.js',
        dest: 'prod/js/production.min.js'
      }
    },
    responsive_images: {
      resize: {
        options: {
          quality: 60,
          sizes: [{
            suffix: '_small',
            width: 115
          },{
            suffix: '_medium',
            width: 618
          },{
            suffix: '_large',
            width: 1268
          }]
        },
        files: [{
          expand: true,
          src: ['img/**.{jpg,gif,png}'],
          //cwd: 'assets/', // e.g. if the img directory were in a directory called 'assets'
          dest: 'prod/'
        }]
      }
    },
    processhtml: {
      dev: {
        files: {
          'index.html': ['index.html'] // 'destination.html': ['source.html']
        }
      },
    },
    sass: {                             // Task
      dev: {                            // Target
        options: {                       // Target options
          outputStyle: 'expanded',
          sourcemap: 'auto'
        },
        files: {                         // Dictionary of files
           // 'destination': 'source'
        }
      },
      dist: {
        options: {
          outputStyle: 'expanded',
          sourcemap: 'auto'
        },
        files: {                         // Dictionary of files
          'css/style.css': 'sass/style.scss',
           // 'destination': 'source'
        }
      }
    },
    postcss: {
      options: {
        map: true // inline sourcemaps
      },
      dist: {
        src: '*.css'
      }
    },
    inline: {
      dist: {
        options:{
          cssmin: true,
          uglify: true
        },
        src: 'index.html',
        dest: 'prod/index.html'
      }
    },
    watch: {
      scripts: {
        files: [
                '<%= jshint.files %>'
                ],
        tasks: ['concat', 'jshint'],
        options: {
            spawn: false,
            livereload: true
        },
      },
      html: {
        files: ['index.html'],
        options: {
            livereload: true
        }
      },
      css: {
        files: ['**/*.scss'],
        tasks: ['sass']
      }
    },
    watchForProduction: {
      scripts: {
        files: [
                'dev/js/libs/*.js',
                'dev/js/plugins/*.js',
                'dev/js/*.js',
                ],
        tasks: ['concatForProduction'],
        options: {
            spawn: false,
            livereload: true
        },
      },
      html: {
        files: ['index.html'],
        options: {
            livereload: false
        }
      }
    }
  });

  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-inline');

  // Default task(s).
  grunt.registerTask('default', [
    'connect',
    'watch'
    ]);

  grunt.registerTask('inlineJSCSS', ['inline']);

  grunt.registerTask('hint', ['jshint']);

  grunt.registerTask('resize', [
    'responsive_images',
    ]);


};