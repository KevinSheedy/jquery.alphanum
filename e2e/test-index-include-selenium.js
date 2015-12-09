var webdriver      = require('selenium-webdriver'),
	SeleniumServer = require('selenium-webdriver/remote').SeleniumServer
	By             = require('selenium-webdriver').By,
	until          = require('selenium-webdriver').until,
	assert         = require('assert');


var pathToSeleniumJar = 'C:/apps/selenium/selenium-server-standalone-2.45.0.jar';
var server = new SeleniumServer(pathToSeleniumJar, {
	port: 4444
});

server.start();

var driver = new webdriver.Builder().
	usingServer(server.address()).
	withCapabilities(webdriver.Capabilities.chrome()).
	build();


driver.get('http://localhost:8080/e2e/index.html');
driver.wait(until.titleIs('jquery.alphanum e2e tests'), 5000);

driver.findElement(By.id('textbox')).sendKeys('lorem.ipsum');

var promise = driver.findElement(webdriver.By.id("textbox")).getAttribute('value');


promise.then(function(text) {
	assert.equal(text, 'loremipsum');
	console.log('success');;
	driver.quit();
});

