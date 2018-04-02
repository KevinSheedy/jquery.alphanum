// Note some browser launchers should be installed before using karma start.

// For example:
//      $ npm install karma-firefox-launcher
//      $ karma start --browser=Firefox

// See http://karma-runner.github.io/0.8/config/configuration-file.html
module.exports = function(config) {

  var customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    },
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.11',
      version: '8'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    sl_android: {
      base: 'SauceLabs',
      browserName: 'Browser',
      platform: 'Android',
      version: '4.4',
      deviceName: 'Samsung Galaxy S3 Emulator',
      deviceOrientation: 'portrait'
    }
  }

  config.set({
    basePath: '',
    frameworks: ['qunit'],
    logLevel: config.LOG_INFO,
    port: 9876,

    // list of files / patterns to load in the browser
    files: [
      'lib/jquery.js',
      'jquery.alphanum.js',
      'lib/qunit-extras.js',
      'unit/*.js'
    ],

    // Test results reporter to use
    // https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['sl_firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    customLaunchers: customLaunchers,
  });
};
