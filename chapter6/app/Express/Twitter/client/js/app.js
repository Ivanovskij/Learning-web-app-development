var main = function() {
	"use strict";

	var insertCountsIntoDOM = function (counts) {
		$("body").append(counts.awesome + " ");
	};

	setInterval(function () {
		$.getJSON("/counts.json", insertCountsIntoDOM)
	}, 3000);
};

$(document).ready(main);