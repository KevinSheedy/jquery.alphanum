jQuery(document).ready(function(){

  var ARRAY_OF_TEST_GROUPS = window.getTestData();
  var test = window.test;
  var equal = window.equal;
  var ok = window.ok;

  initSauce();
  chainingTests();
  runValidationTests();

  function runValidationTests(){

    jQuery.each(ARRAY_OF_TEST_GROUPS, function(index, testGroup){

      // Add a QUnit test to the test queue
      test(testGroup.name, function(){
        runTestGroup(testGroup);
      });

    });
  }

  function runTestGroup(testGroup){

    jQuery.each(testGroup.data, function(index, testCase){

      runTestCase(testGroup.options, testCase, testGroup.type);
    });
  }

  function runTestCase(options, testCase, testType){

    var input    = testCase[0];
    var expected = testCase[1];

    if(testType == 'alphanum')
      runTestAlphaNum(input, expected, options);
    else if (testType == 'numeric')
      runTestNumeric(input, expected, options);
  }



  function runTestAlphaNum(inputString, expectedString, options){

    var actual = $.fn.alphanum.backdoorAlphaNum(inputString, options);

    equal(actual, expectedString);
  }

  function runTestNumeric(inputString, expectedString, options){

    var actual = $.fn.alphanum.backdoorNumeric(inputString, options);

    equal(actual, expectedString);
  }

  function chainingTests() {
    test('jQuery Chaining', function(){
      ok(jQuery('#dbg').alphanum().alpha().numeric().hide());
    });
  }

  function initSauce() {
    var log = [];

    QUnit.done(function (test_results) {
      var tests = [];
      for(var i = 0, len = log.length; i < len; i++) {
        var details = log[i];
        tests.push({
          name: details.name,
          result: details.result,
          expected: details.expected,
          actual: details.actual,
          source: details.source
        });
      }
      test_results.tests = tests;

      window.global_test_results = test_results;
    });
    QUnit.testStart(function(testDetails){
      QUnit.log(function(details){
        if (!details.result) {
          details.name = testDetails.name;
          log.push(details);
        }
      });
    });
  }

});
