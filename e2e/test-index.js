console.log('foo');
var webdriver = require('selenium-webdriver'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var pathToSeleniumJar = 'C:/apps/selenium/selenium-server-standalone-2.45.0.jar';
var server = new SeleniumServer(pathToSeleniumJar, {
  port: 4444
});

server.start();

var driver = new webdriver.Builder().
    usingServer(server.address()).
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

driver.get('http://localhost:08080/e2e/index.html');
driver.findElement(By.id('textbox')).sendKeys('lorem.ipsum');

var promise = driver.findElement(webdriver.By.id("textbox")).getAttribute('value');


promise.then(function(text) {
    console.log(text);
	driver.quit();
});
