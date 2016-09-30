module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      lib:{ 
        src:[ 'public/lib/*.js' ],
        dest:'public/lib.js'
      },
      client: {
        src: [ 'public/client/*.js' ],//파일 합쳐서
        dest: 'public/client.js'//보낸다. 
      } 
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      lib:{ 
        src:[ 'public/lib.js' ],
        dest:'public/dist/lib.min.js'
      },
      client: {
        src: [ 'public/client.js' ],//파일 합쳐서
        dest: 'public/dist/client.min.js'//보낸다. 
      } 
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'public/client/*.js', 'public/lib/*.js'
      ]
    },

    cssmin: {
      dist: {
        src: ['public/style.css'],//줄여서
        dest: 'public/dist/style.min.css'//보낸다. 
      }
    },

    watch: {
      scripts: {  
        files: [
          'public/client/*.js',
          'public/lib/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/style.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command:
          'git push live master',
        option:{
          callback:function(err,stdout, stderr){
            if(err) console.log(err);
            else console.log(stdout);
          }
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');//플러그인들.. 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {  // Running nodejs & displaying output on the main console
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  // grunt.registerTask('upload', function(n) { //중복
  //   if (grunt.option('prod')) {
  //     // add your production server task here
  //   }
  //   grunt.task.run([ 'server-dev' ]);
  // });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat', 'cssmin', 'uglify', 'eslint'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {           // add your production server task here
      grunt.task.run([ 'shell' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [          // add your deploy tasks here
     'shell'
  ]);

};
