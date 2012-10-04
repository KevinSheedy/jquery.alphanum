jQuery(document).ready(function(){

	var testSuiteCounter = 0;

	var MASTER_TEST_DATA = getTestData();
	
	
	function runTestSuite(){
		var i = 0;
		var testGroup;
		for(i=0; i<MASTER_TEST_DATA.length; i++){
			testGroup = MASTER_TEST_DATA[i];
			runTestGroup(testGroup);
		}
		
		$("#numTestsPassed").text(passCounter);
		$("#numTestsTotal") .text(testCounter);
		
		if(passCounter == testCounter)
			result = "Pass";
		else
			result = "Fail";
		
		$("#resultsCounterContainer").addClass(result);
		$("#resultText").text(result);
	}
	
	function runTestGroup(testGroup){
		
		var $div   = createResultsDiv();
		var $table = $div.children("table.testResultsTable");
		var $title = $div.children(".testSuiteTitle").html(testGroup.name);
		var i = 0;
		var testCase;
		
		for(i=0; i<testGroup.data.length; i++){
			testCase = testGroup.data[i];
			runTestCase(testGroup.options, testCase, $table, testGroup.type);
		}
	}
	
	function runTestCase(options, testCase, $table, testType){
		
		
		var input    = testCase[0];
		var expected = testCase[1];
		var actual;

		if(testType == "alphanum")
			actual = runTestAlphaNum(input, options);
		else if (testType == "numeric")
			actual = runTestNumeric(input, options);
		
		
		var $row     = createResultsRow(input, expected, actual);
		
		$row.appendTo($table);
		
		
	}
	
	function createResultsDiv(){
		var $div = $("#testResultsTemplate").clone();
		
		$div.attr("id", "results_" + (testSuiteCounter++));
		
		$div.appendTo("#resultsContainer");
		
		$div.find("tr#rowTemplate").remove();
		
		return $div;
	}
	
	var testCounter = 0;
	var passCounter = 0;
	var failCounter = 0;
	
	function createResultsRow(input, expected, actual){
		var $row = $("#rowTemplate").clone();
		$row.removeAttr("id");
		
		var result;
		testCounter++;
		
		if(expected == actual){
			result = "Pass";
			passCounter++;
		}
		else {
			result = "Fail";
			failCounter++
		}
		
		$row.children(".input")   .html("[" + input    + "]");
		$row.children(".expected").html("[" + expected + "]");
		$row.children(".actual")  .html("[" + actual   + "]");
		$row.children(".result")  .html(result);
		
		$row.addClass(result);
		
		return $row;
	}
	
	function runTestAlphaNum(inputString, options){
		return $.fn.alphanum.backdoorAlphaNum(inputString, options);
	}
	
	function runTestNumeric(inputString, options){
		return $.fn.alphanum.backdoorNumeric(inputString, options);
	}
	
	runTestSuite();
	

});