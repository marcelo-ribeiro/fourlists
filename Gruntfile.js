module.exports = function (grunt) {
  grunt.initConfig({


    watch: {
      options: {
        interrupt: true,
        livereload: true,
      },
      css: {
        files: ['scss/**/*.{scss,sass}'],
        tasks: ['css'],
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['js']
      },
      html: {
        files: ['dist/**/*.html']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['css', 'js', 'imagemin']
      }
    },



    sass: {
      options: {
        style: 'compressed', // nested, compact, compressed, expanded
        sourcemap: 'none',
        noCache: true
      },
      static_files: {
        files: {
          'www/css/style.css': 'scss/style.scss'
        }
      },
      dinamyc_files: {
        files: [{
          expand: true,
          cwd: 'scss/',
          src: ['*.scss', '!_*.scss'],
          dest: 'www/css/',
          ext: '.css'
        }]
      }
    },



    compass: {
      options: {
        importPath: './',
        httpPath: './',
        cssDir: 'www/css',
        sassDir: 'scss',
        imagesDir: 'www/img',
        javascriptsDir: 'www/js',
        fontsDir: 'www/fonts',
      },
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'compressed', // nested, compact, compressed, expanded
          force: true
        }
      }
    },



    postcss: {
      options: {
        safe: true,
        processors: [require('autoprefixer-core')({browsers: 'last 2 version'})]
      },
      dist: {
        expand: true,
        cascade: true,
        remove: true,
        cwd: 'www/css/',
        src: ['*.css'],
        dest: 'www/css/'
      }
    },



    uglify: {
      static_files: {
        files: {
          'www/js/script.js': [
            'bower_components/angular/angular.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
            'src/js/main.js'
          ]
        }
      },
      dinamyc_files: {
        files: [{
          expand: true,
          flatten: true,
          mangle: false,
          cwd: 'src/js/',
          src: ['*.js'],
          dest: 'www/js/',
          ext: '.min.js'
        }]
      }
    },



    concat: {
      css: {
        files: {
          'www/css/style.css': [
            'bower_components/normalize.css/normalize.css',
            'www/css/style.css'
          ],
        },
      },
      js: {
        options: {
          separator: ';'
        },
        files: {
          'www/js/script.js': [
            'bower_components/angular/angular.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
            'src/js/main.js'
          ],
        }
      }
    },



    imagemin: {
      options: {
        optimizationLevel: 3
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'www/img/'
        }]
      }
    }


  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask( 'default', [ 'css', 'js', 'imagemin', 'watch' ] );
  grunt.registerTask( 'css', [ 'compass', 'postcss' ] );
  grunt.registerTask( 'js', [ 'uglify:static_files' ] );

};