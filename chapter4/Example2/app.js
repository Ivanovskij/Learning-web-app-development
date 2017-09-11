var main = function() {
	'use strict';
	$(".comment-input button").on("click", function(event) {
		var $text_comment = $(".comment-input input").val();
		var $new_comment = $("<p>");
		$new_comment.text($text_comment);
		$(".comments").append($new_comment);
	});
};
$(document).ready(main);