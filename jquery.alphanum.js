(function( $ ){

	/********************************
	 * API goes here
	 ********************************/
	$.fn.alphanum = function(options) {
		
		var combinedOptions = getCombinedOptionsAlphaNum(options);
		this.keyup(function(){
			var input = this.value;
			var output = trimAlphaNum(input, combinedOptions);
			this.value = output;
		});
		
	};
	
	$.fn.alpha = function(options) {
		
		var combinedOptions = getCombinedOptionsAlphaNum(options);
		
		
	};
	
	$.fn.numeric = function(options) {
		
		var combinedOptions = getCombinedOptionsNum(options);
		this.keyup(function(){
			var input = this.value;
			var output = trimNum(input, combinedOptions);
			this.value = output;
		});
		
	};
	
	function getCombinedOptionsAlphaNum(options){
		var userOptions, combinedOptions = {};
		if(typeof options === "string")
			userOptions = COMMON_OPTIONS[options];
		else if(typeof options == "undefined")
			userOptions = {};
		else
			userOptions = options;
		
		$.extend(combinedOptions, DEFAULT_OPTIONS_ALPHANUM, userOptions);
		
		if(typeof combinedOptions.blacklist == 'undefined')
			combinedOptions.blacklist = getBlacklist(combinedOptions.allow, combinedOptions.disallow);
		
		return combinedOptions;
	}
	
	function getCombinedOptionsNum(options){
		var userOptions, combinedOptions = {};
		if(typeof options === "string")
			userOptions = COMMON_OPTIONS[options];
		else if(typeof options == "undefined")
			userOptions = {};
		else
			userOptions = options;
		
		$.extend(combinedOptions, DEFAULT_OPTIONS_NUM, userOptions);
		
		return combinedOptions;
	}
	
	var COMMON_OPTIONS = {
		"alphanum"   : {},
		"alpha"      : {
			allowNum   : false
		},
		"upper"      : {
			allowNum   :   false,
			allowUpper:    true,
			allowLower:    false,
			allowCaseless: true
		},
		"lower"      : {
			allowNum   :   false,
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
	var BLACKLIST   = '!@#$%^&*()+=[]\\\';,/{}|":<>?~`.- _';
	var THOU_SEP    = ",";
	var DEC_SEP     = ".";
	var DIGITS      = getDigitsMap();
	var LATIN_CHARS = getLatinCharsMap();
	
	var DEFAULT_OPTIONS_ALPHANUM = {
		allow             : '',
		disallow          : '',
		allowSpace        : true,
		allowNumeric      : true,
		allowUpper        : true,
		allowLower        : true,
		allowCaseless     : true, //eg Arabic or Chinese chars don't have upper / lower
		allowLatin        : true, //a-Z A-Z
		allowOtherCharSets: true  //eg é, Á, Arabic, Chinese etc
	}
	
	function alphanum_allowChar(Char, options){
		
		if(options.allowSpace && (Char == " "))
			return true;
			
		if(options.blacklist[Char])
			return false;
		
		if(!options.allowNumeric && DIGITS[Char])
			return false;
			
		if(!options.allowUpper && isUpper(Char))
			return false;
			
		if(!options.allowLower && isLower(Char))
			return false;
			
		if(!options.allowCaseless && isCaseless(Char))
			return false;
		
		if(!options.AllowLatin && LATIN_CHARS[Char])
			return false;
		
		
		if(!options.allowOtherCharSets){
			if(DIGITS[Char] || LATIN_CHARS[Char])
				return true;
			else
				return false;
		}
		
		return true;
	}
	
	var DEFAULT_OPTIONS_NUM = {
		allowPlus         : false,
		allowMinus        : true,
		allowThouSep      : true,
		allowDecSep       : true,
		allowLeadingSpaces: false
	}
	
	function numeric_allowChar(Char, options){
		if(DIGITS[Char])
			return true;
		if(Char == THOU_SEP)
			return true;
		if(Char == DEC_SEP)
			return true;
		
		return false;
	}
	
	/********************************
	 * Trims a string according to the options provided
	 ********************************/
	function trimAlphaNum(inputString, options){
		
		if(typeof inputString != "string")
			return inputString;
		
		var inChars = inputString.split("");
		var outChars = [];
		var i = 0;
		var Char;
		
		for(i=0; i<inChars.length; i++){
			Char = inChars[i];
			if(alphanum_allowChar(Char, options))
				outChars.push(Char);
		}
		
		return outChars.join("");
	}
	
	function trimNum(inputString, options){
		if(typeof inputString != "string")
			return inputString;
		
		var inChars = inputString.split("");
		var outChars = [];
		var i = 0;
		var Char;
		
		for(i=0; i<inChars.length; i++){
			Char = inChars[i];
			if(numeric_allowChar(Char, options))
				outChars.push(Char);
		}
		
		return outChars.join("");
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
	
	function isCaseless(Char){
		if(Char.toUpperCase() == Char.toLowerCase())
			return true;
		else
			return false;
	}
	
	function getBlacklist(allow, disallow){
		var blacklist = {};
		
		var badChars = BLACKLIST + disallow;
		badChars = badChars.split("");
		var i = 0;
		var badChar;
		var goodChar;
		
		for (i=0; i<badChars.length; i++){
			badChar = badChars[i];
			blacklist[badChar] = true;
		}
		
		allow = allow.split("");
		
		for (i=0; i<allow.length; i++){
			goodChar = allow[i];
			
			if(blacklist[goodChar])
				delete blacklist[goodChar];
		}
		
		return blacklist;
	}
	
	function getDigitsMap(){
		var array = "0123456789".split("");
		var map = {};
		var i = 0;
		var digit;
		
		for(i=0; i<array.length; i++){
			digit = array[i];
			map[digit] = true;
		}
		
		return map;
	}
	
	function getLatinCharsMap(){
		var lower = "abcdefghijklmnopqrstuvwxyz";
		var upper = lower.toUpperCase();
		var azAZ = (lower + upper).split("");
		var map = {};
		var i = 0;
		var Char;
		
		for (i=0; i<azAZ; i++){
			Char = azAZ[i];
			map[Char] = true;
		}
		
		return map;
	}
	
	// Backdoor for testing
	$.fn.alphanum.backdoorAlphaNum = function(inputString, options){
		var combinedOptions = getCombinedOptionsAlphaNum(options);
		
		return trimAlphaNum(inputString, combinedOptions);
	};
	
	$.fn.alphanum.backdoorNumeric = function(inputString, options){
		var combinedOptions = getCombinedOptionsNum(options);
		
		return trimNum(inputString, combinedOptions);
	};
})( jQuery );