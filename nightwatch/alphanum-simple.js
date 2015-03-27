console.log("inside alphanum-simple.js");
module.exports = {
	"Demo test alphanum" : function (browser) {
		console.log("launching browser...");
		browser
			.url("http://localhost:9001")
			.waitForElementVisible('body', 1000)
			.setValue('#firstName', 'Kev.,in')
			.assert.value('#firstName', 'Kevin')
			.end();
	}
};