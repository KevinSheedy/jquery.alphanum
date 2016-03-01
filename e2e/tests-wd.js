var assert = require('assert');

describe('e2e tests for jquery.alphanum', function () {

	describe('simple e2e tests', function () {

		it('should have correct page title', function (done) {
			var browser = this.browser;
			browser.get('http://localhost:9001/e2e')
				.then(function () { return browser.title();})
				.then(function (title) {
					return assert.equal(title, 'jquery.alphanum e2e tests');
				})
				.then(done, done);
		});
	});
});
