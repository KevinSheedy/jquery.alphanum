$(document).ready(function(){
	
	var DEFAULT_NUMERIC_SETTINGS = '{'
		+ '\n    "maxDecimalPlaces": "2",'
		+ '\n    "maxPreDecimalPlaces": "4"'
		+ '\n}';




	init();

	function init() {
		$("#numeric_settings").val(DEFAULT_NUMERIC_SETTINGS);

		$("#apply_numeric_settings").click(applyNumericSettings_Click);

		applyNumericSettings();

		//$("#code_block").html(DEFAULT_NUMERIC_SETTINGS);
	}

	function applyNumericSettings_Click() {

		applyNumericSettings();
	}

	function applyNumericSettings() {

		var settingsString = $("#numeric_settings").val();
		var settings = JSON.parse(settingsString);

		$("#numeric_input").numeric(settings);
	}
});