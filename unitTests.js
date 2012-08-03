jQuery(document).ready(function(){

	var tableCounter = 0;

	var testData = {
		"alphanum" : [
			[ "aAzZ09.,$", "aAzZ09" ],
			[ " ",         " "      ],
			[ " ",         undefined]
		],
		"alpha" : [
			[ "aAzZ09.,$", "aAzZ" ],
			[ " ",         " "    ]
		],
		"numeric" : [
			[ "aAzZ09$",   "09"   ],
			[ " ",         " "    ]
		]
	};
	
	
	function runTestSuite(){
		
		for(testGroup in testData){
			runTestGroup(testGroup, testData[testGroup]);
		}
	}
	
	function runTestGroup(testGroup, testData){
		
		var $table   = createResultsTable();
		var i = 0;
		var testCase;
		
		for(i=0; i<testData.length; i++){
			testCase = testData[i];
			runTestCase(testGroup, testCase, $table);
		}
	}
	
	function runTestCase(testGroup, testCase, $table){
		
		
		var input    = testCase[0];
		var expected = testCase[1];
		var actual   = runTest(input, testGroup);
		
		
		var $row     = createResultsRow(input, expected, actual);
		
		$row.appendTo($table);
		
		
	}
	
	function createResultsTable(){
		var $table = $("#testResultsTemplate").clone();
		
		$table.attr("id", "results_" + (tableCounter++));
		
		$table.appendTo("#resultsContainer");
		
		return $table;
	}
	
	function createResultsRow(input, expected, actual){
		var $row = $("#rowTemplate").clone();
		$row.removeAttr("id");
		
		var result = (expected == actual) ? "Pass" : "Fail";
		
		$row.children(".input")   .html(input);
		$row.children(".expected").html(expected);
		$row.children(".actual")  .html(actual);
		$row.children(".result")  .html(result);
		
		return $row;
	}
	
	function runTest(inputString, options){
		return $.fn.alphanum.trim(inputString, options);
	}
	
	runTestSuite();
	

});