var main = function() {
	'use strict';
	$(".comment-input button").on("click", function(event) {
		var $text_comment = $(".comment-input input").val();
		if ($text_comment == "") {
			return;
		}
		var $new_comment = $("<p>");
		$new_comment.text($text_comment);
		$(".comments").append($new_comment);
		$(".comment-input input").val("");
	});

	$(".comment-input input").on("keypress", function(event) {
		if (event.keyCode == 13) {
			var $text_comment = $(".comment-input input").val();
			if ($text_comment == "") {
				return;
			}
			var $new_comment = $("<p>");
			$new_comment.text($text_comment);
			$(".comments").append($new_comment);
			$(".comment-input input").val("");
		}
	});
};


$(document).ready(main);