var webdriver = require('selenium-webdriver'),
		test      = require('selenium-webdriver/testing'),
		assert    = require('assert'),
		until     = webdriver.until;

var driver = new webdriver.Builder().
	 withCapabilities(webdriver.Capabilities.chrome()).
	 build();

var e2eroot = 'http://localhost:9001/e2e';


test.describe('jquery.alphanum e2e tests', function() {

	test.it('Open Browser', function() {

		this.timeout(5000);

		driver.get(e2eroot);

		driver.wait(function() {
			return driver.getTitle().then(function(title) {
				return title === 'jquery.alphanum e2e tests';
			});
		}, 5000);

	});

	test.it('input[text]', function() {

		driver.get(e2eroot);

		var textbox = driver.findElement(webdriver.By.id('textbox'));
		textbox.sendKeys('lorem.ipsum');
		textbox.getAttribute('value').then(function(value) {
			assert.equal(value, 'loremipsum');
		});

	});

	test.it('textarea', function() {

		driver.get(e2eroot + '/textarea.html');

		var textbox = driver.findElement(webdriver.By.id('textareabox'));
		textbox.sendKeys('foo#bar');
		textbox.getAttribute('value').then(function(value) {
			assert.equal(value, 'foobar');
		});

	});

	test.after(function() {
		driver.quit();
	})
});
