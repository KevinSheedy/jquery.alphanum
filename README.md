jquery.alphanum
===============
Restricts the characters that may be entered into a text field.

```bash
.alphanum([optional] settings)
```

```bash
.alpha([optional] settings)
```

```bash
.numeric([optional] settings)
```


alphanum
===============

Restrict the input to alphanumeric characters
```bash
$("#username").alphanum();
```

Override some of the default settings
```bash
$("#username").alphanum({
	allowSpace: false,
	allowUpper: false
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
	allowLatin         : true, // a-Z A-Z
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

numeric
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
	allowPlus          : false, // Allow the + sign
	allowMinus         : true,  // Allow the - sign
	allowThouSep       : true,  // Allow the thousands separator, default is the comma eg 12,000
	allowDecSep        : true,  // Allow the decimal separator, default is the fullstop eg 3.141
	allowLeadingSpaces : false,
	maxDigits          : '',     // No max
	maxDecimalPlaces   : ''      // No max
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

alpha
===============

Restrict the input to alphabetic characters
```bash
$("#first_name").alpha();
```

Equivalent to the convenience option
```bash
$("#first_name").alphanum("alpha");
```