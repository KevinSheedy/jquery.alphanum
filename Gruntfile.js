module.exports = function(grunt) {

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
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("gruntify-eslint");
	require('jit-grunt')(grunt);
	grunt.loadNpmTasks('grunt-selenium-webdriver');
	grunt.loadNpmTasks('grunt-karma');

	// Default task(s).
	grunt.registerTask('default', ['selenium_start', 'connect', 'watch']);
	grunt.registerTask('test', ['selenium_start', 'connect', 'karma', 'mochaTest']);
	grunt.registerTask('travis', ['eslint', 'karma', 'e2e']);
	grunt.registerTask('e2e', ['selenium_start', 'connect', 'mochaTest']);

};