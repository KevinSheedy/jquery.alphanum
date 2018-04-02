module.exports = function(grunt) {
  //var request = require('request');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          base: '.'
        }
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      eslint: {
        files: ['.eslintrc.js', '*.js', 'unit/**/*.js', 'e2e/**/*.js'],
        tasks: ['eslint:dev']
      },

      karma: {
        files: ['jquery.alphanum.js', 'lib/**/*.js', 'unit/*'],
        tasks: ['karma']
      },

      mocha: {
        files: ['jquery.alphanum.js', 'lib/**/*.js', 'e2e/**/*.js', 'e2e/**/*.html'],
        tasks: ['mochaWebdriver:phantom']
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'log/results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['e2e/tests.js']
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        reporters: ['dots'],
        background: false
      }
    },
    eslint: {
      options: {
        //outputFile: 'reports/eslint.report'
        //cache: false
      },
      dev: {
        src: ['*.js', 'unit/**/*.js', 'e2e/**/*.js']
      }
    },
    'saucelabs-qunit': {
      all: {
        options: {
          username: process.env.SAUCE_USERNAME, // if not provided it'll default to ENV SAUCE_USERNAME (if applicable)
          key: function() {return process.env.SAUCE_ACCESS_KEY;}, // if not provided it'll default to ENV SAUCE_ACCESS_KEY (if applicable)
          urls: ['http://localhost:9001/unit' /*, 'www.example.com/mochaTests'*/],
          build: process.env.CI_BUILD_NUMBER,
          testname: 'Unit Tests for jquery.alphanum',
          browsers: [

            // // Chrome Windows
            ['Windows 10', 'chrome', 'beta'],
            // ['Windows 8.1', 'chrome', 'beta'],
            // ['Windows 8', 'chrome', 'beta'],
            // ['Windows 7', 'chrome', 'beta'],
            // ['macOS 10.13', 'chrome', 'beta'],
            ['OS X 10.9', 'chrome', 'beta'],
            ['Linux', 'chrome', '48.0'],

            // ['Windows 7', 'chrome', '40'],

            // // Chrome Firefox
            ['Windows 10', 'firefox', 'beta'],
            // ['Windows 8.1', 'firefox', 'beta'],
            // ['Windows 8', 'firefox', 'beta'],
            // ['Windows 7', 'firefox', 'beta'],
            // ['macOS 10.13', 'firefox', 'beta'],
            ['OS X 10.9', 'firefox', 'beta'],

            // // MS Edge
            // ['Windows 10', 'microsoftedge', '16.16299'],

            // // IE
            ['Windows 10', 'internet explorer', '11'],
            ['Windows 8', 'internet explorer', '10'],
            // ['Windows 7', 'internet explorer', '9'],

            // // Opera
            ['', 'opera', '12'],
            // ['', 'opera', '11'],

            // // Safari
            ['macOS 10.13', 'safari', '11.0'],
            // ['macOS 10.12', 'safari', '10.1'],
            // ['OS X 10.11', 'safari', '10.0'],
            // ['OS X 10.11', 'safari', '9.0'],
            // ['OS X 10.10', 'safari', '8.0'],
            ['OS X 10.9', 'safari', '7.0']
          ]
        }
      }
    },
    sauce_connect: {
      dev: {
        options: {
          username: process.env.SAUCE_USERNAME,
          accessKey: process.env.SAUCE_ACCESS_KEY,
          tunnelIdentifier: 'tunnel-jquery-alphanum-' + process.pid
        }
      }
    },

    mochaWebdriver: {
      options: {
        timeout: 1000 * 60 * 3
      },
      sauce: {
        src: ['e2e/tests-wd.js'],
        options: {
          testName: 'e2e Tests for jquery.alphanum',
          concurrency: 2,
          usePromises: true,
          browsers: [
            {browserName: 'internet explorer', platform: 'Windows 7', version: '9'},
            {browserName: 'opera', platform: '', version: '12'},
            {browserName: 'safari', platform: '', version: '8'},
            //{browserName: 'firefox', platform: '', version: '35'},
            //{browserName: 'android', platform: 'Linux', version: '5'},
            //{browserName: 'internet explorer', platform: 'Windows 7', version: '8'},
            {browserName: 'chrome', platform: 'Windows 7', version: ''}
          ]
        }
      },
      phantom: {
        src: ['e2e/tests-wd.js'],
        options: {
          testName: 'e2e Tests for jquery.alphanum',
          usePhantom: true,
          usePromises: true
        }
      },
      chrome: {
        src: ['e2e/tests-wd.js'],
        options: {
          testName: 'e2e Tests for jquery.alphanum',
          hostname: '127.0.0.1',
          port: '4444',
          usePromises: true,
          browsers: [
            {browserName: 'chrome'}
          ]
        }
      },
      firefox: {
        src: ['e2e/tests-wd.js'],
        options: {
          testName: 'e2e Tests for jquery.alphanum',
          hostname: '127.0.0.1',
          port: '4444',
          usePromises: true,
          browsers: [
            {browserName: 'firefox'}
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('gruntify-eslint');
  require('jit-grunt')(grunt);
  grunt.loadNpmTasks('grunt-selenium-webdriver');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-sauce-connect-launcher');
  grunt.loadNpmTasks('grunt-mocha-webdriver');

  // Default task(s).
  //grunt.registerTask('test', ['selenium_start', 'connect', 'karma', 'mochaTest']);
  //grunt.registerTask('travis', ['eslint', 'connect', 'saucelabs-qunit', 'sauce_connect:dev', 'mochaTest', 'sauce-connect-close']);
  //grunt.registerTask('e2e', ['selenium_start', 'connect', 'mochaTest']);

  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('test', ['eslint', 'unit', 'e2e']);
  grunt.registerTask('travis', ['eslint', 'connect', 'saucelabs-qunit', 'mochaWebdriver']);

  grunt.registerTask('unit', ['karma']);
  grunt.registerTask('unit-sauce', ['connect', 'saucelabs-qunit']);

  grunt.registerTask('e2e', ['e2e-phantom']);
  grunt.registerTask('e2e-phantom', ['connect', 'mochaWebdriver:phantom']);
  grunt.registerTask('e2e-sauce', ['connect', 'mochaWebdriver:sauce']);
  grunt.registerTask('e2e-chrome', ['selenium_start', 'connect', 'mochaWebdriver:chrome']);
  grunt.registerTask('e2e-firefox', ['selenium_start', 'connect', 'mochaWebdriver:firefox']);
  grunt.registerTask('e2e-sauce-old', ['sauce_connect:dev', 'connect', 'mochaTest', 'sauce-connect-close']);

};
