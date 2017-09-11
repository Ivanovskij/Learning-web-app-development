var main = function() {
	'use strict';
	$(".comment-input button").on("click", function(event) {
		$(".comments").append("<p>Это новый ком</p>");
	});
};
$(document).ready(main);