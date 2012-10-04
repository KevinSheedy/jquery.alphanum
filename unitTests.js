/***************************************************************
* This file is encoded in UTF-8
***************************************************************/

jQuery(document).ready(function(){

	var testSuiteCounter = 0;

	var MASTER_TEST_DATA = [
		
		{
		    name    : "Alpha Numeric",
			type    : "alphanum",
			options : "alphanum",
			data    : [
				[ " aAzZ09é.,$", " aAzZ09é" ],
				[ " ",         " "      ],
				[ "",          ""      ]
			]
		},
		
		{
			name: "Alphabetic",
			options: "alpha",
			type    : "alphanum",
			data: [
				[ "aAzZ09.,$", "aAzZ" ],
				[ " ",         " "    ]
			]
		},
		
		{
			name: "Numeric",
			type    : "numeric",
			options:  "numeric",
			data : [
				[ "a1Az,Z094$.()4€5",   "1,094.45"   ],
				[ " ",         " "    ]
			]
		}
	];
	
	
	function runTestSuite(){
		var i = 0;
		var testGroup;
		for(i=0; i<MASTER_TEST_DATA.length; i++){
			testGroup = MASTER_TEST_DATA[i];
			runTestGroup(testGroup);
		}
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
	
	function createResultsRow(input, expected, actual){
		var $row = $("#rowTemplate").clone();
		$row.removeAttr("id");
		
		var result = (expected == actual) ? "Pass" : "Fail";
		
		$row.children(".input")   .html("[" + input    + "]");
		$row.children(".expected").html("[" + expected + "]");
		$row.children(".actual")  .html("[" + actual   + "]");
		$row.children(".result")  .html(result);
		
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