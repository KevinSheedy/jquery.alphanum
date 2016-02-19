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
				files: ['.eslintrc.json', '*.js', 'unit/**/*.js', 'e2e/**/*.js'],
				tasks: ['eslint:dev']
			},

			karma: {
				files: ['jquery.alphanum.js', 'lib/**/*.js', 'unit/*'],
				tasks: ['karma']
			},

			mocha: {
				files: ['jquery.alphanum.js', 'lib/**/*.js', 'e2e/**/*.js', 'e2e/**/*.html'],
				tasks: ['mochaTest']
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
					key: process.env.SAUCE_ACCESS_KEY, // if not provided it'll default to ENV SAUCE_ACCESS_KEY (if applicable)
					urls: ['http://localhost:9001/unit' /*, 'www.example.com/mochaTests'*/],
					build: process.env.CI_BUILD_NUMBER,
					testname: 'Unit Tests for jquery.alphanum',
					browsers: [
						["XP", "chrome", 31]
					]
					// optionally, he `browsers` param can be a flattened array:
					// [["XP", "firefox", 19], ["XP", "chrome", 31]]
				}
			}
		},
		sauce_connect: {
			dev: {
				options: {
					username: process.env.SAUCE_USERNAME,
					accessKey: process.env.SAUCE_ACCESS_KEY,
					tunnelIdentifier: 'tunnel-jquery-alphanum'
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("gruntify-eslint");
	require('jit-grunt')(grunt);
	grunt.loadNpmTasks('grunt-selenium-webdriver');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-saucelabs');
	grunt.loadNpmTasks('grunt-sauce-connect-launcher');

	// Default task(s).
	grunt.registerTask('default', ['selenium_start', 'connect', 'watch']);
	grunt.registerTask('test', ['selenium_start', 'connect', 'karma', 'mochaTest']);
	grunt.registerTask('travis', ['eslint', 'connect', 'saucelabs-qunit', 'sauce_connect:dev', 'mochaTest', 'sauce-connect-close']);
	grunt.registerTask('e2e', ['selenium_start', 'connect', 'mochaTest']);
	grunt.registerTask('sauce-e2e', ['sauce_connect:dev', 'connect', 'mochaTest']);
	grunt.registerTask('sauce-unit', ['connect', 'saucelabs-qunit']);

};