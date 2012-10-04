/********************************************************************
* Limit the characters that may be entered in a text field
* Common options: alphanumeric, alphabetic or numeric
* Kevin Sheedy, 2012
* http://github.com/KevinSheedy/jquery.alphanum
*********************************************************************/
(function( $ ){

	// API ///////////////////////////////////////////////////////////////////
	$.fn.alphanum = function(settings) {
		
		var combinedSettings = getCombinedSettingsAlphaNum(settings);
		$this = $(this);
		this.keyup(function(){
			var caretPos = $this.caret();
			var input = this.value;
			var output = trimAlphaNum(input, combinedSettings);
			this.value = output;
			
			//Reset the caret position
			if(input.length ==(output.length + 1))
				$this.caret(caretPos - 1);
			else
				$this.caret(caretPos);
		});
		
	};
	
	$.fn.alpha = function(settings) {
		
		var combinedSettings = getCombinedSettingsAlphaNum(settings);
		
		
	};
	
	$.fn.numeric = function(settings) {
		
		var combinedSettings = getCombinedSettingsNum(settings);
		this.keyup(function(){
			var input = this.value;
			var output = trimNum(input, combinedSettings);
			this.value = output;
		});
		
	};
	
	// End of API /////////////////////////////////////////////////////////////
	
	function getCombinedSettingsAlphaNum(settings){
		var userSettings, combinedSettings = {};
		if(typeof settings === "string")
			userSettings = COMMON_SETTINGS[settings];
		else if(typeof settings == "undefined")
			userSettings = {};
		else
			userSettings = settings;
		
		$.extend(combinedSettings, DEFAULT_SETTINGS_ALPHANUM, userSettings);
		
		if(typeof combinedSettings.blacklist == 'undefined')
			combinedSettings.blacklist = getBlacklist(combinedSettings.allow, combinedSettings.disallow);
		else
			combinedSettings.blacklist = stringToMap(combinedSettings.blacklist);
		
		return combinedSettings;
	}
	
	function getCombinedSettingsNum(settings){
		var userSettings, combinedSettings = {};
		if(typeof settings === "string")
			userSettings = COMMON_SETTINGS[settings];
		else if(typeof settings == "undefined")
			userSettings = {};
		else
			userSettings = settings;
		
		$.extend(combinedSettings, DEFAULT_SETTINGS_NUM, userSettings);
		
		return combinedSettings;
	}
	
	var COMMON_SETTINGS = {
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
	
	var DEFAULT_SETTINGS_ALPHANUM = {
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
	
	function alphanum_allowChar(Char, settings){
		
		if(settings.allowSpace && (Char == " "))
			return true;
			
		if(settings.blacklist[Char])
			return false;
		
		if(!settings.allowNumeric && DIGITS[Char])
			return false;
			
		if(!settings.allowUpper && isUpper(Char))
			return false;
			
		if(!settings.allowLower && isLower(Char))
			return false;
			
		if(!settings.allowCaseless && isCaseless(Char))
			return false;
		
		if(!settings.AllowLatin && LATIN_CHARS[Char])
			return false;
		
		
		if(!settings.allowOtherCharSets){
			if(DIGITS[Char] || LATIN_CHARS[Char])
				return true;
			else
				return false;
		}
		
		return true;
	}
	
	var DEFAULT_SETTINGS_NUM = {
		allowPlus         : false,
		allowMinus        : true,
		allowThouSep      : true,
		allowDecSep       : true,
		allowLeadingSpaces: false
	}
	
	function numeric_allowChar(Char, settings){
		if(DIGITS[Char])
			return true;
		if(Char == THOU_SEP)
			return true;
		if(Char == DEC_SEP)
			return true;
		
		return false;
	}
	
	/********************************
	 * Trims a string according to the settings provided
	 ********************************/
	function trimAlphaNum(inputString, settings){
		
		if(typeof inputString != "string")
			return inputString;
		
		var inChars = inputString.split("");
		var outChars = [];
		var i = 0;
		var Char;
		
		for(i=0; i<inChars.length; i++){
			Char = inChars[i];
			if(alphanum_allowChar(Char, settings))
				outChars.push(Char);
		}
		
		return outChars.join("");
	}
	
	function trimNum(inputString, settings){
		if(typeof inputString != "string")
			return inputString;
		
		var inChars = inputString.split("");
		var outChars = [];
		var i = 0;
		var Char;
		
		for(i=0; i<inChars.length; i++){
			Char = inChars[i];
			if(numeric_allowChar(Char, settings))
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
	
	function stringToMap(string){
		var map = {};
		var array = string.split("");
		var i=0;
		var Char;
		
		for(i=0; i<array.length; i++){
			Char = array[i];
			map[Char] = true;
		}
		
		return map;
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
	$.fn.alphanum.backdoorAlphaNum = function(inputString, settings){
		var combinedSettings = getCombinedSettingsAlphaNum(settings);
		
		return trimAlphaNum(inputString, combinedSettings);
	};
	
	$.fn.alphanum.backdoorNumeric = function(inputString, settings){
		var combinedSettings = getCombinedSettingsNum(settings);
		
		return trimNum(inputString, combinedSettings);
	};
})( jQuery );


// Set caret position easily in jQuery
// Written by and Copyright of Luke Morton, 2011
// Licensed under MIT
(function ($) {
	// Behind the scenes method deals with browser
	// idiosyncrasies and such
	$.caretTo = function (el, index) {
		if (el.createTextRange) { 
			var range = el.createTextRange(); 
			range.move("character", index); 
			range.select(); 
		} else if (el.selectionStart != null) { 
			el.focus(); 
			el.setSelectionRange(index, index); 
		}
	};
	
	// Another behind the scenes that collects the
	// current caret position for an element
	
	// TODO: Get working with Opera
	$.caretPos = function (el) {
		if ("selection" in document) {
			var range = el.createTextRange();
			try {
				range.setEndPoint("EndToStart", document.selection.createRange());
			} catch (e) {
				// Catch IE failure here, return 0 like
				// other browsers
				return 0;
			}
			return range.text.length;
		} else if (el.selectionStart != null) {
			return el.selectionStart;
		}
	};

	// The following methods are queued under fx for more
	// flexibility when combining with $.fn.delay() and
	// jQuery effects.

	// Set caret to a particular index
	$.fn.caret = function (index, offset) {
		if (typeof(index) === "undefined") {
			return $.caretPos(this.get(0));
		}
		
		return this.queue(function (next) {
			if (isNaN(index)) {
				var i = $(this).val().indexOf(index);
				
				if (offset === true) {
					i += index.length;
				} else if (typeof(offset) !== "undefined") {
					i += offset;
				}
				
				$.caretTo(this, i);
			} else {
				$.caretTo(this, index);
			}
			
			next();
		});
	};

	// Set caret to beginning of an element
	$.fn.caretToStart = function () {
		return this.caret(0);
	};

	// Set caret to the end of an element
	$.fn.caretToEnd = function () {
		return this.queue(function (next) {
			$.caretTo(this, $(this).val().length);
			next();
		});
	};
}(jQuery));