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

		var $collection = this;

		$collection.each(function(){
			var $textbox = $(this);
			$textbox.keyup(function(){
				handleKeyup($textbox, trimAlphaNum, combinedSettings);
			});
		});
		
	};
	
	$.fn.alpha = function(settings) {
		
		var defaultAlphaSettings = getCombinedSettingsAlphaNum("alpha");
		var combinedSettings = getCombinedSettingsAlphaNum(settings, defaultAlphaSettings);

		var $collection = this;

		$collection.each(function(){
			var $textbox = $(this);
			$textbox.keyup(function(){
				handleKeyup($textbox, trimAlphaNum, combinedSettings);
			});
		});
	};
	
	$.fn.numeric = function(settings) {
		
		var combinedSettings = getCombinedSettingsNum(settings);
		var $collection = this;

		$collection.each(function(){
			var $textbox = $(this);
			$textbox.keyup(function(){
				handleKeyup($textbox, trimNum, combinedSettings);
			});
		});
		
	};
	
	// End of API /////////////////////////////////////////////////////////////
	
	
	// Start Settings ////////////////////////////////////////////////////////
	
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
	
	var DEFAULT_SETTINGS_NUM = {
		allowPlus         : false,
		allowMinus        : true,
		allowThouSep      : true,
		allowDecSep       : true,
		allowLeadingSpaces: false,
		maxDigits         : '',     // No max
		maxDecimalPlaces  : ''      // No max
	}
	
	// Some pre-defined groups of settings for convenience
	var COMMON_SETTINGS = {
		"alphanum"   : {},
		"alpha"      : {
			allowNumeric : false
		},
		"upper"      : {
			allowNumeric : false,
			allowUpper   : true,
			allowLower   : false,
			allowCaseless: true
		},
		"lower"      : {
			allowNumeric : false,
			allowUpper   : false,
			allowLower   : true,
			allowCaseless: true
		},
		"numeric"    : {},
		"integer"    : {},
		"posInteger" : {}
	};
	
	
	var BLACKLIST   = getBlacklistAscii() + getBlacklistNonAscii();
	var THOU_SEP    = ",";
	var DEC_SEP     = ".";
	var DIGITS      = getDigitsMap();
	var LATIN_CHARS = getLatinCharsSet();
	
	// Return the blacklisted special chars that are encodable using 7-bit ascii
	function getBlacklistAscii(){
		return '!@#$%^&*()+=[]\\\';,/{}|":<>?~`.- _';
	}
	
	// Return the blacklisted special chars that are NOT encodable using 7-bit ascii
	// We want this .js file to be encoded using 7-bit ascii so it can reach the widest possible audience
	// Higher order chars must be escaped eg "\xAC"
	// Not too worried about comments containing higher order characters for now (let's wait and see if it becomes a problem)
	function getBlacklistNonAscii(){
		var blacklist = 
			  "\xAC"     // ¬
			+ "\u20AC"   // €
			+ "\xA3"     // £
			;
		return blacklist;
	}
	
	// End Settings ////////////////////////////////////////////////////////
	
	
	// Implementation details go here ////////////////////////////////////////////////////////
	
	// One way to prevent a character being entered is to cancel the keypress event.
	// However, this gets messy when you have to deal with things like copy paste which isn't a keypress.
	// Which event gets fired first, keypress or keyup? What about IE6 etc etc?
	// Instead, it's easier to allow the 'bad' character to be entered and then to delete it immediately after.
	
	function handleKeyup($textBox, trimFunction, settings){
		
		var inputString = $textBox.val();
		var outputString = trimFunction(inputString, settings);
		
		if(inputString == outputString)
			return;
		
		var caretPos = $textBox.caret();
		
		$textBox.val(outputString);
		
		//Reset the caret position
		if(inputString.length ==(outputString.length + 1))
			$textBox.caret(caretPos - 1);
		else
			$textBox.caret(caretPos);
	}
	
	function getCombinedSettingsAlphaNum(settings, defaultSettings){
		if(typeof defaultSettings == "undefined")
			defaultSettings = DEFAULT_SETTINGS_ALPHANUM;
		var userSettings, combinedSettings = {};
		if(typeof settings === "string")
			userSettings = COMMON_SETTINGS[settings];
		else if(typeof settings == "undefined")
			userSettings = {};
		else
			userSettings = settings;
		
		$.extend(combinedSettings, defaultSettings, userSettings);
		
		if(typeof combinedSettings.blacklist == 'undefined')
			combinedSettings.blacklistSet = getBlacklistSet(combinedSettings.allow, combinedSettings.disallow);
		
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
	
	
	// This is the heart of the algorithm
	function alphanum_allowChar(Char, settings){
		
		if(settings.allowSpace && (Char == " "))
			return true;
			
		if(settings.blacklistSet.contains(Char))
			return false;
		
		if(!settings.allowNumeric && DIGITS[Char])
			return false;
			
		if(!settings.allowUpper && isUpper(Char))
			return false;
			
		if(!settings.allowLower && isLower(Char))
			return false;
			
		if(!settings.allowCaseless && isCaseless(Char))
			return false;
		
		if(!settings.allowLatin && LATIN_CHARS.contains(Char))
			return false;
		
		
		if(!settings.allowOtherCharSets){
			if(DIGITS[Char] || LATIN_CHARS.contains(Char))
				return true;
			else
				return false;
		}
		
		return true;
	}
	
	function numeric_allowChar(validatedStringFragment, Char, settings){

		if(DIGITS[Char]) {

			if(isMaxDigitsReached(validatedStringFragment, settings))
				return false;

			if(isMaxDecimalsReached(validatedStringFragment, settings))
				return false;

			return true;
		}

		if(settings.allowPlus && Char == '+' && validatedStringFragment == '')
			return true;

		if(settings.allowMinus && Char == '-' && validatedStringFragment == '')
			return true;

		if(Char == THOU_SEP)
			return true;

		if(Char == DEC_SEP)
			return true;
		
		return false;
	}

	function countDigits(string) {

		// Error handling, nulls etc
		string = string + "";

		// Count the digits
		return string.replace(/[^0-9]/g,"").length;
	}

	function isMaxDigitsReached(string, settings) {

		var maxDigits = settings.maxDigits;

		if(maxDigits == "" || isNaN(maxDigits))
			return false; // In this case, there is no maximum

		var numDigits = countDigits(string);

		if(numDigits >= maxDigits)
			return true;

		return false;
	}

	function isMaxDecimalsReached(string, settings) {

		var maxDecimalPlaces = settings.maxDecimalPlaces;

		if(maxDecimalPlaces == "" || isNaN(maxDecimalPlaces))
			return false; // In this case, there is no maximum

		var indexOfDecimalPoint = string.indexOf(DEC_SEP);

		if(indexOfDecimalPoint == -1)
			return false;

		var decimalSubstring = string.substring(indexOfDecimalPoint);
		var numDecimals = countDigits(decimalSubstring);

		if(numDecimals >= maxDecimalPlaces)
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
			var validatedStringFragment = outChars.join("");
			if(numeric_allowChar(validatedStringFragment, Char, settings))
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
	
	function getBlacklistSet(allow, disallow){
		
		var setOfBadChars  = new Set(BLACKLIST + disallow);
		var setOfGoodChars = new Set(allow);
		
		var blacklistSet   = setOfBadChars.subtract(setOfGoodChars);
		
		return blacklistSet;
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
	
	function getLatinCharsSet(){
		var lower = "abcdefghijklmnopqrstuvwxyz";
		var upper = lower.toUpperCase();
		var azAZ = new Set(lower + upper);
		
		return azAZ;
	}
	
	function Set(elems){
		if(typeof elems == "string")
			this.map = stringToMap(elems);
		else
			this.map = {};
	}
	
	Set.prototype.add = function(set){
	
		var newSet = this.clone();
		
		for(key in set.map)
			newSet.map[key] = true;
		
		return newSet;
	}
	
	Set.prototype.subtract = function(set){
		
		var newSet = this.clone();
		
		for(key in set.map)
			delete newSet.map[key];
			
		return newSet;
	}
	
	Set.prototype.contains = function(key){
		if(this.map[key])
			return true;
		else
			return false;
	}
	
	Set.prototype.clone = function(){
		var newSet = new Set();
		
		for(key in this.map)
			newSet.map[key] = true;
		
		return newSet;
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


//Include the 3rd party lib: jquery.caret.js


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