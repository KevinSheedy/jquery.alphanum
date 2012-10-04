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
		    name    : "Allow & Disallow",
			type    : "alphanum",
			options : {
				allow:    "*=",
				disallow: "xy"
			},
			data    : [
				[ "*=", "*=" ],
				[ "xy",         ""      ],
				[ "",          ""      ]
			]
		},
		
		{
		    name    : "Allow Space = false",
			type    : "alphanum",
			options : {
				allowSpace:    false
			},
			data    : [
				[ "   ", "" ]
			]
		},
		
		{
		    name    : "Allow Numeric = false",
			type    : "alphanum",
			options : {
				allowNumeric: false
			},
			data    : [
				[ "a123z", "az" ]
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
				[ ".,",         ".,"    ]
			]
		}
	];
	
	return testData;
}