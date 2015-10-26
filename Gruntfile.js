module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      build: {
        cwd: 'src',
        src: [ '**' ],
        dest: 'build',
        expand: true
      }
    },
    uglify: {
      build: {
        files: {
          'build/canvas.js': ['build/canvas.js']
        }
      }
    },
    jshint: {
      src: ['src/*.js'],
      grunt: ['Gruntfile.js'],
      options: {
        browser: true,
        curly: true,
        eqeqeq: true
      }
    },
    'gh-pages': {
      options: {
        base: 'build'
      },
      src: '**'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.registerTask(
  'build',
    'Copies all source files to build directory, and uglified the js',
    [ 'copy', 'uglify' ]
  );
};
