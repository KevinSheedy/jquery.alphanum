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

		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					captureFile: 'results.txt', // Optionally capture the reporter output to a file 
					quiet: false, // Optionally suppress output to standard out (defaults to false) 
					clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
				},
				src: ['e2e/test-textarea.js']
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	require('jit-grunt')(grunt);
	grunt.loadNpmTasks('grunt-selenium-webdriver');

	// Default task(s).
	grunt.registerTask('default', ['selenium_start', 'connect', 'watch']);

};