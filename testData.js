/***************************************************************
* This file is encoded in UTF-8
***************************************************************/

var getTestData = function(){
	var testData = [
		
		{
		    name    : "Alpha Numeric",
			type    : "alphanum",
			options : "alphanum",
			data    : [
				[ " aAzZ09é.,$£€", " aAzZ09é" ],
				[ " ",         " "      ],
				[ "",          ""      ]
			]
		},
		
		{
		    name    : "allow = '*+'     \t disallow = 'xy'",
			type    : "alphanum",
			options : {
				allow:    "*+",
				disallow: "xy"
			},
			data    : [
				[ "*+", "*+" ],
				[ "xy",         ""      ],
				[ "",          ""      ]
			]
		},
		
		{
		    name    : "allowSpace = false",
			type    : "alphanum",
			options : {
				allowSpace:    false
			},
			data    : [
				[ "   ", "" ]
			]
		},
		
		{
		    name    : "allowNumeric = false",
			type    : "alphanum",
			options : {
				allowNumeric: false
			},
			data    : [
				[ "a123z", "az" ]
			]
		},
		
		{
		    name    : "allowUpper = false",
			type    : "alphanum",
			options : {
				allowUpper: false
			},
			data    : [
				[ "abcABC", "abc" ]
			]
		},
		
		{
		    name    : "allowLower = false",
			type    : "alphanum",
			options : {
				allowLower: false
			},
			data    : [
				[ "abcABC", "ABC" ]
			]
		},
		
		{
		    name    : "allowCaseless = false",
			type    : "alphanum",
			options : {
				allowCaseless: false
			},
			data    : [
				[ "الصغرى", "" ]
			]
		},
		
		{
		    name    : "allowLatin = false",
			type    : "alphanum",
			options : {
				allowLatin: false
			},
			data    : [
				[ "abcABCáéó", "áéó" ]
			]
		},
		
		{
		    name    : "allowOtherCharSets = false",
			type    : "alphanum",
			options : {
				allowOtherCharSets: false
			},
			data    : [
				[ "aáéób", "ab" ],
				[ "الصغرى", "" ],
				[ "维基百科关于中文维基百科", "" ]
			]
		},
		
		
		
		{
			name: "Alphabetic",
			type    : "alphanum",
			options: "alpha",
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
				[ ".,",         ".,"    ]
			]
		},
		
		{
			name: "Numeric Max Digits / Decimals",
			type    : "numeric",
			options:  {
				maxDigits: 5,
				maxDecimalPlaces: 2
			},
			data : [
				[ "1.1234",   "1.12"  ],
				[ "1234567",  "12345" ],
				[ "1234.567", "1234.5"]
			]
		},
		
		{
			name: "Disallow Plus & Minus signs",
			type    : "numeric",
			options:  {
				allowPlus:  false,
				allowMinus: false
			},
			data : [
				[ "+-",   ""  ],
				[ "+123", "123" ],
				[ "-123", "123"]
			]
		},
		
		{
			name: "Allow Plus & Minus signs",
			type    : "numeric",
			options:  {
				allowPlus:  true,
				allowMinus: true
			},
			data : [
				[ "+-",   "+"  ],
				[ "-+",   "-"  ],
				[ "+123", "+123" ],
				[ "-123", "-123"]
			]
		},
		
		{
			name: "Allow Plus, Disallow Minus",
			type    : "numeric",
			options:  {
				allowPlus:  false,
				allowMinus: true
			},
			data : [
				[ "+-",   "-"  ],
				[ "+123", "123" ],
				[ "-123", "-123"]
			]
		}
	];
	
	return testData;
}