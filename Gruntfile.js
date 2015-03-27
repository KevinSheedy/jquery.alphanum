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
		nightwatch: {

		}
	});

	// Load the plugin that provides the "uglify" task.
	require('jit-grunt')(grunt);

	// Default task(s).
	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('nw', ['connect', 'nightwatch:chrome']);

};