# jQuery Alphanum

[jsfiddle demo](http://jsfiddle.net/fb0zgxaj/2/)

	$(input).alphanum();

Restricts the characters that may be entered into a text field.

	.alphanum();

	.alpha();

	.numeric();

## .alphanum()

Restrict the input to alphanumeric characters

	$("#username").alphanum();

Override some of the default settings

	$("#username").alphanum({
		allowSpace: false, // Allow the space character
		allowUpper: false  // Allow Upper Case characters
	});

Available settings plus their default values

	var DEFAULT_SETTINGS_ALPHANUM = {
		allow              : '',    // Allow extra characters
		disallow           : '',    // Disallow extra characters
		allowSpace         : true,  // Allow the space character
		allowNewline       : true,  // Allow the newline character \n ascii 10
		allowNumeric       : true,  // Allow digits 0-9
		allowUpper         : true,  // Allow upper case characters
		allowLower         : true,  // Allow lower case characters
		allowCaseless      : true,  // Allow characters that do not have both upper & lower variants
		                            // eg Arabic or Chinese
		allowLatin         : true,  // a-z A-Z
		allowOtherCharSets : true,  // eg é, Á, Arabic, Chinese etc
		forceUpper         : false, // Convert lower case characters to upper case
		forceLower         : false, // Convert upper case characters to lower case
		maxLength          : NaN    // eg Max Length
	}

Convenience values for commonly used settings

	$("#username").alphanum("upper");

is equivalent to

	$("#username").alphanum({
		allowNumeric  : false,
		allowUpper    : true,
		allowLower    : false,
		allowCaseless : true
	});

List of convenience values

	var CONVENIENCE_SETTINGS_ALPHANUM = {
		"alpha"      : {
			allowNumeric : false
		},
		"upper"      : {
			allowNumeric  : false,
			allowUpper    : true,
			allowLower    : false,
			allowCaseless : true
		},
		"lower"      : {
			allowNumeric  : false,
			allowUpper    : false,
			allowLower    : true,
			allowCaseless : true
		}
	};

## .numeric()

Restrict the input to numeric characters

	$("#weight").numeric();

Override some of the default settings

	$("#weight").numeric({
		allowMinus   : false,
		allowThouSep : false
	});

Available settings plus their default values

	var DEFAULT_SETTINGS_NUM = {
		allowPlus           : false, // Allow the + sign
		allowMinus          : true,  // Allow the - sign
		allowThouSep        : true,  // Allow the thousands separator, default is the comma eg 12,000
		allowDecSep         : true,  // Allow the decimal separator, default is the fullstop eg 3.141
		allowLeadingSpaces  : false,
		maxDigits           : NaN,   // The max number of digits
		maxDecimalPlaces    : NaN,   // The max number of decimal places
		maxPreDecimalPlaces : NaN,   // The max number digits before the decimal point
		max                 : NaN,   // The max numeric value allowed
		min                 : NaN    // The min numeric value allowed
	}

Convenience values for commonly used settings

	$("#age").numeric("integer");

Equivalent to

	$("#age").alphanum({
		allowPlus:    false,
		allowMinus:   true,
		allowThouSep: false,
		allowDecSep:  false
	});

List of convenience values

	var CONVENIENCE_SETTINGS_NUMERIC = {
		"integer"         : {
			allowPlus:    false,
			allowMinus:   true,
			allowThouSep: false,
			allowDecSep:  false
		},
		"positiveInteger" : {
			allowPlus:    false,
			allowMinus:   false,
			allowThouSep: false,
			allowDecSep:  false
		}
	};

## .alpha()

Restrict the input to alphabetic characters

	$("#first_name").alpha();

Equivalent to the convenience option

	$("#first_name").alphanum("alpha");

## Unbind
To unbind jquery.alphaum from an element

    $('input').off('.alphanum');

## Blacklist

jquery.alphanum works by maintaining a blacklist of non-alphanumeric characters. There is no whitelist. It is assumed that all unicode characters are permissable unless there is a specific rule that disallows them.

These are the blacklisted characters that are encodable using 7-bit ascii

	var blacklist = '!@#$%^&*()+=[]\\\';,/{}|":<>?~`.- _';

These are the blacklisted unicode characters that can't be encoded using 7-bit ascii

	var blacklist =
		  "\xAC"     // ¬
		+ "\u20AC"   // €
		+ "\xA3"     // £
		+ "\xA6"     // ¦
		;

The blacklist may be extended or reduced using the 'allow' and 'disallow' settings

	$("#password").alphanum({
		allow :    '&,;', // Specify characters to allow
		disallow : 'xyz'  // Specify characters to disallow
	});

## Internationalization

To change the characters that are used as numeric separators, use the following global method:

	$.fn.alphanum.setNumericSeparators({
		thousandsSeparator: " ",
		decimalSeparator: ","
	});

# Contributing

## Developer Setup

Install [node.js](https://nodejs.org/en/)

    # Install grunt
    npm install -g grunt-cli

    # Install dependencies
    npm install
	
    # Start the development server:
    grunt

The server scans the source code for changes and automatically runs eslint, unit tests and e2e tests.
