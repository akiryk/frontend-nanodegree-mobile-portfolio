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
          quality: 70,
          sizes: [{
            suffix: '_small',
            width: 320
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
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-responsive-images');

  // Default task(s).
  grunt.registerTask('default', [
    'connect',
    'watch'
    ]);

  grunt.registerTask('hint', ['jshint']);

  grunt.registerTask('resize', [
    'responsive_images',
    ]);

  grunt.registerTask('build', [
    'connect',
    'sass',
    'watchForProduction',
    'processhtml',
    'uglify'
    ]);

};