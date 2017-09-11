var main = function() {
	"use strict";

	var sizeTabs = 3;
	for (var tabNumber = 1; tabNumber <= sizeTabs; tabNumber++) {
		var $tabSelector = $(".tabs a:nth-child(" + tabNumber + ") span");
		$tabSelector.on("click", function() {
			$(".tabs span").removeClass("active");
			$(this).addClass("active");
			$("main .content").empty();
			return false;
		});
	}
	
}

$(document).ready(main);