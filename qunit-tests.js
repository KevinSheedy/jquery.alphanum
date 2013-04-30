jQuery(document).ready(function(){

	var MASTER_TEST_DATA = getTestData();
	
	function runTestSuite(){
		
		jQuery.each(MASTER_TEST_DATA, function(index, testGroup){
			
			test(testGroup.name, function(){
				runTestGroup(testGroup);
			});
			
		});
	}
	
	function runTestGroup(testGroup){

		var i = 0;
		var testCase;
		
		for(i=0; i<testGroup.data.length; i++){
			testCase = testGroup.data[i];
			runTestCase(testGroup.options, testCase, testGroup.type);
		}
	}
	
	function runTestCase(options, testCase, testType){
		
		var input    = testCase[0];
		var expected = testCase[1];
		var actual;

		if(testType == "alphanum")
			runTestAlphaNum(input, expected, options);
		else if (testType == "numeric")
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
	
	runTestSuite();

	
	

});

test( "hello test", function() {
	ok( 1 == "1", "Passed!" );
});