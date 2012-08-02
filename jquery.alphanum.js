(function( $ ){

	/********************************
	 * API goes here
	 ********************************/
	$.fn.alphanum = function(options) {

	};
	
	var COMMON_OPTIONS = {
		"alpha"      : {
			allowDigits: false
		},
		"upper"      : {
			allowDigits:   false,
			allowUpper:    true,
			allowLower:    false,
			allowCaseless: true
		},
		"lower"      : {
			allowDigits:   false,
			allowUpper:    false,
			allowLower:    true,
			allowCaseless: true
		},
		"numeric"    : {},
		"integer"    : {},
		"posInteger" : {}
	};
	
	/********************************
	 * Implementation goes here
	 ********************************/
	var BLACKLIST      = '!@#$%^&*()+=[]\\\';,/{}|":<>?~`.- _';
	
	var defaultOptions = {
		allow          = '',
		disallow       = '',
		allowDigits    = true,
		allowUpper     = true,
		allowLower     = true,
		allowCaseless  = true, //eg Arabic or Chinese chars don't have upper / lower
		allowPosNeg    = false,
		allowPos       = false,
		allowNeg       = false,
		onlyLatin      = false
	}
	
	/********************************
	 * Trims a string according to the options provided
	 ********************************/
	function trim(inputString, options){
		
	}
	
	function removeUpperCase(inputString){
		var charArray = inputString.split('');
		var i = 0;
		var outputArray = [];
		var Char;
		
		for(i=0; i<charArray.length; i++){
			Char = charArray[i];
		}
	}
	
	function removeLowerCase(inputString){
		
	}
	
	function isUpper(Char){
		var upper = Char.toUpperCase();
		var lower = Char.toLowerCase();
		
		if( (Char == upper) && (upper != lower))
			return true;
		else
			return false;
	}
	
	function isLower(Char){
		var upper = Char.toUpperCase();
		var lower = Char.toLowerCase();
		
		if( (Char == lower) && (upper != lower))
			return true;
		else
			return false;
	}
})( jQuery );