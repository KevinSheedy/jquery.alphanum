var assert = require('assert');

describe('e2e tests for jquery.alphanum', function () {

	var e2eroot = 'http://localhost:9001/e2e';

	describe('simple e2e tests', function () {

		it('should have correct page title', function (done) {
			var browser = this.browser;
			browser.get(e2eroot)
				.then(function () { return browser.title();})
				.then(function (title) {
					return assert.equal(title, 'jquery.alphanum e2e tests');
				})
				.then(done, done);
		});

		it('should have correct page title', function (done) {
			var browser = this.browser;
			var textbox;
			browser.get(e2eroot)
				.elementById('textbox')
				.then(function (el) {
					textbox = el;
					return textbox.type('lorem.ipsum');
				})
				.then(function () {
					return textbox.getAttribute('value');
				})
				.then(function (val) {
					return assert.equal(val, 'loremipsum');
				})
				.then(done, done);
		});
	});
});
