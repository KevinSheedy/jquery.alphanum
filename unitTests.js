jQuery(document).ready(function(){

	var testData = {
		"alphanum" : [
			[ "aAzZ09.,$", "aAzZ09" ],
			[ " ",         " "]
		]
	};
	
	
	function runTestSuite(){
		
		for(i in testData){
			alert(i);
		}
	}
	
	function runTestCase(){
		
	}
	
	runTestSuite();
	
	runTestCase(name, data);

});