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

    it('input[text]', function (done) {
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

    it('textarea', function (done) {
      var browser = this.browser;
      var textbox;
      browser.get(e2eroot + '/textarea.html')
        .elementById('textareabox')
        .then(function (el) {
          textbox = el;
          return textbox.type('foo#bar');
        })
        .then(function () {
          return textbox.getAttribute('value');
        })
        .then(function (val) {
          return assert.equal(val, 'foobar');
        })
        .then(done, done);
    });

    it('newline', function (done) {
      var browser = this.browser;
      var textbox;
      browser.get(e2eroot + '/newline.html')
        .elementById('allowNewline')
        .then(function (el) {
          textbox = el;
          return textbox.type('foo\nbar');
        })
        .then(function () {
          return textbox.getAttribute('value');
        })
        .then(function (val) {
          return assert.equal(val, 'foo\nbar');
        })
        .elementById('disallowNewline')
        .then(function (el) {
          textbox = el;
          return textbox.type('foo\nbar');
        })
        .then(function () {
          return textbox.getAttribute('value');
        })
        .then(function (val) {
          return assert.equal(val, 'foobar');
        })
        .then(done, done);
    });

    it('rebind', function (done) {
      var browser = this.browser;
      var textbox;
      browser.get(e2eroot + '/rebind.html')
        .elementById('textbox')
        .then(function (el) {
          textbox = el;
          return textbox.type('abcdefg');
        })
        .then(function () {
          return textbox.getAttribute('value');
        })
        .then(function (val) {
          return assert.equal(val, 'aefg');
        })
        .then(done, done);
    });

    it('unbind', function (done) {
      var browser = this.browser;
      var textbox;
      browser.get(e2eroot + '/unbind.html')
        .elementById('textbox')
        .then(function (el) {
          textbox = el;
          return textbox.type('abcdefg');
        })
        .then(function () {
          return textbox.getAttribute('value');
        })
        .then(function (val) {
          return assert.equal(val, 'abcdefg');
        })
        .then(done, done);
    });

    /*
    it('copy-paste simple', function (done) {
      var browser = this.browser;
      var wd = this.wd;
      var from, to;
      browser.get(e2eroot + '/copy-paste.html')
        .elementById('from')
        .then(function (el) {
          from = el;
          return from.type('a123b');
        })
        .then(function () {
          return from.keys([wd.SPECIAL_KEYS.Control, 'a']);
        })
        .then(function () {
          return from.keys([wd.SPECIAL_KEYS.Control, 'c']);
        })
        .elementById('to')
        .then(function (el) {
          to = el;
          return to.keys([wd.SPECIAL_KEYS.Control, 'v']);
        })
        .then(function () {
          return to.getAttribute('value');
        })
        .then(function (val) {
          return assert.equal(val, 'a123b');
        })
        .then(done, done);
    });
    */
  });
});
