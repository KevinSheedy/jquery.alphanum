var webdriver = require('selenium-webdriver'),
test = require('selenium-webdriver/testing'),
assert = require('assert');

var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

test.describe('Google Search', function() {
  test.it('should work', function() {

    driver.get('http://localhost:9001/e2e/');

    var textbox = driver.findElement(webdriver.By.id('textbox'));
    textbox.sendKeys('lorem.ipsum');
    textbox.getAttribute('value').then(function(value) {
      assert.equal(value, 'loremipsum');
    });

  });

  test.it('should work', function() {

    driver.get('http://localhost:9001/e2e/textarea.html');

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

//driver.quit();