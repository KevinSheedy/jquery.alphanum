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

driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 2000);
driver.quit();