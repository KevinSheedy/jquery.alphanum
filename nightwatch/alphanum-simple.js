module.exports = {
	"Demo test alphanum" : function (browser) {
		browser
			.url("http://localhost:8080")
			.waitForElementVisible('body', 1000)
			.setValue('#firstName', 'Kev.,in')
			.assert.value('#firstName', 'Kevin')
			.end();
	}
};