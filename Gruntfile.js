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

		}
	});

	// Load the plugin that provides the "uglify" task.
	require('jit-grunt')(grunt);
	grunt.loadNpmTasks('grunt-selenium-webdriver');

	// Default task(s).
	grunt.registerTask('default', ['selenium_start', 'connect', 'watch']);

};