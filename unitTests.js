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
			var testResult = runTestCase(++testCounter, testGroup.options, testCase, testGroup.type);
			var $row = testResult.createTableRow();
			$row.appendTo($table);
		}
	}
	
	function runTestCase(testNumber, options, testCase, testType){
		
		var input    = testCase[0];
		var expected = testCase[1];
		var actual;

		if(testType == "alphanum")
			actual = runTestAlphaNum(input, options);
		else if (testType == "numeric")
			actual = runTestNumeric(input, options);

		return new TestResult(testNumber, input, expected, actual);
	}

	function TestResult(testNumber, input, expected, actual) {
		this.testNumber = testNumber;
		this.input      = input;
		this.expected   = expected;
		this.actual     = actual;
	}

	TestResult.prototype = {
		createTableRow : function() {
			var $row = $("#rowTemplate").clone();
			$row.attr("id", "result_row_" + this.testNumber);
			
			var result;
			
			if(this.expected == this.actual){
				result = "Pass";
				passCounter++;
			}
			else {
				result = "Fail";
				failCounter++
			}
			
			$row.children(".testNumber").html(this.testNumber).click(runTestCase_Click);
			$row.children(".input")     .html("[" + this.input    + "]");
			$row.children(".expected")  .html("[" + this.expected + "]");
			$row.children(".actual")    .html("[" + this.actual   + "]");
			$row.children(".result")    .html(result);
			
			$row.addClass(result);
			
			return $row;
		},

		updateTableRow : function() {
			var $existingRow = $("#result_row_" + this.testNumber);
			var $updatedRow  = this.createTableRow();

			$updatedRow.insertAfter($existingRow);
			$existingRow.remove();
		}
	};
	
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
	
	function createResultsRow(testNumber, input, expected, actual){
		var $row = $("#rowTemplate").clone();
		$row.removeAttr("id");
		
		var result;
		
		if(expected == actual){
			result = "Pass";
			passCounter++;
		}
		else {
			result = "Fail";
			failCounter++
		}
		
		$row.children(".testNumber").html(testNumber).click(runTestCase_Click);
		$row.children(".input")     .html("[" + input    + "]");
		$row.children(".expected")  .html("[" + expected + "]");
		$row.children(".actual")    .html("[" + actual   + "]");
		$row.children(".result")    .html(result);
		
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

	function runTestCase_Click() {
		var testNumber = parseInt($(this).html());
		runSingleTestCase(testNumber);
	}

	function runSingleTestCase(testNumber) {
		var i = 0, j = 0;
		var testGroup;
		var testCounter = 0;

		for(i=0; i<MASTER_TEST_DATA.length; i++){
			testGroup = MASTER_TEST_DATA[i];
			
			for(j=0; j<testGroup.data.length; j++){

				testCounter++;

				if(testCounter == testNumber) {
					testCase = testGroup.data[j];
					var testResult = runTestCase(testNumber, testGroup.options, testCase, testGroup.type);
					testResult.updateTableRow();
				}
			}
		}

		var testCase;
		
		
	}
	

});