module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-postcss');

  grunt.initConfig({

    sass: {
      options: {
        sourcemap: 'none',
        noCache: true
      },
      prod: {
        options: {
          style: 'expanded'
        },
        files: {
          'www/css/style.css': 'scss/style.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'www/css/style.min.css': 'scss/style.scss'
        }
      }
    },

    postcss: {
      options: {
        safe: true,
        processors: [
          require('autoprefixer-core')({browsers: 'last 2 version'})
        ]
      },
      dist: {
        src: ['www/css/*.css'],
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['sass', 'postcss']);
};