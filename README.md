jQuery Alphanum
===============
```bash
$("#my_input").alphanum();
```
Restricts the characters that may be entered into a text field.

```bash
$(selector).alphanum([optional] settings);
```

```bash
$(selector).alpha([optional] settings);
```

```bash
$(selector).numeric([optional] settings);
```


.alphanum()
===============

Restrict the input to alphanumeric characters
```bash
$("#username").alphanum();
```

Override some of the default settings
```bash
$("#username").alphanum({
	allowSpace: false, // Allow the space character
	allowUpper: false  // Allow Upper Case characters
});
```

Available settings plus their default values
```bash
var DEFAULT_SETTINGS_ALPHANUM = {
	allow              : '',   // Allow extra characters
	disallow           : '',   // Disallow extra characters
	allowSpace         : true, // Allow the space character
	allowNumeric       : true, // Allow digits 0-9
	allowUpper         : true, // Allow upper case characters
	allowLower         : true, // Allow lower case characters
	allowCaseless      : true, // Allow characters that don't have both upper & lower variants - eg Arabic or Chinese
	allowLatin         : true, // a-z A-Z
	allowOtherCharSets : true  // eg é, Á, Arabic, Chinese etc
}
```

Convenience values for commonly used settings
```bash
$("#username").alphanum("upper");
```
is equivalent to
```bash
$("#username").alphanum({
	allowNumeric  : false,
	allowUpper    : true,
	allowLower    : false,
	allowCaseless : true
});
```

List of convenience values
```bash
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
```

.numeric()
===============

Restrict the input to numeric characters
```bash
$("#weight").numeric();
```

Override some of the default settings
```bash
$("#weight").numeric({
	allowMinus   : false,
	allowThouSep : false
});
```

Available settings plus their default values
```bash
var DEFAULT_SETTINGS_NUM = {
	allowPlus           : false, // Allow the + sign
	allowMinus          : true,  // Allow the - sign
	allowThouSep        : true,  // Allow the thousands separator, default is the comma eg 12,000
	allowDecSep         : true,  // Allow the decimal separator, default is the fullstop eg 3.141
	allowLeadingSpaces  : false,
	maxDigits           : '',    // The max number of digits or '' for no max
	maxDecimalPlaces    : '',    // The max number of decimal places or '' for no max
	maxPreDecimalPlaces : '',    // The max number digits before the decimal point or '' for no max
	max                 : '',    // The max numeric value allowed
	min                 : ''     // The min numeric value allowed
}
```

Convenience values for commonly used settings
```bash
$("#age").numeric("integer");
```
```bash
Equivalent to
$("#age").alphanum({
	allowPlus:    false,
	allowMinus:   true,
	allowThouSep: false,
	allowDecSep:  false
});
```

List of convenience values
```bash
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
```

.alpha()
===============

Restrict the input to alphabetic characters
```bash
$("#first_name").alpha();
```

Equivalent to the convenience option
```bash
$("#first_name").alphanum("alpha");
```

Blacklist
===============
jquery.alphanum works by maintaining a blacklist of non-alphanumeric characters. There is no whitelist. It is assumed that all unicode characters are permissable unless there is a specific rule that disallows them.

These are the blacklisted characters that are encodable using 7-bit ascii
```bash
var blacklist = '!@#$%^&*()+=[]\\\';,/{}|":<>?~`.- _';
```

These are the blacklisted unicode characters that can't be encoded using 7-bit ascii
```bash
var blacklist = 
	  "\xAC"     // ¬
	+ "\u20AC"   // €
	+ "\xA3"     // £
	+ "\xA6"     // ¦
	;
```

The blacklist may be extended or reduced using the 'allow' and 'disallow' settings
```bash
$("#password").alphanumeric({
	allow :    '&,;', // Specify characters to allow
	disallow : 'xyz'  // Specify characters to disallow
});
```
